const STATE = {
	pending:0,
	fulfilled:1,
	reject:-1
};

function myPromise( fn ){
	let deferreds = [];
	let value = null;
	let state = STATE.pending;
	this.deferreds = deferreds;

	this.then = function(onFulfilled,onRejected){
		return new myPromise(function(resolve,reject){
			resolveHandle({
				onFulfilled: onFulfilled || null,
				onRejected: onRejected || null,
				resolve: resolve,
				reject:reject
			});
		});
	}


	function resolveHandle(deferred){
		if(state === STATE.pending){
			deferreds.push(deferred);
		}else if(state === STATE.reject){
			let cb =  deferred.onRejected || deferred.reject
			let ret = cb(value);
			deferred.resolve(ret); // 此处为resolve
		}else{
			let cb =  deferred.onFulfilled || deferred.resolve
			let ret = deferred.onFulfilled(value);
			deferred.resolve(ret);
		}
	}


	function resolve(val){
		if(val && (typeof val === 'function')){ // Promise
			let then = val.then;
			if(typeof then === "function"){
				then.call(val,resolve,reject);
				return;
			}
		}

		value =val;
		state = STATE.fulfilled;
		realDo();
	}

	function reject(reason){
		state = STATE.reject;
		value = reason;
		realDo();
	}

	function realDo(){
		setTimeout(() =>{
			deferreds.forEach( deferred =>{
				resolveHandle(deferred);
			});
		});
	}

	fn(resolve,reject);
}

module.exports = myPromise;