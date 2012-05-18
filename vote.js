#!/bin/env node

var fs = require("fs");
var path = require("path");
var url = require("url");
var querystring = require("querystring");
var server = require("./server");
var htmlet = require("./libs/htmlet");

global.E = htmlet.E;
global.T = htmlet.T;
global.S = htmlet.S;

function commonHeader(title, addin_str){
	var res = E("head", [
		E("meta", {charset:"utf-8"}),
		E("title", [title]),
		addin_str||""
	]);
	return res;
}
function commonFooter(){
	var res = S([
		E("hr");

	]);
}
var vote = null, allow = null, record = null;

function post(res, req, postdata) {
	var pathname = url.parse(req.url).pathname;
	var reqname = pathname.split("/", 2);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(content);
}

function get(res, req){
	var urlo = url.parse(req.url);
	var pathname = urlo.pathname;
	var reqname = pathname.split("/", 2)[1];
	if(reqname){
		console.log(allow, reqname);
		if(allow.indexOf(reqname)>-1){
			res.writeHead(200, {"Content-Type": "text/html"});
			var content = htmlet.stringify(E("html", [
				commonHeader(vote.title), 
				E("body")
			]));
			res.end(content);
		}else{
			res.writeHead(403, "Your username is not allowed", {"Content-Type": "text/html; charset=utf-8"});
			res.end("<h1>403 - Forbidden</h1><p>Your username is not allowed</p>");
		}
	}else{
		res.writeHead(200, {"Content-Type": "text/html"});
		var username = querystring.parse(urlo.query).username;
		if(allow.indexOf(username)>-1){
			res.writeHead(302, {"Location": "/"+username});
			res.end();
		}else{
			res.writeHead(200, {"Content-Type": "text/html"});
			var head = commonHeader("输入用户名进入投票" + " - " + vote.title);
			var body = E("body", [
				E("h1", [ "请输入您的<b>公司邮箱</b>用户名进入投票" ]),
				E("form", {action:"/", method:"get"}, [
					E("input", {name:"username", id:"username", type:"text"}),
					E("input", {type:"submit", value:"进入"}),
				]),
				commonFooter();
			]);
			res.end(htmlet.stringify(E("html", [head, body])));

		}
	}
}

function route(res, req, post){
	var method = req.method.toLowerCase();
	if(method == "post"){
		post(res,req,post);
	}else{
		get(res,req);
	}
}

function init(){
	log("----init BEGIN----");
	try {
		vote = JSON.parse(fs.readFileSync("./data/vote.json"));
		log("vote.json loaded");
	}catch(e){
		log("!!vote.json failed", e);
	}
	try{
		allow = JSON.parse(fs.readFileSync("./data/allow.json"));
		log("allow.json loaded");
	}catch(e){
		log("!!allow.json failed", e);
	}
	try{
		record = JSON.parse(fs.readFileSync("./data/record.json"));
		log("record.json loaded");
	}catch(e){
		log("!!record.json failed", e);
	}

	log("----init   END----");
}

exports.post = post;
exports.get = get;


server.start(route);
init();
