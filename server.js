#!/bin/env node
var http=require("http");
var url = require("url");

function log(args){
	var d=new Date();
	var datestr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	var weekstr = d.get
	var timestr = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type":"text/plain"});
}).listen(1234);
