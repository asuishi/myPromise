function myPromise( fn ){
	let deferreds = [];
	let value = null;

	this.then = function(onFulfilled){
		deferreds.push(onFulfilled);
		return this; // chain
	}

	function resolve(val){
		deferreds.forEach( deferred =>{
			deferred(val)
		})
	}
	fn(resolve);
}

module.exports = myPromise;