#!/bin/env node
var util = require("util");

var html5_doctype = "<!doctype html>";
var voidTagName = [
	"area", /*"base",*/ "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"
];

function htmlEncode(str){
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function HtmlNodeInterface(){};

function HtmlElement(tagName, attributes, children){
	if(typeof tagName!="string" && !(tagName instanceof String)){
		throw new Error("Arguments Type Error: tagName must be string");
	}
	this.tagName = tagName.toLowerCase();
	this.attributes = attributes || {};
	this.children = [];
	if(typeof children != "undefined" && children !== null){
		if(!util.isArray(children)){
			if(children instanceof HtmlNodeInterface){
				children = [children];
			}else if(children instanceof HtmlSet){
				children = children.nodes;
			}else{
				throw new Error("Arguments Type Error: children must be E() or T() Object or Array");
			}
		}else{
			for(var i = 0; i < children.length; i++){
				if (children[i] instanceof HtmlSet) {
					children[i] = children[i].nodes;
				}
				if (util.isArray(children[i])) {
					children.splice.apply(children, [i, 1].concat(children[i]);
					i--;
				}
			}
		}
		if(typeof voidTagName.indexOf(this.tagName)>-1){
			throw new Error("Argument Number Error: tagName of [" + this.tagName + "] is a void element which cannot contain children");
		}
		this.children = children;
	}
};
function E(tagName, attributes, children){
	if((util.isArray(attributes) || attributes instanceof HtmlSet) && !children){
		children = attributes;
		attributes = null;
	}
	var elem = new HtmlElement(tagName, attributes, children);
	return elem;
};
function HtmlText(text){
	if(typeof text == "undefined"){
		throw new Error("Arguments Type Error: text must be string");
	}
	this.text = text;
};
function T(text){
	return new HtmlText(text);
};
function HtmlSet(nodes){
	this.nodes = nodes || [];
};
function S(nodes){
	var arr = [];
	for(var i = 0; i < arguments.length; i++){
		if(util.isArray(arguments[i])){
			arr = arr.join(arguments[i]);
		}
		else arr.push(arguments[i]);
	}
	return new HtmlSet(arr);
};

HtmlElement.prototype = new HtmlNodeInterface();
HtmlElement.prototype.toString = function(prefix, apprefix){
	prefix = prefix || "";
	apprefix = apprefix || "";
	var resultstr = prefix || "";
	var lastelem = false;
	resultstr += "<" + this.tagName;
	for(var t in this.attributes){
		resultstr += " " + htmlEncode(t) + "=\"" + htmlEncode(this.attributes[t]) + "\"";
	}
	if(voidTagName.indexOf(this.tagName)>-1){
		resultstr += "/>";
	}else{
		resultstr += ">";
		for(var i = 0; i < this.children.length; i++){
			if(this.children[i] !== null && typeof this.children[i] != "undefined" && this.children[i] !== ""){
				lastelem = this.children[i] instanceof HtmlElement;
				if(!lastelem){
					resultstr += this.children[i].toString();
				}else{
					resultstr += this.children[i].toString(prefix+apprefix, apprefix);
				}
			}
		}
		resultstr += (lastelem ? prefix : "") + "</" + this.tagName + ">";
	}
	return resultstr;
};
HtmlElement.prototype.id = function(id){
	if(id){
		if(this.attributes["id"] == id){
			return this;
		}else{
			if(util.isArray(this.children)){
				for(var i = 0, elem = null; i < this.children.length; i++){
					if(typeof(this.children[i].id) == "function"){
						elem = this.children[i].id(id);
						if(elem) return elem;
					}
				}
				return null;
			}else return null;
		}
	}else return null;
};
HtmlText.prototype = new HtmlNodeInterface();
HtmlText.prototype.toString = function(){
	return htmlEncode(this.text);
};

function stringify(htmlroot, doctype){
	doctype = doctype || html5_doctype;
	if(htmlroot instanceof HtmlNodeInterface){
		return doctype + htmlroot.toString("\n", "  ");
	}
	return "";
}

exports.E = E;
exports.T = T;
exports.S = S;
exports.DOCTYPE = html5_doctype;
exports.stringify = stringify;


/** test
var t = E("html", [
	E("head", [
		E("link", {href:"http://www.baidu.com/a.css"}),
	]),
	E("body", [
		E("a", {href:"http://www.baidu.com", style:"color:red;"}, [
			E("span", {id:'solid'}, [
				T("haha"),
			]),
			E("br"),
			T("solid")
		]),
	]),
]);
console.log(t.toString("\n", "  "), "\n", t.id('solid').toString());
end of test **/
