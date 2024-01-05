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
