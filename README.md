TestingCode
===========
It is a javascript library to support unity tests. It was made like that way to improve flexibility to create and run tests. It, firstly, run at node.js that has a portable version.
Link to portable node.js: http://imsky.co/files/nodejs-0.10.0.zip
Once that perform the download, it is enough put the directory where was extracted in enviroment variable PATH of operational system.

How to use
==========
Lets start with that basic example.
```
(function () {
  
  var StringType = typeof '', NumberType = typeof 1, UndefinedType = typeof undefined, ObjectType = typeof {},
  	TestingCode = require('./TestingCode'), Math = {
			sum: function(op1, op2) {
				if(typeof op1!==NumberType)
					throw new Error('The first operator is not a number');
				if(typeof op2!==NumberType)
					throw new Error('The second operator is not a number');
				return op1 + op2;
			}
		};
	
	var MathTests = TestingCode.createTestClass({
		settings:{
			name:'MathTests'
		},
		tests: {
			when_sum_1_with_1_must_has_2_as_result:function(context){
				context.asserts.assertEquals([2, Math.sum(1,1)], 'The sum value of 1 + 1 was not as expected.');
			},
			when_sum_2_with_2_must_has_4_as_result:function(context){
				context.asserts.assertEquals([4, Math.sum(2,2)], 'The sum value of 2 + 2 was not as expected.');
			},
			when_sum_1_with_4_must_has_5_as_result:function(context){
				context.asserts.assertEquals([5, Math.sum(1)], 'The sum value of 1 + 4 was not as expected.');
			}
		}
	});
	var math = new MathTests();
	TestingCode.run([math]);
  
})();
```

Through of TestingCode class it is possible makes test classes and run it. In the case above, we have a class Math that contains a function "sum", which must be tested.

To create a test class
======================
The test class may be created through the calling ```TestingCode.createTestClass(options);```, where options can be an object like that:
```
var options = {
  settings:{
		name:'TestingClass', //Name of test class to show in a console output 
		setup:function(context){}, //Function that will be executed once by class at first
		finalize:function(context){}, //Function that will be executed once by class at end
		beforeEveryTest:function(context){}, //Function that will be executed once by test method at first
		afterEveryTest:function(context){} //Function that will be executed once by test method at end
	},
	args:{
    //Some argument that will be used by test methods
    //May be accessed by context, like context.args.variable_name_here
  },
	asserts:{
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
		}
	},
  tests:{
    //Test methods must be putted here
  }
}; 
```
So, lets improve the old example. Below, we are going to execute 2 test classes and the last one has an implementation of setup function to initialize the argument 'operator1'. Also, it will put 2 sentences in console, one when perform setup and the other when perform finalize.
```
(function () {
  
  var StringType = typeof '', NumberType = typeof 1, UndefinedType = typeof undefined, ObjectType = typeof {},
  	TestingCode = require('./TestingCode'), Math = {
			sum: function(op1, op2) {
				if(typeof op1!==NumberType)
					throw new Error('The first operator is not a number');
				if(typeof op2!==NumberType)
					throw new Error('The second operator is not a number');
				return op1 + op2;
			}
		};
	
	var math2, MathTests2, math, MathTests = TestingCode.createTestClass({
		settings:{
			name:'MathTests'
		},
		tests: {
			when_sum_1_with_1_must_has_2_as_result:function(context){
				context.asserts.assertEquals([2, Math.sum(1,1)], 'The sum value of 1 + 1 was not as expected.');
			},
			when_sum_2_with_2_must_has_4_as_result:function(context){
				context.asserts.assertEquals([4, Math.sum(2,2)], 'The sum value of 2 + 2 was not as expected.');
			},
			when_sum_1_with_4_must_has_5_as_result:function(context){
				context.asserts.assertEquals([5, Math.sum(1)], 'The sum value of 1 + 4 was not as expected.');
			}
		}
	});
	math = new MathTests();
	
	MathTests2 = TestingCode.createTestClass({
		settings:{
			name:'MathTests2',
			setup:function(context){ console.log('Hello World First\n\n'); context.args.operator1 = 2; }, //Function that will be executed once by class at first
			finalize:function(context){ console.log('Hello World Second\n\n'); } //Function that will be executed once by class at end
		},
		args:{
		  //Some argument that will be used by test methods
		  //May be accessed by context, like context.args.variable_name_here
		  operator1:0
		},
		tests: {
			when_sum_2_with_1_must_has_3_as_result:function(context){
				context.asserts.assertEquals([3, Math.sum(context.args.operator1,1)], 'The sum value of 2 + 1 was not as expected.');
			},
			when_sum_2_with_2_must_has_4_as_result:function(context){
				context.asserts.assertEquals([4, Math.sum(context.args.operator1,2)], 'The sum value of 2 + 2 was not as expected.');
			},
			when_sum_2_with_4_must_has_6_as_result:function(context){
				context.asserts.assertEquals([6, Math.sum(context.args.operator1)], 'The sum value of 2 + 4 was not as expected.');
			}
		}
	});
	math2 = new MathTests2();
	
	TestingCode.run([math, math2]);
  
})();
```

So, that is it! Easy like that.
