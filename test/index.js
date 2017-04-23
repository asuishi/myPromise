let myPromise = require('../src/index');

let p = new myPromise(function(res){
	setTimeout(res,100,1);
}).then(function(data){
	console.log("first: " +data);
}).then(function(data){
	console.log("second: " + data);
});

p.then(function(data){
	console.log("third: " + data);
})