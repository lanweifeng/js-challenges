Function.prototype['myBind'] = function (target, ...boundArgs) {
    const symbol = Symbol('temp')
    target[symbol] = this
    return (...args) => {
        return target[symbol](...(boundArgs.concat(args)))
    }
}
