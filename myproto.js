#!/bin/env node
//	myproto.js FOR:
//		String.prototype.padding
//		Date.prototype.format

String.prototype.padding = function(width, fillchar, cut){
	var str = this;
	if(fillchar === 0) fillchar = "0";
	fillchar = fillchar || " ";
	cut = cut || false;
	width = width || 0;
	var posit = (width < 0);
	str = str.toString();
	width = Math.abs(width);
	while(str.length < width){
		if(posit) str += fillchar;
		else str = fillchar + str;
	}
	if(cut){
		if(posit) str = str.substr(0, width);
		else str = str.substr(str.length - width);
	}
	return str;
}

Date.prototype.format = function(format, cut){
	var MMM_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var MC_arr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
	var DC_arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十", "三十一"];
	var WDC_arr = ["日", "一", "二", "三", "四", "五", "六"];
	var WD_arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var res = format;
	var date = this;
	res = res.replace(/\$\{yyyy\}/g, date.getFullYear().toString().padding(4, '0', cut));
	res = res.replace(/\$\{y\}/g, date.getFullYear());
	res = res.replace(/\$\{MMM\}/g, MMM_arr[date.getMonth()]);
	res = res.replace(/\$\{MM\}/g, (date.getMonth() + 1).toString().padding(2, '0', cut));
	res = res.replace(/\$\{MC\}/g, MC_arr[date.getMonth()]);
	res = res.replace(/\$\{M\}/g, date.getMonth() + 1);
	res = res.replace(/\$\{dd\}/g, date.getDate().toString().padding(2, '0', cut));
	res = res.replace(/\$\{dc\}/g, DC_arr[date.getDate()]);
	res = res.replace(/\$\{d\}/g, date.getDate());
	res = res.replace(/\$\{WDC\}/g, WDC_arr[date.getDay()]);
	res = res.replace(/\$\{WDD\}/g, WD_arr[date.getDay()]);
	res = res.replace(/\$\{w\}/g, date.getDay());

	res = res.replace(/\$\{HH\}/g, date.getHours().toString().padding(2, '0', cut));
	res = res.replace(/\$\{H\}/g, date.getHours());
	res = res.replace(/\$\{hh\}/g, ((date.getHours() - 1) % 12 + 1).toString().padding(2, '0', cut));
	res = res.replace(/\$\{mm\}/g, date.getMinutes().toString().padding(2, '0', cut));
	res = res.replace(/\$\{m\}/g, date.getMinutes());
	res = res.replace(/\$\{ss\}/g, date.getSeconds().toString().padding(2, '0', cut));
	res = res.replace(/\$\{s\}/g, date.getSeconds());
	res = res.replace(/\$\{msms\}/g, date.getMilliseconds().toString().padding(4, '0', cut));
	res = res.replace(/\$\{ms\}/g, date.getMilliseconds());

	return res;
}
global.log = function(args){
	var d=new Date().format("${yyyy}-${MM}-${dd}(${w})${HH}:${mm}:${ss}[${msms}]");
	console.log.apply(console, [d].concat([].splice.call(arguments,0)));
}
