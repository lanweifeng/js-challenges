Promise.prototype['myCatch'] = function (fn: (reason: any) => any) {
    return this.then(null, (reason) => fn(reason))
}
