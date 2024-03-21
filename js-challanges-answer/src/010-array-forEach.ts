Array.prototype['myForEach'] = function (cb: (item: any, index?: number, array?: Array<any>) => void) {
    for(let i = 0; i < this.length; i++) {
        cb(this[i], i, this)
    }
}
