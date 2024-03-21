function MyNew (targetClass, ...initParam) {
    const res = Object.create(targetClass.prototype)
    res['__proto__'] = targetClass.prototype
    const result = targetClass.apply(res, initParam)
    if((typeof result === 'object' || typeof result === 'function') && result !== null) {
        return result
    }
    return res
}

class A {
    private name!: string
    constructor(name: string) {
        this.name = name;
    }
}

const a = MyNew(A, 'test')
console.log(a)
console.log(a.constructor)
