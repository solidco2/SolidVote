HelloWorld = function(){
	this.m_count = 0;
};

HelloWorld.prototype.hello = function(){
	this.m_count++;
	return "Hello NodeJS";
};

exports.HelloWorld = HelloWorld;
