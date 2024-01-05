Function.prototype['myCall'] = function (target, ...args: any[]){
    const temp = target || globalThis
    const key = Symbol('key')
    temp[key] = this;
    let res
    try{
        res = temp[key](...args)
    }finally {
        delete temp[key]
    }
    return res;
}

Function.prototype['myApply'] = function (target, args: any[]){
    const temp = target || globalThis;
    const key = Symbol('key')
    temp[key] = this
    let res;

    try{
        res = temp[key](...args)
    }finally {
        delete temp[key]
    }

    return res;
}


Function.prototype['myBind'] = function (target, ...args: any[]) {
    const originFn = this;
    const temp = target || globalThis

    const tempFn = function(...data: any[]){
        return originFn.apply(this instanceof tempFn ? this : temp, [...args, ...data])
    }

    tempFn.prototype = Object.create(originFn.prototype)

    return tempFn
}
