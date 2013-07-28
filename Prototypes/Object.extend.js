(function(){
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [],
	defineObjectExtend = function() { if(!Object.prototype.extend)Object.prototype.extend=function(padrao){var i,novo={},custom=this;for(i in padrao){if(i!=='extend'){if(typeof custom[i]===UndefinedType){novo[i]=padrao[i];}else{novo[i]=custom[i];if(typeof padrao[i]!==UndefinedType){novo[(i.indexOf('$super_')>-1?'$':'$super_')+i]=padrao[i];}}}}return novo;}; };
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = defineObjectExtend;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "defineobjectextend", [], function () { return defineObjectExtend; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.defineObjectExtend = defineObjectExtend;
	}
})();
