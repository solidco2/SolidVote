var http = require("http");
http.request({host:'www.baidu.com', method:'GET'}, function(res){
	console.log("Response: "+res.statusCode);
	console.log("Headers: "+JSON.stringify(res.headers));
	res.setEncoding("UTF-8");
	res.on('data', function(data){
		console.log(data);
	});
}).on('error', function(e){
	console.log("Get error: " + e.message);
}).end();
