(function(){
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [],
	defineArrayEach = function() { if(!Array.prototype.each){Array.prototype.each=function(fun/*,thisp*/){var len=this.length;if(typeof fun!="function")throw new TypeError();var thisp=arguments[1];for(var i=0;i<len;i++){if (i in this)fun.call(thisp,this[i],i,this);}};} };
    
	
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = defineArrayEach;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "definearrayeach", [], function () { return defineArrayEach; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.defineArrayEach = defineArrayEach;
	}
})();
