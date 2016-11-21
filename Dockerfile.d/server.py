#!/usr/bin/env python
import SimpleHTTPServer
import SocketServer
import sys

path = sys.argv[1]
port = int(sys.argv[2])

class OnpremRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = path
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

Handler = OnpremRequestHandler
server = SocketServer.TCPServer(('0.0.0.0', port), Handler)

print("Listening at " + '0.0.0.0' + ":" + `port` )

server.serve_forever()
