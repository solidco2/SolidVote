#!/bin/env node
require("./myproto");
var http=require("http");
var is_started = false;

exports.start = function(proc){
	if(is_started) return;
	var server = http.createServer(function(req, res){
		log("RequestURL:", req.url);
		if(req.url == "/favicon.ico"){
			require("fs").readFile(process.env["HOME"] + "/node-site-common/favicon.png", function(err,buf){
				if(!err){
					res.writeHead(200, {
						"Content-Type":"image/png",
						"Expires":"Fri, 21 Dec 2012 15:14:35 GMT"
					});
					res.end(buf);
				}else{
					res.writeHead(404, {"Content-Type":"text/html"});
					res.end("<h1>404 - Not Found</h1>");
				}
			});
			return true;
		}
		var postData = "";
		req.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			//log("receive POST data", "["+postDataChunk.constructor.name+"]");
		});
		req.addListener("end", function(){
			if(typeof proc == "function"){
				proc(res, req, postData);
			}else{
				res.end("not implement");
			}
		});
	}).listen(2222);
	is_started = true;
	log("server start http://jsonce.com:2222");
};
exports.log = log;
