Promise.resolve(1)
.then(Promise.resolve(2))
.then((data)=>{console.log(data)}) //1

Promise.resolve(1)
.then(() =>Promise.resolve(2))
.then((data)=>{console.log(data)}) // 2