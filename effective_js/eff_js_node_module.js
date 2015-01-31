module.exports = {
	log: function (arg){
		console.log(arg);
	},
	
	identity: function (x){
		return x;
	},
	add:	function (x, y){
		return x + y;
	},

	sub: function (x, y){
		return x - y;
	},

	mul: function (x, y){
		return x * y;
	},

	inc: function (arg){
		return ++arg
	},
	
	identityf: function (arg){
		return function(){
			return arg
		};
	},

	addf: function (arg1){
		return function(arg2){
			return arg1 + arg2
		}
	},

	liftf: function (arg){
		return function(arg1){
			return function (arg2){
				return arg(arg1, arg2);
			 };
		};
	},

	curry: function (binary, arg1){
		return function(arg2){
			return binary(arg1, arg2);
		};
	},
	
	//returns a function that takes a binary function as argument and executes with same value as both arguments
	twice: function(binary){
		return function(arg){
			return binary(arg, arg);
		};
	},
	
	//returns a function that takes binary function as argument and returns a function that reverses the arguments of the binary function
	reverse: function(binary){
		return function(arg1, arg2){
			return binary(arg2, arg1);
		};
	},
	
	//returns a function that takes two unary functions as arguments and returns a function that executes both of them.
	//pipelining/monads
	composeu: function(unary1, unary2){
		return function(arg){
			return unary2(unary1(arg));
		};
	},
	
	//returns a function that takes two binary functions as arguments and returns a function that executes both of them.
	//pipelining/monads
	composeb: function(binary1, binary2){
		return function(arg1, arg2, arg3){
			return binary2(binary1(arg1, arg2), arg3);
		};
	},
	
	//returns a function that allows a binary function to be executed only once
	//kind of singleton method
	once: function(binary){
		var called = false;
		return function(arg1, arg2){
			if(called === false){
				called = true;
				return binary(arg1, arg2);
			}
			
			return undefined;
		};
	},
	
	//function that produces a generator that produce values in a range
	fromTo: function(from, to){
		var index = from;
		return function(){
			if(index < to){
				return index++;
			}
			return undefined;
		};
	},
	
	//a function that takes an array and an optional generator and produces a generator that will produce the elements of the array
	element: function(inArray, gen){
		var index = 0;
		return function(){
			if(gen !== undefined){
				index = gen();
			}
			if(index !== undefined && index < inArray.length){
				return inArray[index++];
			}
			
			return undefined;
		};	
	},
	
	//a function that takes a generator and an array and produces a function that will collect result in the array
	collect: function(gen, array){
		return function(){
			var value = gen();
			if(value !== undefined){
				array.push(value);
			}
			return value;
		};
	},
	
	//a function that takes a generator and a predicate and produces a generator that produces the values approved by predicate
	filter: function(gen, pred){
		return function(){
			var value = gen();
			while((value !== undefined) && pred(value) === false){
				value = gen();
			}
			return value;
		}
	},
	
	//a function that takes two generators and produces a generator that combines the sequences
	concat: function(gen1, gen2){
		var useGen1 = true;
		return function(){
			var value;
			if(useGen1 === false){
				value = gen2();
			}
			else{
				value = gen1();
				if(value === undefined){
					value = gen2();
					useGen1 = false;
				}
			}			
			return value;
		};
	},
	
	//a function that returns an object containing two functions that implement up/down counter, hiding the counter
	// dynamically wrapping methods around data
	counter: function(arg){
		return {
			prev: function(){
				return --arg;
			},
			next: function(){
				return ++arg;
			}
		};
	},
	
	//a function that takes unary function and returns an object containing an invoke function that can invoke the unary function, and a revoke function that disables the invoke function.
	//dynamically adding and revoking methods to object
	revocable: function(unary){
		return {
			revoke: function(){
				unary = undefined;
			},
			invoke: function(arg){
				if(unary !== undefined){
					return unary(arg);
				}
			}
		};
	},
	
	//a function that makes a function that generates unique symbols
	gensymf: function(arg){
		var index = 1;
		return function(){
			return (arg + index++)
		};
	},
	
	//a function that takes a unary function and a seed and returns a gensymf like previous
	gensymff: function(unary, seed){
		return function(arg){
			return function() {
				return (arg + unary(seed))
			}
		};
	},
	
	//a function that returns a function that will return the next fibonacci number
	fibonacci: function(arg1, arg2){
// 		var a = arg1, b = arg2;
// 		return function(){
// 			var next = a;
// 			a = b;
// 			b += next
// 			return next;
// 		};
		var prev, beforePrev
		return function(){
			if(beforePrev === undefined){
				beforePrev = arg1;
				return beforePrev;
			}
			if(prev === undefined){
				prev = arg2;
				return prev;
			}
			var value = prev + beforePrev;
			beforePrev = prev;
			prev = value;
			return value;
		};
	},
	
	//helper function to create object in key-value fashion
	m: function(value, source){
		return {
			value: value,
			source: source || String(value)
		};
	},
	
	//a function that two m objects and returns an m object
	addm: function(m1, m2){
		return module.exports.m(m1.value + m2.value, "(" + m1.source + "+" + m2.source + ")");
	},
	
	//a function that takes binary function and string and returns a function that acts on m objects
	liftm: function(binary, op){
		return function(arg1, arg2){
			if(typeof(arg1) === 'number'){
				arg1 = module.exports.m(arg1);
			}
			if(typeof(arg2) === 'number'){
				arg2 = module.exports.m(arg2);
			}
			return module.exports.m(
				binary(arg1.value, arg2.value), 
				"(" + arg1.source + op + arg2.source + ")");
		};
	},
	
	//a function that evaluates simple array expressions
	//compiler like expression evaluation
	exp: function(arg){
		if(Array.isArray(arg) === false){
			return arg;
		}
		if(Array.isArray(arg[1]) === true){
			arg[1] = module.exports.exp(arg[1]);
		}
		if(Array.isArray(arg[2]) === true){
			arg[2] = module.exports.exp(arg[2]);
		}
		return arg[0](arg[1], arg[2]);
		//Alternative implementation
		//return arg[0](module.exports.exp(arg[1]), module.exports.exp(arg[2]));
	},
	
	//a function addg that adds from many invocations until it sees an empty invocation
	addg: function(first){
		function more(next){
			if(next === undefined){
				return first;
			}
			first += next;
			return more;
		}
		if(first !== undefined){
			return more;
		}
	},

	//a function that will take a binary function and apply it to many infocations
	liftg: function(op){
		return function (first){
			if(first === undefined){
				return first; //undefined
			}
			return function more(next){
				if(next === undefined){
					return first;
				}
				first = op(first, next);
				return more;
			}
		}
	},
	
	// a function that will return an array from many invocations
	arrayg: function(first){
		var theArray = [];
		function more(next){
			if(next === undefined){
				return theArray;
			}
			theArray.push(next);
			return more;
		}
		return more(first);
	},
	
	//a function that takes a unary function and returns a function that takes an argument and a callback
	unaryc: function(op){
		return function(callback, arg){
			callback(op(arg));
		}
	}
	
};