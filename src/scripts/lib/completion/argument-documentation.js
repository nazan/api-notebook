var _            = require('underscore');
var getToken     = require('../codemirror/get-token');
var tokenHelpers = require('../codemirror/token-helpers');
var messages     = require('../../state/messages');
var formatDocs   = require('./format-documentation');

/**
 * An map of possible function types.
 *
 * @type {Object}
 */
var FUNCTION_TYPES = {
  variable: true,
  property: true
};

/**
 * Format an argument as html for the rendered documentation.
 *
 * @param  {Object} object
 * @param  {String} key
 * @return {String}
 */
var formatArgumentDocs = function (object, key) {
  var html   = [];
  var docs   = formatDocs(object, key);
  var prefix = 'CodeMirror-documentation-description-';

  // Push the type definition into the html when a key or type exists.
  if (key || docs.type) {
    html.push(
      '<div class="' + prefix + 'type">',
      key ? ('<strong>' + _.escape(key) + '</strong>') : '',
      docs.type ? ('<em>' + _.escape(docs.type) + '</em>') : '',
      '</div>'
    );
  }

  // Append documentation to the output html.
  if (docs.doc) {
    html.push(
      '<div class="' + prefix + 'doc">',
      docs.doc,
      '</div>'
    );
  }

  // If a url is specified, set a read more link.
  if (docs.url) {
    html.push(
      '<div class="' + prefix + 'url">',
      '<a href="' + docs.url + '" target="_blank">Read more</a>',
      '</div>'
    );
  }

  // Iterate over the argument object and push each child definition into the
  // html array. Ignore private definition keys.
  _.each(object, function (object, key) {
    if (key.charAt(0) === '!') {
      return;
    }

    // Push each child object into the html array.
    html.push(
      '<div class="' + prefix + 'child">',
      formatArgumentDocs(object, key),
      '</div>'
    );
  });

  return html.join('\n');
};

/**
 * Check if a token is before another token.
 *
 * @param  {Object}  pos
 * @param  {Object}  before
 * @return {Boolean}
 */
var isTokenBefore = function (pos, before) {
  if (pos.line < before.line) {
    return true;
  }

  return !!(pos.line === before.line && pos.ch < before.ch);
};

/**
 * Render a new argument documentation.
 *
 * @param  {Completion}   completion
 * @param  {Object}       data
 * @return {ArgumentDocs}
 */
var ArgumentDocs = module.exports = function (completion, data) {
  this.data       = data;
  this.completion = completion;

  var params        = this.params = [];
  var cm            = this.completion.cm;
  var curLine       = this.curLine = cm.getCursor().line;
  var documentation = this.documentation = document.createElement('div');
  var type          = data.description['!type'];
  var result        = data.description['!return'];
  var title         = documentation.appendChild(document.createElement('div'));

  title.className         = 'CodeMirror-documentation-title';
  documentation.className = 'CodeMirror-documentation';

  // Stop the scrollbar from showing and force scroll to block inside.
  documentation.setAttribute('data-overflow-scroll', 'true');

  // Get the function name as the variable preceding the opening bracket.
  var fnName = tokenHelpers.eatEmpty(
    cm, getToken(cm, this.data.from)
  ).string;

  // Append a text node with the correct token string.
  title.appendChild(document.createTextNode(fnName + '('));

  _.each(/^fn\((.*)\)/.exec(type)[1].split(', '), function (arg, index, args) {
    var param = document.createElement('span');
    param.appendChild(document.createTextNode(arg));

    params.push(param);
    title.appendChild(param);

    if (index < args.length - 1) {
      title.appendChild(document.createTextNode(', '));
    }
  });

  title.appendChild(document.createTextNode(')'));

  if (result) {
    title.appendChild(document.createTextNode(' -> ' + result));
  }

  // Append a static container for documentation.
  this.description = documentation.appendChild(document.createElement('div'));
  this.description.className = 'CodeMirror-documentation-description';

  // Attach the widget below the current line.
  this.widget = cm.addLineWidget(curLine, documentation);

  this.update();
};

