var effJS = require('./eff_js_node_module');

// effJS.log(effJS.identity(3));

// effJS.log(effJS.addf(3)(4));

// var added = effJS.add(3,4);
// effJS.log(added);

// var sub = effJS.sub(3,4);
// effJS.log(sub);

// var mul = effJS.mul(3,4);
// effJS.log(mul);

// var idf3 = effJS.identityf(3);
// effJS.log(idf3());

// var addf1 = effJS.liftf(effJS.add);
// effJS.log(addf1(3)(4));
// effJS.log(effJS.liftf(effJS.mul)(3)(4));

// var add3 = effJS.curry(effJS.add , 3);
// effJS.log(add3(4));
// effJS.log(effJS.curry(effJS.mul, 5)(6));

// var inc1 = effJS.addf(1);
// effJS.log(inc1(5));
// effJS.log(inc1(inc1(5)));

// var inc2 = effJS.curry(effJS.add, 1);
// effJS.log(inc2(5));
// effJS.log(inc2(inc2(5)));

// var inc3 = effJS.liftf(effJS.add)(1);
// effJS.log(inc3(5));
// effJS.log(inc3(inc3(5)));

//returns a function that takes a binary function as argument and executes with same value as both arguments
// var double = effJS.twice(effJS.add);
// effJS.log(double(3));
// var square = effJS.twice(effJS.mul);
// effJS.log(square(3));

//returns a function that takes binary function as argument and returns a function that reverses the arguments of the binary function
// var bus = effJS.reverse(effJS.sub);
// effJS.log(bus(3, 2)); //-1

//returns a function that takes two unary functions as arguments and returns a function that executes both of them.
// var double = effJS.twice(effJS.add);
// var square = effJS.twice(effJS.mul);
// effJS.log(effJS.composeu(double, square)(5)); //100

//returns a function that takes two binary functions as arguments and returns a function that executes both of them.
// effJS.log(effJS.composeb(effJS.add, effJS.mul)(2, 3, 7)) //35

//returns a function that allows a binary function to be executed only once
// var add_once = effJS.once(effJS.add);
// effJS.log(add_once(3, 4)); // 7
// effJS.log(add_once(3, 5)); // Undefined
// var another_add_once = effJS.once(effJS.add);
// effJS.log(another_add_once(3, 5)); // 8

//function that produces a generator that produce values in a range
// var index = effJS.fromTo(0, 3);
// effJS.log(index()); //0
// effJS.log(index()); //1
// effJS.log(index()); //2
// effJS.log(index()); //undefined

//a function that takes an array and an optional generator and produces a generator that will produce the elements of the array
// var ele = effJS.element(['a', 'b', 'c', 'd']);
// effJS.log(ele()); //'a'
// effJS.log(ele()); //'b'
// effJS.log(ele()); //'c'
// effJS.log(ele()); //'d'
// effJS.log(ele()); //'undefined'
// var ele1 = effJS.element(['a', 'b', 'c', 'd'], effJS.fromTo(1, 3));
// effJS.log(ele1()); //'b'
// effJS.log(ele1()); //'c'
// effJS.log(ele1()); //'undefined'

//a function that takes a generator and an array and produces a function that will collect result in the array
// var array = [];
// var col = effJS.collect(effJS.fromTo(5,7), array);
// effJS.log(col()); // 5
// effJS.log(col()); // 6
// effJS.log(col()); // undefined
// effJS.log(array); //[5, 6]

//a function that takes a generator and a predicate and produces a generator that produces the values approved by predicate
// var fil = effJS.filter(effJS.fromTo(0, 5),
// 	function third(value){
// 		return ((value % 3) === 0)
// 	});
// effJS.log(fil()); //0
// effJS.log(fil()); //3
// effJS.log(fil()); //undefined

//a function that takes two generators and produces a generator that combines the sequences
// var con = effJS.concat(effJS.fromTo(0, 3), effJS.fromTo(0, 2));
// effJS.log(con()); //0
// effJS.log(con()); //1
// effJS.log(con()); //2
// effJS.log(con()); //0
// effJS.log(con()); //1
// effJS.log(con()); //undefined

