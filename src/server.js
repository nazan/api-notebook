if(process.argv.length < 4)  {
  console.error("Please pass required parameters, 'path' and 'port'.");
  process.exit();
}

var connect = require('connect');
var http = require('http');
var request = require('request');

var app = connect();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  if (req.url.substr(0, 7) !== '/proxy/') {
    return next();
  }

  var proxy = request(req.url.substr(7), {
    rejectUnauthorized: false
  });

  // Proxy the error message back to the client.
  proxy.on('error', function(err) {
    res.writeHead(500);
    return res.end(err.message);
  });

  // Attempt to avoid caching pages.
  proxy.on('response', function(res) {
    if (!res.headers['cache-control']) {
      return;
    }

    // Remove cookies from being set in the client.
    delete res.headers['set-cookie'];

    // Remove the max-age and other cache duration directives.
    res.headers['cache-control'] = res.headers['cache-control']
      .replace(/(max-age|s-maxage)=\d+/g, '$1=0');
  });

  // Pipe the request data directly into the proxy request and back to the
  // response object. This avoids having to buffer the request body in cases
  // where they could be unexepectedly large and/or slow.
  return req.pipe(proxy).pipe(res);
});

var serveStatic = require('serve-static');

app.use(serveStatic(process.argv[2], {}));

// respond to all requests
/*app.use(function(req, res) {
  res.end('Hello from Connect!\n');
});*/

//create node.js http server and listen on port
http.createServer(app).listen(process.argv[3]);