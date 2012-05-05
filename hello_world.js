#!/bin/env node
var http=require("http");
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World\n');
}).listen(7654);
console.log("Server running at localhost:7654");