//a function that returns an object containing two functions that implement up/down counter, hiding the counter
// var object = effJS.counter(10);
// var next = object.next;
// var prev = object. prev;
// effJS.log(next()); //11
// effJS.log(prev()); //10
// effJS.log(prev()); //9
// effJS.log(next()); //10

//a function that takes unary function and returns an object containing an invoke function that can invoke the unary function, and a revoke function that disables the invoke function.
// var rev = effJS.revocable(effJS.identity);
// var invoke = rev.invoke;
// effJS.log(invoke(7)); //7
// rev.revoke();
// effJS.log(invoke(7)); //undefined

//a function that makes a function that generates unique symbols
// var geng = effJS.gensymf("G"),
// 	genh = effJS.gensymf("H");
// effJS.log(geng()); //G1
// effJS.log(genh()); //H1
// effJS.log(geng()); //G2
// effJS.log(genh()); //H2
// effJS.log(geng()); //G3

//a function that takes a unary function and a seed and returns a gensymf like previous
// var gensymf = effJS.gensymff(effJS.inc, 0),
// 	gengg = gensymf("GG"),
// 	genhh = gensymf("HH");
// effJS.log(gengg()); //GG1
// effJS.log(genhh()); //HH1
// effJS.log(gengg()); //GG2
// effJS.log(genhh()); //HH2
// effJS.log(gengg()); //GG3

//a function that returns a function that will return the next fibonacci number
// var fib = effJS.fibonacci(0, 1);
// effJS.log(fib()); //0
// effJS.log(fib()); //1
// effJS.log(fib()); //1
// effJS.log(fib()); //2
// effJS.log(fib()); //3
// effJS.log(fib()); //5

//a function that two m objects and returns an m object
// effJS.log(JSON.stringify(effJS.m(3)));
// effJS.log(JSON.stringify(effJS.m(Math.PI, "PI")));
// var addm = effJS.addm(effJS.m(3), effJS.m(4))
// effJS.log(JSON.stringify(addm))

//a function that takes binary function and string and returns a function that acts on m objects
// var addm = effJS.liftm(effJS.add, "+");
// effJS.log(JSON.stringify(addm(effJS.m(3), effJS.m(4))));
// effJS.log(JSON.stringify(effJS.liftm(effJS.mul, "*")(effJS.m(3), effJS.m(4))));
//modify liftm to work with numbers and m objects
// effJS.log(JSON.stringify(addm(3, 4)));

//a function that evaluates simple array expressions
//var sae = [effJS.mul, 3, 3];
//var sae = [Math.square, 3];
//effJS.log(effJS.exp(sae)) //9
// effJS.log(effJS.exp(42)) //42

//modify exp to evaluate nested array expressions
//var nae = [Math.sqrt, [effJS.add, [Math.square, 3], [Math.square, 4]]];
// var nae = [effJS.add, [effJS.add, [effJS.mul, 3, 3], [effJS.mul, 4, 4]], 0];
// effJS.log(effJS.exp(nae));

//a function addg that adds from many invocations until it sees an empty invocation
// effJS.log(effJS.addg()); //undefined
// effJS.log(effJS.addg(2)()); //2
// effJS.log(effJS.addg(2)(7)()); //9
// effJS.log(effJS.addg(3)(4)(0)()); //7
// effJS.log(effJS.addg(1)(2)(4)(8)()); //15

//a function that will take a binary function and apply it to many invocations
// effJS.log(effJS.liftg(effJS.mul)()); //undefined
// effJS.log(effJS.liftg(effJS.mul)(3)()); //3
// effJS.log(effJS.liftg(effJS.mul)(3)(4)(0)()); //0
// effJS.log(effJS.liftg(effJS.mul)(1)(2)(4)(8)()); //64

// a function that will an array from many invocations
// effJS.log(effJS.arrayg()); //[]
// effJS.log(effJS.arrayg(3)()); //[3]
// effJS.log(effJS.arrayg(3)(4)(5)()); //[3, 5, 5]

//a function that takes a unary function and returns a function that takes an argument and a callback
// sqrtc = effJS.unaryc(Math.sqrt);
// sqrtc(effJS.log, 81); //9


