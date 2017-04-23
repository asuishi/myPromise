let myPromise = require('../src/index');

let p = new myPromise(function(res,reject){
	// setTimeout(res,100,1);
	// setTimeout(reject,100,'error');
	res(3)
}).then(function(data){
	console.log("first: " +data);
	return "first";
},function(data){
	console.log(data);
	return "error1"
}).then(function(data){
	console.log("second: " + data);
	return "second";
}).then(function(data){
	return new myPromise(function(res,reject){
		// setTimeout(res,100,"promise");
		// setTimeout(reject,100,'error');
		res(3)
	})
});

let p1 = p.then(function(data){
	console.log("third: " + data);
	return "third";
})
// console.log(p == p1);
// console.log("p.deferreds:" + p.deferreds.length);


// let pr = Promise.resolve();
// let pr1 = pr.then(()=>console.log())

// console.log(pr == pr1);