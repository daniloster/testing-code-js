(function(){
  var UndefinedType = typeof undefined, ObjectType = typeof {};
	if(!Object.prototype.extend)Object.prototype.extend=function(padrao){
		var i,novo={},custom=this;
		for(i in padrao){if(i!=='extend'){
			if(typeof custom[i]===UndefinedType){
				novo[i]=padrao[i];
			}else{
				novo[i]=custom[i];
				if(typeof padrao[i]!==UndefinedType){
					novo[(i.indexOf('$super_')>-1?'$':'$super_')+i]=padrao[i];
				}
			}}}return novo;};
		
    if(!Array.prototype.reverse){Array.prototype.reverse=function(){var a=new Array();for(var i=this.length-1;i>-1;i--){a.push(this[i]);}return a;};}
	if(!Array.prototype.map){Array.prototype.map=function(fun/*,thisp*/){var len=this.length;if(typeof fun!="function")throw new TypeError();var res=new Array(len),thisp=arguments[1];for (var i=0;i<len;i++){if (i in this)res[i]=fun.call(thisp,this[i],i,this);}return res;};}
    if(!Array.prototype.each){Array.prototype.each=function(fun/*,thisp*/){var len=this.length;if(typeof fun!="function")throw new TypeError();var thisp=arguments[1];for(var i=0;i<len;i++){if (i in this)fun.call(thisp,this[i],i,this);}};}
    if(!Array.prototype.exists){Array.prototype.exists=function(fun/*,thisp*/){var len=this.length;if (typeof fun!="function")throw new TypeError();var thisp=arguments[1];for(var i=0;i<len;i++){if(i in this)if(fun.call(thisp,this[i],i,this))return true;}return false;};}
	String.prototype.replaceAll=function String_replaceAll(match,rep){var str=this;while(str.indexOf(match)>-1)str=str.replace(match,rep);return str;};
    String.prototype.trim=function String_trim(){return this.replace(/^(\s)*|(\s)*$/,'');};
	
	var UndefinedType = typeof undefined, ObjectType = typeof {}, ArrayType = typeof [],
		countClass=0,TestingCode={
		createTestClass:function(bodyTest){
			var NewTestClass=function(){};
			bodyTest.settings=bodyTest.settings||{name:TestingCode.settings.name+countClass};
			NewTestClass.prototype.settings=bodyTest.settings.extend(TestingCode.settings);
			bodyTest.args=(bodyTest.args||{});
			NewTestClass.prototype.args=bodyTest.args.extend(TestingCode.args);
			bodyTest.asserts=(bodyTest.asserts||{});
			NewTestClass.prototype.asserts=bodyTest.asserts.extend(TestingCode.asserts);
			NewTestClass.prototype.tests=bodyTest.tests=(bodyTest.tests||{});
			return NewTestClass;
		},
		run:function(allTests){
			var testMethod=null,executionTimes=0,totalTests=0,countSuccess=0,countFail=0;
			if (typeof allTests!==ArrayType){
				TestingCode.write('## The parameter to run should be an array.');
				TestingCode.write('@@ Total tests executed',executionTimes,'/',totalTests+'.','\n * Successfuls:',countSuccess+',','Failures:',countFail+'.');
			}
			allTests.each(function(testObject, index){
				try{
					for(testMethod in testObject.tests){
						if(testMethod!='extend'){
							totalTests++;
						}
					}
					testObject.settings.setup(testObject);
					for(testMethod in testObject.tests){
						if(testMethod!='extend'){
							try{
								executionTimes++;
								testObject.asserts.sucessInLoop=false;
								testObject.asserts.failInLoop=false;
								testObject.asserts.currentMethod=testMethod;
								testObject.asserts.currentClass=testObject.settings.name;
								testObject.settings.beforeEveryTest(testObject);
								try{
									testObject.tests[testMethod](testObject);
								}catch(e){
									testObject.asserts.handleException(e);
								}
								testObject.settings.afterEveryTest(testObject);
							}catch(e){
								testObject.asserts.handleException(e);
							}
						}
					}
					testObject.settings.finalize(testObject);
				}catch(e){
					if(!(e instanceof TestingCode.asserts.AssertFailException)){
						testObject.asserts.puts(e.message, testObject.asserts.currentMethod, testObject.asserts.currentClass);
						testObject.asserts.currentMethod=null;
						testObject.asserts.currentClass=null;
					}
				}
				countSuccess+=testObject.asserts.countSuccess;
				countFail+=testObject.asserts.countFail;
			});
			TestingCode.write('@@ Total tests executed',executionTimes,'/',totalTests+'.','\n * Successfuls:',countSuccess+',','Failures:',countFail+'.');
		},
		write:console.log,
		settings:{
			name:'TestingClass',
			setup:function(context){},
			finalize:function(context){},
			beforeEveryTest:function(context){},
			afterEveryTest:function(context){}
		},
		args:{},
		asserts:{
			assertEquals:function(args,message){
				var i=1,len=args.length,boolValue=i<len;
				for(;i<len;i++){
					boolValue=boolValue&&args[i-1]===args[i];
				}
				if(boolValue)this.success('Test successful at '+this.currentClass);
				else this.fail(message + '\nExpected: '+args[(i<len?i:len-1)-1]+' Found: '+args[(i<len?i:len-1)]);
			},
			assertNotEquals:function(args,message){
				var i=1,len=args.length,boolValue=i<len;
				for(;i<len;i++){
					boolValue=boolValue&&args[i-1]!==args[i];
				}
				if(boolValue)this.success('Test successful at '+this.currentClass);
				else this.fail(message + '\nExpected: '+args[(i<len?i:len-1)-1]+' Found: '+args[(i<len?i:len-1)]);
			},
			assertTrue:function(boolValue,message){
				if(boolValue)this.success('Test successful at '+this.currentClass);
				else this.fail(message + '\nExpected: TRUE Found: FALSE');
			},
			assertFalse:function(boolValue,message){
				if(!boolValue)this.success('Test successful at '+this.currentClass);
				else this.fail(message + '\nExpected: FALSE Found: TRUE');
			},
			countSuccess:0,countFail:0,sucessInLoop:false,failInLoop:false,currentMethod:{},currentClass:{},
			success:function(message){
				if(!this.successInLoop){
					this.countSuccess++;
				}
				this.puts(message,this.currentMethod,this.currentClass);
			},
			fail:function(message){
				if(this.successInLoop){
					this.countSuccess--;
				}
				if(!this.failInLoop){
					this.failInLoop=true;
					this.countFail++;
				}
				this.puts(message,this.currentMethod,this.currentClass);
				throw new TestingCode.asserts.AssertFailException(message);
			},
			puts:function(message, methodName, className){
				message+='\n['+className;
				if (typeof methodName!==null&&typeof methodName!==UndefinedType)
					message+='.'+methodName;
				message+=']';
				TestingCode.write(message,'\n\n');
			},
			handleException:function(e){
				if (e instanceof TestingCode.asserts.AssertFailException){
					e.handleException();
				}else{
					this.fail(e.message);
					throw new TestingCode.asserts.AssertFailException(e.message, TestingCode.asserts.AssertFailLevel.ErrorUncatched);
				}
			},
			AssertFailLevel:{
				Assert:1,
				ErrorUncatched:2
			},
			AssertFailException:function AssertFailException(message, level, name, handler){ 
				this.name=name||"AssertFailException";
				this.level=level||TestingCode.asserts.AssertFailLevel.Assert;
				this.message=message||"Uncatched error detected.";
				this.handleException=handler||function(){
					if(this.level===TestingCode.asserts.AssertFailLevel.Assert){
						return;
					}else{
						throw this;
					}
				};
			}
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