/**
 * Show the documentation for a specific argument.
 *
 * @param {Number} index
 */
ArgumentDocs.prototype.select = function (index) {
  var argument = this.data.description['!args'][index];
  var cm       = this.completion.cm;
  var curLine  = cm.getCursor().line;

  // Make it follow the selected line.
  if (curLine !== this.curLine) {
    this.removeWidget();
    this.widget  = cm.addLineWidget(curLine, this.documentation);
    this.curLine = curLine;
  }

  // Avoiding reselecting the same argument.
  if (this.currentArgument === index) { return; }

  // Set the correct argument to active.
  _.each(this.params, function (param, position) {
    param.classList[index === position ? 'add' : 'remove'](
      'CodeMirror-documentation-argument-active'
    );
  });

  // Empty the description element before appending new docs.
  this.description.innerHTML = '';
  this.currentArgument       = index;

  if (!argument) {
    this.widget.changed();
    return messages.trigger('resize');
  }

  this.description.innerHTML = formatArgumentDocs(argument);

  this.widget.changed();
  return messages.trigger('resize');
};

/**
 * Update the argument documentation position.
 */
ArgumentDocs.prototype.update = function () {
  var cm = this.completion.cm;

  // Remove the documentation when multiple characters are selected.
  if (cm.doc.somethingSelected()) {
    return this.remove();
  }

  var cur   = this.data.to = cm.getCursor();
  var from  = this.data.from;
  var token = getToken(cm, cur);

  // Remove the documentation if we are stating before the opening bracket.
  if (isTokenBefore(token.pos, from)) {
    return this.remove();
  }

  var roundLevel = 0;
  var stack      = [];

  // Iterate over every new block and push them into a stack to know the current index. If we hit
  // a new function inside the current arguments, remove the current widget.
  while (!isTokenBefore(token.pos, from)) {
    if (token.string === '(') {
      roundLevel++;
      // Check if the previous token is a function type.
      var prev  = tokenHelpers.eatEmptyAndMove(cm, token);
      var match = token.start === from.ch && token.pos.line === from.line;

      if (roundLevel > 0 && FUNCTION_TYPES[prev.type] && !match) {
        return this.remove();
      }
    } else if (token.string === ')') {
      roundLevel--;
    }
    stack.push(token);
    token = tokenHelpers.eatEmptyAndMove(cm, token);
  }
  var index = 0;
  // If it doesn't start with a parenthesis this means that there are no arguments, so doc must be removed.
  if (stack[stack.length-1].string === '(') {
    stack.pop();

    var curlyStack = [];
    var bracketStack = [];
    // While the stack has tokens, consume them and add them to the bracket's or curly's stack if they are opening
    // tokens and remove them if they are closing tokens.
    while (stack.length !== 0 ) {
      var curr = stack.pop().string;
      switch (curr) {
        case ',':
          // If the stacks are empty, then pass to the next argument.
          if (curlyStack.length === 0 && bracketStack.length === 0) {
            index++;
          }
          break;
        case '{':
          curlyStack.push(curr);
          break;
        case '(':
          bracketStack.push(curr);
          break;
        case '}':
          curlyStack.pop();
          break;
        case ')':
          // If the bracketStack is empty then it's closing the argument-doc.
          if (bracketStack.length === 0) {
            return this.remove();
          }
          bracketStack.pop();
          break;
        default:
      }

    }
  }

  this.select(index);
};

/**
 * Remove the widget from the editor.
 */
ArgumentDocs.prototype.removeWidget = function () {
  if (this.widget) {
    this.widget.clear();
    messages.trigger('resize');
    delete this.widget;
  }
};

/**
 * Remove the argument documentation from the editor.
 */
ArgumentDocs.prototype.remove = function () {
  this.removeWidget();
  delete this.documentation;
  delete this.completion.documentation;
};
