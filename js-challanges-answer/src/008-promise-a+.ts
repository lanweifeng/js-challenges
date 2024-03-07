let promiseCount = 1;
// 三种状态
enum STATUS {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class MyPromise {
    private status: STATUS = STATUS.PENDING
    private name = '';
    private cbs: {nextResolve: Function, preOnFulfilled?: Function}[] = []
    private value: any

    constructor(fn: (resolve: (res) => any, reject?: (reason) => any) => any) {
        this.name = `Promse-${promiseCount++}`;
        console.log(`【${this.name}】开始构造`);
        fn(this.resolve.bind(this))
    }

    resolve(res: any){
        console.log(`【${this.name}】开始执行resolve，收到入参`, res)

        // 如果resolve收到了一个promise，那么当前promise的状态要由入参的promise决定
        // 1. 作为头部promise，直接执行resolve(otherPromise)
        // 2. 作为后邻promise，前置promise执行then入参onFulfilled，返回了otherPromise，然后通过resolve传入
        if(res?.then instanceof Function) {
            // 这里其实就是执行了入参promise的then，onFulilled设置成了当前promise的resolve
            // 也就是说当前promise的resolve会进入两次，第一次是收到了promise入参，第二次是入参promise被resolve，通过then再次进入
            res.then.call(res, this.resolve.bind(this));
            return;
        }


        this.status =  STATUS.FULFILLED
        this.value = res
        console.log(`【${this.name}】状态已变更`)
        this.cbs.forEach(cb => {
            if(cb.preOnFulfilled){
                console.log(`【${this.name}】开始执行当前promise的onFulfilled`)
                const nextRes = cb.preOnFulfilled(res)
                console.log(`【${this.name}】开始执行后邻promise的resolve`)
                cb.nextResolve(nextRes)
            }else {
                console.log(`【${this.name}】当前promise没有注册onFulfilled，直接开始执行后邻promise的resolve`)
                cb.nextResolve()
            }
        });
    }

    then(onFulfilled?: Function){
        console.log(`【${this.name}】开始执行then，即将构造后邻promise`);
        const nextPromise = new MyPromise((nextResolve) => {
            if(this.status === STATUS.PENDING) {
                // 这里是关键，把onFulfilled和后邻Promise的resolve保存起来
                // 这样就可以实现后领promise的resolve接收到的入参是上一个onFulfilled的返回值
                onFulfilled && this.cbs.push({
                    nextResolve,
                    preOnFulfilled: onFulfilled,
                })
            } else if (this.status === STATUS.FULFILLED) {
                if(!onFulfilled) {
                    nextResolve(this.value);
                }else {
                    nextResolve(onFulfilled(this.value))
                }
            }
        })
        console.log(`【${this.name}】后邻promise: 【${nextPromise.name}】构造完毕，返回【${nextPromise.name}】`)
        return nextPromise
    }
}

/**
 * 模拟异步请求
 * @param {*} url
 * @param {*} s
 * @param {*} callback
 */
const mockAjax = (url, s, callback) => {
    setTimeout(() => {
        callback(url + '异步请求耗时' + s + '秒');
    }, 1000 * s)
}
const promise1 = new MyPromise(resolve => {
    mockAjax('getUserId', 1, function (result) {
        resolve(result);
    })
})
const promise2 = new MyPromise(resolve => {
    mockAjax('getUserName', 2, function (result) {
        resolve(result);
    })
})

promise1.then(id => {
    console.log(id)
    return promise2
}).then(name => {
    console.log(name)
})

