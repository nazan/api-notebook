(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.proxyPlugin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global App */
var _         = App.Library._;
var url       = App.Library.url;
var PROXY_URL = {"ramlClient":{"oauth1":{"https://api.twitter.com/oauth/authorize":{"consumerKey":"abc","consumerSecret":"123"}},"oauth2":{"https://api.instagram.com/oauth/authorize":{"clientId":"abc","clientSecret":"123"}}},"proxy":{"url":"/proxy"},"github":{"clientId":"abc","clientSecret":"123"}}.proxy && {"ramlClient":{"oauth1":{"https://api.twitter.com/oauth/authorize":{"consumerKey":"abc","consumerSecret":"123"}},"oauth2":{"https://api.instagram.com/oauth/authorize":{"clientId":"abc","clientSecret":"123"}}},"proxy":{"url":"/proxy"},"github":{"clientId":"abc","clientSecret":"123"}}.proxy.url;

/**
 * Augment the ajax middleware with proxy urls when we make requests to a
 * recognised API endpoint.
 *
 * @param  {Object}   data
 * @param  {Function} next
 */
var ajaxPlugin = function (data, next) {
  // Allow the proxy to be bypassed completely.
  if (data.proxy === false) {
    return next();
  }

  var uri   = url.parse(data.url);
  var proxy = _.isString(data.proxy) ? data.proxy : PROXY_URL;

  // Attach the proxy if the url is not a relative url.
  if (proxy && uri.protocol && uri.host) {
    data.url = url.resolve(window.location.href, proxy) + '/' + data.url;
  }

  return next();
};

/**
 * A { key: function } map of all middleware used in the plugin.
 *
 * @type {Object}
 */
module.exports = {
  'ajax': ajaxPlugin
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9wbHVnaW5zL3Byb3h5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgQXBwICovXG52YXIgXyAgICAgICAgID0gQXBwLkxpYnJhcnkuXztcbnZhciB1cmwgICAgICAgPSBBcHAuTGlicmFyeS51cmw7XG52YXIgUFJPWFlfVVJMID0ge1wicmFtbENsaWVudFwiOntcIm9hdXRoMVwiOntcImh0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL29hdXRoL2F1dGhvcml6ZVwiOntcImNvbnN1bWVyS2V5XCI6XCJhYmNcIixcImNvbnN1bWVyU2VjcmV0XCI6XCIxMjNcIn19LFwib2F1dGgyXCI6e1wiaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemVcIjp7XCJjbGllbnRJZFwiOlwiYWJjXCIsXCJjbGllbnRTZWNyZXRcIjpcIjEyM1wifX19LFwicHJveHlcIjp7XCJ1cmxcIjpcIi9wcm94eVwifSxcImdpdGh1YlwiOntcImNsaWVudElkXCI6XCJhYmNcIixcImNsaWVudFNlY3JldFwiOlwiMTIzXCJ9fS5wcm94eSAmJiB7XCJyYW1sQ2xpZW50XCI6e1wib2F1dGgxXCI6e1wiaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aG9yaXplXCI6e1wiY29uc3VtZXJLZXlcIjpcImFiY1wiLFwiY29uc3VtZXJTZWNyZXRcIjpcIjEyM1wifX0sXCJvYXV0aDJcIjp7XCJodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZVwiOntcImNsaWVudElkXCI6XCJhYmNcIixcImNsaWVudFNlY3JldFwiOlwiMTIzXCJ9fX0sXCJwcm94eVwiOntcInVybFwiOlwiL3Byb3h5XCJ9LFwiZ2l0aHViXCI6e1wiY2xpZW50SWRcIjpcImFiY1wiLFwiY2xpZW50U2VjcmV0XCI6XCIxMjNcIn19LnByb3h5LnVybDtcblxuLyoqXG4gKiBBdWdtZW50IHRoZSBhamF4IG1pZGRsZXdhcmUgd2l0aCBwcm94eSB1cmxzIHdoZW4gd2UgbWFrZSByZXF1ZXN0cyB0byBhXG4gKiByZWNvZ25pc2VkIEFQSSBlbmRwb2ludC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgZGF0YVxuICogQHBhcmFtICB7RnVuY3Rpb259IG5leHRcbiAqL1xudmFyIGFqYXhQbHVnaW4gPSBmdW5jdGlvbiAoZGF0YSwgbmV4dCkge1xuICAvLyBBbGxvdyB0aGUgcHJveHkgdG8gYmUgYnlwYXNzZWQgY29tcGxldGVseS5cbiAgaWYgKGRhdGEucHJveHkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxuXG4gIHZhciB1cmkgICA9IHVybC5wYXJzZShkYXRhLnVybCk7XG4gIHZhciBwcm94eSA9IF8uaXNTdHJpbmcoZGF0YS5wcm94eSkgPyBkYXRhLnByb3h5IDogUFJPWFlfVVJMO1xuXG4gIC8vIEF0dGFjaCB0aGUgcHJveHkgaWYgdGhlIHVybCBpcyBub3QgYSByZWxhdGl2ZSB1cmwuXG4gIGlmIChwcm94eSAmJiB1cmkucHJvdG9jb2wgJiYgdXJpLmhvc3QpIHtcbiAgICBkYXRhLnVybCA9IHVybC5yZXNvbHZlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBwcm94eSkgKyAnLycgKyBkYXRhLnVybDtcbiAgfVxuXG4gIHJldHVybiBuZXh0KCk7XG59O1xuXG4vKipcbiAqIEEgeyBrZXk6IGZ1bmN0aW9uIH0gbWFwIG9mIGFsbCBtaWRkbGV3YXJlIHVzZWQgaW4gdGhlIHBsdWdpbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgJ2FqYXgnOiBhamF4UGx1Z2luXG59O1xuIl19
