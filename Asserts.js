(function(){
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [], 
	Asserts = {
		defineAsserts:function(context, log){
			return {
				assertEquals:function(args,message){
					var i=1,len=args.length,boolValue=i<len;
					for(;i<len;i++){
						boolValue=boolValue&&args[i-1]===args[i];
					}
					if(boolValue===true)this.success('Test successful at '+context.testName);
					else this.fail(message + '\nExpected: '+args[(i<len?i:len-1)-1]+' Found: '+args[(i<len?i:len-1)]);
				},
				assertNotEquals:function(args,message){
					var i=1,len=args.length,boolValue=i<len;
					for(;i<len;i++){
						boolValue=boolValue&&args[i-1]!==args[i];
					}
					if(boolValue===true)this.success('Test successful at '+context.testName);
					else this.fail(message + '\nExpected: '+args[(i<len?i:len-1)-1]+' Found: '+args[(i<len?i:len-1)]);
				},
				assertTrue:function(boolValue,message){
					if(boolValue===true)this.success('Test successful at '+context.testName);
					else this.fail(message + '\nExpected: TRUE Found: FALSE');
				},
				assertFalse:function(boolValue,message){
					if(boolValue===false)this.success('Test successful at '+context.testName);
					else this.fail(message + '\nExpected: FALSE Found: TRUE');
				},currentMethod:{},currentClass:{},
				success:function(message){
					context.successed = true;
					this.puts(message,context.testName,context.currentTestClass.settings.name);
				},
				fail:function(message){
					context.failed = true;
					this.puts(message,context.testName,context.currentTestClass.settings.name);
				},
				puts:function(message, methodName, className){
					var msg='['+className;
					if (typeof methodName!==null&&typeof methodName!==UndefinedType)
						msg+='.'+methodName;
					msg+='] ' + message;
					context.assertMessages.push(msg);
					log(msg);
				}
			};
		}
	};
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Asserts;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "asserts", [], function () { return Asserts; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Asserts = Asserts;
	}
})();
