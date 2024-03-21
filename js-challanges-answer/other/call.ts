Function.prototype['myCall'] = function (target, ...args) {
    target = target || window
    const symbol = Symbol('temp')
    target[symbol] = this;
    const result = target[symbol](...args);
    delete target[symbol];
    return result;
}
