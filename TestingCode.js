(function(){
  var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [], countClass=0, TestContext = require('./TestContext');
	require('./Prototypes/Object.extend')();
	require('./Prototypes/Array.each')();
	require('./Prototypes/Array.filter')();
	//if(!Array.prototype.reverse){Array.prototype.reverse=function(){var a=new Array();for(var i=this.length-1;i>-1;i--){a.push(this[i]);}return a;};}
	//if(!Array.prototype.map){Array.prototype.map=function(fun/*,thisp*/){var len=this.length;if(typeof fun!="function")throw new TypeError();var res=new Array(len),thisp=arguments[1];for (var i=0;i<len;i++){if (i in this)res[i]=fun.call(thisp,this[i],i,this);}return res;};}
    //if(!Array.prototype.exists){Array.prototype.exists=function(fun/*,thisp*/){var len=this.length;if (typeof fun!="function")throw new TypeError();var thisp=arguments[1];for(var i=0;i<len;i++){if(i in this)if(fun.call(thisp,this[i],i,this))return true;}return false;};}
	//String.prototype.replaceAll=function String_replaceAll(match,rep){var str=this;while(str.indexOf(match)>-1)str=str.replace(match,rep);return str;};
    //String.prototype.trim=function String_trim(){return this.replace(/^(\s)*|(\s)*$/,'');};
	
	var TestingCode={
		run:function(allTests){
			TestContext.log = TestingCode.log;
			var context = TestContext.defineGlobalContext();
			if (typeof allTests!==ArrayType){
				TestingCode.write('## The parameter to run should be an array.');
				TestingCode.write('@@ Total tests executed',executionTimes,'/',totalTests+'.','\n * Successfuls:',countSuccess+',','Failures:',countFail+'.');
			}
			allTests.each(function(testObject, index){
				context.getSettings=function(){
					return (testObject.settings||{name:TestingCode.settings.name+countClass}).extend(TestingCode.settings);
				};
				testObject.tests=(testObject.tests||{});
				var testMethod;
				for(testMethod in testObject.tests){
					if(testMethod!='extend'){
						context.tests.push(TestContext.getContext(testMethod, testObject.tests[testMethod], testObject))
					}
				}
			});
			
			context.tests.each(function(testContext){
				testContext.executed = true;
				testContext.settings = context.getSettings();
				try{
					testContext.settings.setup(testContext);
					testContext.currentTest(testContext);
				}catch(e){
					testContext.asserts.fail("An exception was thrown: " + e.message);
				} finally {
					testContext.settings.finalize(testContext);
				}
			});
			TestingCode.log('@@ Total tests executed',context.getExecutionTimes(),'/',context.getTotalTests()+'.','\n * Successfuls:',context.getTotalSuccess()+',','Failures:',context.getTotalFailures()+', Undefineds:'+context.getTotalUndefined()+'.');
		},
		log:console.log,
		settings:{
			name:'TestingClass',
			setup:function(context){},
			finalize:function(context){}
		}
	};
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = TestingCode;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "testingcode", [], function () { return TestingCode; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.TestingCode = TestingCode;
	}
})();
