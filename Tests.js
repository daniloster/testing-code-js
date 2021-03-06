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
	
	TestingCode.run([math, math2]);
})();
