function log(arg){
	//document.writeln(arg); html
	console.log(arg);
}

function identity(x){
	return x;
}

function add(x, y){
	return x + y;
}

function sub(x, y){
	return x - y;
}

function mul(x, y){
	return x * y;
}

function identityf(arg){
	return function(){
		return arg
	};
}

function addf(arg1){
	return function(arg2){
		return arg1 + arg2
	}
}

function liftf(arg){
	return function(arg1){
		return function (arg2){
			return arg(arg1, arg2);
		 };
	};
}

function curry(argf, arg1){
	return function(arg2){
		return argf(arg1, arg2);
	};
}

//Testing

var inc1 = addf(1);
log(inc1(5))
log(inc1(inc1(5)))

var inc2 = curry(add, 1);
log(inc2(5))
log(inc2(inc2(5)))

var inc3 = liftf(add)(1)
log(inc3(5))
log(inc3(inc3(5)))



// var add3 = curry(add , 3);
// log(add3(4));
// log(curry(mul, 5)(6))
// 
// var addf1 = liftf(add);
// log(addf1(3)(4))
// log(liftf(mul)(3)(4))
// 
// log(addf(3)(4));
// 
// var added = add(3,4);
// log(added);
// 
// var sub = sub(3,4);
// log(sub);
// 
// var mul = mul(3,4);
// log(mul);
// 
// var idf3 = identityf(3);
// log(idf3());


