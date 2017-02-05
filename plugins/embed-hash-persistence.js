(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.embedHashPersistencePlugin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var NOTEBOOK_URL = {"url":"https://mulesoft.github.io/api-notebook/","title":"API Notebook","oauthCallback":"/authenticate/oauth.html"}.url;

/**
 * Export the attaching functionality.
 *
 * @param {Function} Notebook
 */
module.exports = function (Notebook) {
  /**
   * Subscribe to a single notebook for hash changes.
   *
   * @param {Object} notebook
   */
  Notebook.subscribe(function (notebook) {
    // Update the id and url when the hash of the window changes.
    var updateId = function () {
      var id  = window.location.hash.substr(1);
      var url = window.location.href;

      notebook.config('id',  id);
      notebook.config('url', url);
    };

    var updateUrl = function () {
      var id = notebook.options.config.id;

      id = (id == null ? '' : String(id));

      // Update the hash url if it changed.
      if (window.location.hash.substr(1) !== id) {
        window.location.hash = id;
        notebook.config('fullUrl', NOTEBOOK_URL + (id ? '#' + id : ''));
      }
    };

    updateId();
    window.addEventListener('hashchange', updateId);

    // Update the window hash when the id changes.
    notebook.on('config', function (name) {
      if (name !== 'id') { return; }

      return updateUrl();
    });

    /**
     * Unsubscribe to a single notebook from hash changes.
     *
     * @param {Object} notebook
     */
    Notebook.unsubscribe(function () {
      window.removeEventListener('hashchange', updateId);
    });
  });
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9wbHVnaW5zL2VtYmVkLWhhc2gtcGVyc2lzdGVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBOT1RFQk9PS19VUkwgPSB7XCJ1cmxcIjpcImh0dHBzOi8vbXVsZXNvZnQuZ2l0aHViLmlvL2FwaS1ub3RlYm9vay9cIixcInRpdGxlXCI6XCJBUEkgTm90ZWJvb2tcIixcIm9hdXRoQ2FsbGJhY2tcIjpcIi9hdXRoZW50aWNhdGUvb2F1dGguaHRtbFwifS51cmw7XG5cbi8qKlxuICogRXhwb3J0IHRoZSBhdHRhY2hpbmcgZnVuY3Rpb25hbGl0eS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBOb3RlYm9va1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOb3RlYm9vaykge1xuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIGEgc2luZ2xlIG5vdGVib29rIGZvciBoYXNoIGNoYW5nZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub3RlYm9va1xuICAgKi9cbiAgTm90ZWJvb2suc3Vic2NyaWJlKGZ1bmN0aW9uIChub3RlYm9vaykge1xuICAgIC8vIFVwZGF0ZSB0aGUgaWQgYW5kIHVybCB3aGVuIHRoZSBoYXNoIG9mIHRoZSB3aW5kb3cgY2hhbmdlcy5cbiAgICB2YXIgdXBkYXRlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaWQgID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICAgICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICBub3RlYm9vay5jb25maWcoJ2lkJywgIGlkKTtcbiAgICAgIG5vdGVib29rLmNvbmZpZygndXJsJywgdXJsKTtcbiAgICB9O1xuXG4gICAgdmFyIHVwZGF0ZVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpZCA9IG5vdGVib29rLm9wdGlvbnMuY29uZmlnLmlkO1xuXG4gICAgICBpZCA9IChpZCA9PSBudWxsID8gJycgOiBTdHJpbmcoaWQpKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoIHVybCBpZiBpdCBjaGFuZ2VkLlxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSAhPT0gaWQpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBpZDtcbiAgICAgICAgbm90ZWJvb2suY29uZmlnKCdmdWxsVXJsJywgTk9URUJPT0tfVVJMICsgKGlkID8gJyMnICsgaWQgOiAnJykpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVJZCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdXBkYXRlSWQpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSB3aW5kb3cgaGFzaCB3aGVuIHRoZSBpZCBjaGFuZ2VzLlxuICAgIG5vdGVib29rLm9uKCdjb25maWcnLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG5hbWUgIT09ICdpZCcpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHJldHVybiB1cGRhdGVVcmwoKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlIHRvIGEgc2luZ2xlIG5vdGVib29rIGZyb20gaGFzaCBjaGFuZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5vdGVib29rXG4gICAgICovXG4gICAgTm90ZWJvb2sudW5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB1cGRhdGVJZCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==
