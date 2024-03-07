// @ts-ignore
Promise.prototype.myFinally = function (fn: Function) {
    return this.then((res) => {
        fn()
        return res
    }, (e) => {
        fn()
        throw e
    })
}


// @ts-ignore
Promise.prototype.myFinally2 = function (fn: Function) {
    return this.then((res) => Promise.resolve(fn()).then(() => res), (reason) => Promise.resolve(fn()).then(() => { throw reason }))
}
