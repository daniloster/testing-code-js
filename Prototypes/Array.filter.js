(function(){
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [],
	defineArrayFilter = function() { if(!Array.prototype.filter){Array.prototype.filter=function(fun/*,thisp*/){var len=this.length;if(typeof fun!="function")throw new TypeError();var res=new Array(),thisp=arguments[1];for (var i=0;i<len;i++){if (i in this)if(fun.call(thisp,this[i],i,this))res[i]=this[i];}return res;};} };
    
	
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = defineArrayFilter;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "definearrayfilter", [], function () { return defineArrayFilter; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.defineArrayFilter = defineArrayFilter;
	}
})();
