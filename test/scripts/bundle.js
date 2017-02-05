(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global mocha, chai */
mocha.setup('bdd');
mocha.reporter('html');

window.expect       = chai.expect;
window.NOTEBOOK_URL = {"url":"https://mulesoft.github.io/api-notebook/","title":"API Notebook","oauthCallback":"/authenticate/oauth.html"}.url;
window.FIXTURES_URL = window.NOTEBOOK_URL + '/test/fixtures';

},{}],2:[function(require,module,exports){
/**
 * Extend a destination object with any number of properties and any number of
 * source object. This will override from left to right.
 *
 * @param  {Object} obj
 * @param  {Object} ...
 * @return {Object}
 */
window.extend = function (obj /*, ...source */) {
  var sources = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < sources.length; i++) {
    for (var prop in sources[i]) {
      obj[prop] = sources[i][prop];
    }
  }

  return obj;
};

/**
 * Simulate a keypress event enough to test CodeMirror.
 *
 * @param  {CodeMirror}    cm
 * @param  {String|Number} code
 * @param  {Object}        props
 */
window.fakeKey = function (cm, code, props) {
  if (typeof code === 'string') {
    code = code.charCodeAt(0);
  }

  var e = extend({
    type: 'keydown',
    keyCode: code,
    preventDefault: function () {},
    stopPropagation: function () {}
  }, props);

  cm.triggerOnKeyDown(e);
};

/**
 * Test the autocompletion widget on a javascript editor instance.
 *
 * @param  {CodeMirror} editor
 * @param  {String}     text
 * @param  {Function}   done
 * @return {Array}
 */
window.testCompletion = function (editor, text, done) {
  // Listens to an event triggered by the widget
  editor.on('refreshCompletion', function refresh (cm, results) {
    editor.off('refreshCompletion', refresh);
    return done(App._.pluck(results, 'value'));
  });

  // Set the correct positioning
  editor.focus();
  editor.setValue(text);
  editor.setCursor(editor.lastLine(), Infinity);

  var cursor = editor.getCursor();

  // Trigger a fake change event to cause autocompletion to occur
  App.CodeMirror.Editor.signal(editor, 'change', editor, {
    origin: '+input',
    to:     extend({}, cursor),
    from:   extend({}, cursor, { ch: cursor.ch - 1 }),
    text:   [text.slice(-1)]
  });
};

/**
 * Simulate events using JavaScript.
 *
 * @return {Function}
 */
window.simulateEvent = (function () {
  var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll|focusin|focusout)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:enter|leave|down|up|over|move|out))$/,
    'KeyboardEvent': /^(?:key(?:down|press|up))$/
  };

  var defaultOptions = {
    pointerX:   0,
    pointerY:   0,
    button:     0,
    ctrlKey:    false,
    altKey:     false,
    shiftKey:   false,
    metaKey:    false,
    bubbles:    true,
    cancelable: true
  };

  return function (element, eventName, options) {
    options = extend({}, defaultOptions, options || {});

    var eventType = null;
    var oEvent;

    // Check the event name against the available types.
    for (var name in eventMatchers) {
      if (eventMatchers[name].test(eventName)) {
        eventType = name;
        break;
      }
    }

    if (!eventType) {
      throw new SyntaxError(
        'Only HTMLEvents, MouseEvents and KeyboardEvent interfaces are supported'
      );
    }

    if (document.createEvent) {
      oEvent = document.createEvent(eventType);

      if (eventType === 'HTMLEvents') {
        oEvent.initEvent(eventName, options.bubbles, options.cancelable);
      } else if (eventType === 'KeyboardEvent') {
        oEvent.initKeyboardEvent(
          eventName,
          options.bubbles,
          options.cancelable,
          document.defaultView,
          options.char,
          options.key,
          options.location,
          '', // Fix `modifiersListArg`
          options.repeat,
          options.locale
        );
      } else {
        oEvent.initMouseEvent(
          eventName,
          options.bubbles,
          options.cancelable,
          document.defaultView,
          options.button,
          options.pointerX,
          options.pointerY,
          options.pointerX,
          options.pointerY,
          options.ctrlKey,
          options.altKey,
          options.shiftKey,
          options.metaKey,
          options.button,
          element
        );
      }

      element.dispatchEvent(oEvent);
    } else {
      // Alias position options.
      options.clientX = options.pointerX;
      options.clientY = options.pointerY;

      oEvent = extend(document.createEventObject(), options);
      element.fireEvent('on' + eventName, oEvent);
    }

    return element;
  };
})();

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NjcmlwdHMvY29tbW9uLmpzIiwidGVzdC9zY3JpcHRzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBtb2NoYSwgY2hhaSAqL1xubW9jaGEuc2V0dXAoJ2JkZCcpO1xubW9jaGEucmVwb3J0ZXIoJ2h0bWwnKTtcblxud2luZG93LmV4cGVjdCAgICAgICA9IGNoYWkuZXhwZWN0O1xud2luZG93Lk5PVEVCT09LX1VSTCA9IHtcInVybFwiOlwiaHR0cHM6Ly9tdWxlc29mdC5naXRodWIuaW8vYXBpLW5vdGVib29rL1wiLFwidGl0bGVcIjpcIkFQSSBOb3RlYm9va1wiLFwib2F1dGhDYWxsYmFja1wiOlwiL2F1dGhlbnRpY2F0ZS9vYXV0aC5odG1sXCJ9LnVybDtcbndpbmRvdy5GSVhUVVJFU19VUkwgPSB3aW5kb3cuTk9URUJPT0tfVVJMICsgJy90ZXN0L2ZpeHR1cmVzJztcbiIsIi8qKlxuICogRXh0ZW5kIGEgZGVzdGluYXRpb24gb2JqZWN0IHdpdGggYW55IG51bWJlciBvZiBwcm9wZXJ0aWVzIGFuZCBhbnkgbnVtYmVyIG9mXG4gKiBzb3VyY2Ugb2JqZWN0LiBUaGlzIHdpbGwgb3ZlcnJpZGUgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gIHtPYmplY3R9IC4uLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG53aW5kb3cuZXh0ZW5kID0gZnVuY3Rpb24gKG9iaiAvKiwgLi4uc291cmNlICovKSB7XG4gIHZhciBzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZXNbaV0pIHtcbiAgICAgIG9ialtwcm9wXSA9IHNvdXJjZXNbaV1bcHJvcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbi8qKlxuICogU2ltdWxhdGUgYSBrZXlwcmVzcyBldmVudCBlbm91Z2ggdG8gdGVzdCBDb2RlTWlycm9yLlxuICpcbiAqIEBwYXJhbSAge0NvZGVNaXJyb3J9ICAgIGNtXG4gKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBjb2RlXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICBwcm9wc1xuICovXG53aW5kb3cuZmFrZUtleSA9IGZ1bmN0aW9uIChjbSwgY29kZSwgcHJvcHMpIHtcbiAgaWYgKHR5cGVvZiBjb2RlID09PSAnc3RyaW5nJykge1xuICAgIGNvZGUgPSBjb2RlLmNoYXJDb2RlQXQoMCk7XG4gIH1cblxuICB2YXIgZSA9IGV4dGVuZCh7XG4gICAgdHlwZTogJ2tleWRvd24nLFxuICAgIGtleUNvZGU6IGNvZGUsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24gKCkge31cbiAgfSwgcHJvcHMpO1xuXG4gIGNtLnRyaWdnZXJPbktleURvd24oZSk7XG59O1xuXG4vKipcbiAqIFRlc3QgdGhlIGF1dG9jb21wbGV0aW9uIHdpZGdldCBvbiBhIGphdmFzY3JpcHQgZWRpdG9yIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSAge0NvZGVNaXJyb3J9IGVkaXRvclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgdGV4dFxuICogQHBhcmFtICB7RnVuY3Rpb259ICAgZG9uZVxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbndpbmRvdy50ZXN0Q29tcGxldGlvbiA9IGZ1bmN0aW9uIChlZGl0b3IsIHRleHQsIGRvbmUpIHtcbiAgLy8gTGlzdGVucyB0byBhbiBldmVudCB0cmlnZ2VyZWQgYnkgdGhlIHdpZGdldFxuICBlZGl0b3Iub24oJ3JlZnJlc2hDb21wbGV0aW9uJywgZnVuY3Rpb24gcmVmcmVzaCAoY20sIHJlc3VsdHMpIHtcbiAgICBlZGl0b3Iub2ZmKCdyZWZyZXNoQ29tcGxldGlvbicsIHJlZnJlc2gpO1xuICAgIHJldHVybiBkb25lKEFwcC5fLnBsdWNrKHJlc3VsdHMsICd2YWx1ZScpKTtcbiAgfSk7XG5cbiAgLy8gU2V0IHRoZSBjb3JyZWN0IHBvc2l0aW9uaW5nXG4gIGVkaXRvci5mb2N1cygpO1xuICBlZGl0b3Iuc2V0VmFsdWUodGV4dCk7XG4gIGVkaXRvci5zZXRDdXJzb3IoZWRpdG9yLmxhc3RMaW5lKCksIEluZmluaXR5KTtcblxuICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuXG4gIC8vIFRyaWdnZXIgYSBmYWtlIGNoYW5nZSBldmVudCB0byBjYXVzZSBhdXRvY29tcGxldGlvbiB0byBvY2N1clxuICBBcHAuQ29kZU1pcnJvci5FZGl0b3Iuc2lnbmFsKGVkaXRvciwgJ2NoYW5nZScsIGVkaXRvciwge1xuICAgIG9yaWdpbjogJytpbnB1dCcsXG4gICAgdG86ICAgICBleHRlbmQoe30sIGN1cnNvciksXG4gICAgZnJvbTogICBleHRlbmQoe30sIGN1cnNvciwgeyBjaDogY3Vyc29yLmNoIC0gMSB9KSxcbiAgICB0ZXh0OiAgIFt0ZXh0LnNsaWNlKC0xKV1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFNpbXVsYXRlIGV2ZW50cyB1c2luZyBKYXZhU2NyaXB0LlxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG53aW5kb3cuc2ltdWxhdGVFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBldmVudE1hdGNoZXJzID0ge1xuICAgICdIVE1MRXZlbnRzJzogL14oPzpsb2FkfHVubG9hZHxhYm9ydHxlcnJvcnxzZWxlY3R8Y2hhbmdlfHN1Ym1pdHxyZXNldHxmb2N1c3xibHVyfHJlc2l6ZXxzY3JvbGx8Zm9jdXNpbnxmb2N1c291dCkkLyxcbiAgICAnTW91c2VFdmVudHMnOiAvXig/OmNsaWNrfGRibGNsaWNrfG1vdXNlKD86ZW50ZXJ8bGVhdmV8ZG93bnx1cHxvdmVyfG1vdmV8b3V0KSkkLyxcbiAgICAnS2V5Ym9hcmRFdmVudCc6IC9eKD86a2V5KD86ZG93bnxwcmVzc3x1cCkpJC9cbiAgfTtcblxuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcG9pbnRlclg6ICAgMCxcbiAgICBwb2ludGVyWTogICAwLFxuICAgIGJ1dHRvbjogICAgIDAsXG4gICAgY3RybEtleTogICAgZmFsc2UsXG4gICAgYWx0S2V5OiAgICAgZmFsc2UsXG4gICAgc2hpZnRLZXk6ICAgZmFsc2UsXG4gICAgbWV0YUtleTogICAgZmFsc2UsXG4gICAgYnViYmxlczogICAgdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCBldmVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB2YXIgZXZlbnRUeXBlID0gbnVsbDtcbiAgICB2YXIgb0V2ZW50O1xuXG4gICAgLy8gQ2hlY2sgdGhlIGV2ZW50IG5hbWUgYWdhaW5zdCB0aGUgYXZhaWxhYmxlIHR5cGVzLlxuICAgIGZvciAodmFyIG5hbWUgaW4gZXZlbnRNYXRjaGVycykge1xuICAgICAgaWYgKGV2ZW50TWF0Y2hlcnNbbmFtZV0udGVzdChldmVudE5hbWUpKSB7XG4gICAgICAgIGV2ZW50VHlwZSA9IG5hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZXZlbnRUeXBlKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXG4gICAgICAgICdPbmx5IEhUTUxFdmVudHMsIE1vdXNlRXZlbnRzIGFuZCBLZXlib2FyZEV2ZW50IGludGVyZmFjZXMgYXJlIHN1cHBvcnRlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBvRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChldmVudFR5cGUpO1xuXG4gICAgICBpZiAoZXZlbnRUeXBlID09PSAnSFRNTEV2ZW50cycpIHtcbiAgICAgICAgb0V2ZW50LmluaXRFdmVudChldmVudE5hbWUsIG9wdGlvbnMuYnViYmxlcywgb3B0aW9ucy5jYW5jZWxhYmxlKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnS2V5Ym9hcmRFdmVudCcpIHtcbiAgICAgICAgb0V2ZW50LmluaXRLZXlib2FyZEV2ZW50KFxuICAgICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgICBvcHRpb25zLmJ1YmJsZXMsXG4gICAgICAgICAgb3B0aW9ucy5jYW5jZWxhYmxlLFxuICAgICAgICAgIGRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgICAgIG9wdGlvbnMuY2hhcixcbiAgICAgICAgICBvcHRpb25zLmtleSxcbiAgICAgICAgICBvcHRpb25zLmxvY2F0aW9uLFxuICAgICAgICAgICcnLCAvLyBGaXggYG1vZGlmaWVyc0xpc3RBcmdgXG4gICAgICAgICAgb3B0aW9ucy5yZXBlYXQsXG4gICAgICAgICAgb3B0aW9ucy5sb2NhbGVcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9FdmVudC5pbml0TW91c2VFdmVudChcbiAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgb3B0aW9ucy5idWJibGVzLFxuICAgICAgICAgIG9wdGlvbnMuY2FuY2VsYWJsZSxcbiAgICAgICAgICBkb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgICAgICBvcHRpb25zLmJ1dHRvbixcbiAgICAgICAgICBvcHRpb25zLnBvaW50ZXJYLFxuICAgICAgICAgIG9wdGlvbnMucG9pbnRlclksXG4gICAgICAgICAgb3B0aW9ucy5wb2ludGVyWCxcbiAgICAgICAgICBvcHRpb25zLnBvaW50ZXJZLFxuICAgICAgICAgIG9wdGlvbnMuY3RybEtleSxcbiAgICAgICAgICBvcHRpb25zLmFsdEtleSxcbiAgICAgICAgICBvcHRpb25zLnNoaWZ0S2V5LFxuICAgICAgICAgIG9wdGlvbnMubWV0YUtleSxcbiAgICAgICAgICBvcHRpb25zLmJ1dHRvbixcbiAgICAgICAgICBlbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChvRXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBbGlhcyBwb3NpdGlvbiBvcHRpb25zLlxuICAgICAgb3B0aW9ucy5jbGllbnRYID0gb3B0aW9ucy5wb2ludGVyWDtcbiAgICAgIG9wdGlvbnMuY2xpZW50WSA9IG9wdGlvbnMucG9pbnRlclk7XG5cbiAgICAgIG9FdmVudCA9IGV4dGVuZChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpLCBvcHRpb25zKTtcbiAgICAgIGVsZW1lbnQuZmlyZUV2ZW50KCdvbicgKyBldmVudE5hbWUsIG9FdmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG59KSgpO1xuIl19
