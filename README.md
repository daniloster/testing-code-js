TestingCode
===========
It is a javascript library to support unity tests. It was made like that way to improve flexibility to create and run tests. It, firstly, run at node.js that has a portable version.
Link to portable node.js: http://imsky.co/files/nodejs-0.10.0.zip
Once that perform the download, it is enough put the directory where the files was extracted in enviroment variable PATH of operational system.

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

	var math = {
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
				context.asserts.assertEquals([5, Math.sum(1, 4)], 'The sum value of 1 + 4 was not as expected.');
			}
		}
	};
	
	TestingCode.run([math]);
  
})();
```

Through of TestingCode class it is possible makes test classes and run it. In the case above, we have a class Math that contains a function "sum", which must be tested.

To create a test class
======================
May can create a definition of test class like testClass that you can see below:
```
var testClass = {
  settings:{
		name:'TestingClass', //Name of test class to show in a console output 
		setup:function(context){}, //Function that will be executed once by test method at first
		finalize:function(context){}, //Function that will be executed once by test method at end
  },
  tests:{
    //Test methods must be putted here
    test1:function(context){ ... },
    test2:function(context){ ... }
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
	
	var math = {
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
				context.asserts.assertEquals([5, Math.sum(1, 4)], 'The sum value of 1 + 4 was not as expected.');
			}
		}
	}, math2 = {
		settings:{
			name:'MathTests2',
			//Function that will be executed once by test method at first
			setup:function(context){ 
				console.log('Starting ' + math2.settings.name);
				// Use context.setArgs to apply some arguments to each test
				context.setArgs({
					//Some argument that will be used by test methods
					//May be accessed by context, like context.args.variable_name_here
					operator1:2
				}); 
			}, 
			//Function that will be executed once by test method at end
			finalize:function(context){ console.log('Finalizing ' + math2.settings.name); } //Function that will be executed once by test method at end
		},
		tests: {
			when_sum_2_with_1_must_has_3_as_result:function(context){
				context.asserts.assertEquals([3, Math.sum(parseInt(context.args.operator1),1)], 'The sum value of 2 + 1 was not as expected.');
			},
			when_sum_2_with_2_must_has_4_as_result:function(context){
				context.asserts.assertEquals([4, Math.sum(parseInt(context.args.operator1),2)], 'The sum value of 2 + 2 was not as expected.');
			},
			when_sum_2_with_4_must_has_6_as_result:function(context){
				context.asserts.assertEquals([6, Math.sum(parseInt(context.args.operator1), 4)], 'The sum value of 2 + 4 was not as expected.');
			}
		}
	};
	
	globalTestContext = TestingCode.run([math, math2]);
	//You may use globalTestContext to create a report with some values
	//globalTestContext.getTotalTests(), globalTestContext.getExecutionTimes(), 
	//globalTestContext.getTotalSuccess(), globalTestContext.getTotalFailures(), 
	//globalTestContext.getTotalUndefined(), globalTestContext.tests[] { 
	//	{ 
	//		testName: "methodName",
	//		executed: boolean,
	//		successed: boolean,
	//		failed: boolean,
	//		successed: boolean,
	//		assertMessages: string[]
	//	},
	//	{ 
	//		testName: "methodName",
	//		executed: boolean,
	//		successed: boolean,
	//		failed: boolean,
	//		successed: boolean,
	//		assertMessages: string[]
	//	} 
	//}
})();
```

So, that is it! Easy like that.
