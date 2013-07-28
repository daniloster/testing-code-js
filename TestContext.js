(function(){
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [], Asserts = require('./Asserts'), 
	TestContext = {
		defineGlobalContext:function(){
			var context = {
				settings:{},
				tests: [],
				getExecutionTimes:function(){
					return context.tests.filter(function(test){
						return test.executed === true;
					}).length;
				},
				getTotalTests:function(){
					return context.tests.length;
				},
				getTotalSuccess:function(){
					return context.tests.filter(function(test){
						return test.failed === false && test.successed === true;
					}).length;
				},
				getTotalFailures:function(){
					return context.tests.filter(function(test){
						return test.failed === true;
					}).length;
				},
				getTotalUndefined:function(){
					return context.tests.filter(function(test){
						return test.failed === false && test.successed === false;
					}).length;
				}
			};
			return context;
		},
		getContext:function(name, test, testClass){
			var context = {
				testName: name,
				currentTest: test,
				currentTestClass: testClass,
				successed:false,
				failed:false,
				executed:false,
				args:{},
				asserts:{},
				setArgs:function(args) {
					for (var i in args) {
						context.args[i] = args[i];
					}
				},
				setAsserts:function(asserts) {
					for (var i in asserts) {
						context.asserts[i] = asserts[i];
					}
				}
			};
			context.asserts = Asserts.defineAsserts(context, TestContext.log);
			return context;
		},
		log:function(){}
	};
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = TestContext;
	} else {
		if ( typeof define === "function" && define.amd ) {
			define( "testcontext", [], function () { return TestContext; } );
		}
	}

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.TestContext = TestContext;
	}
})();
