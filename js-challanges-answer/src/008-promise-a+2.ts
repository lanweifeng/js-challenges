let promiseCount = 1;
// 三种状态
enum STATUS {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

class MyPromise {
    private status = STATUS.PENDING
    private onFulfilled!: Function | undefined
    private onReject!: Function | undefined
    private nextPromiseResolve!: Function | undefined
    private nextPromiseReject!: Function | undefined
    private value!: any
    private readonly name: string = ''

    static resolve(param?: any) {
        if(!param) {
            return new MyPromise((resolve) => resolve())
        } else {
            if(param instanceof MyPromise) {
                return param
            }

            if(param?.then instanceof Function) {
                let then = param.then;
                return new MyPromise(resolve => {
                    then(resolve);
                });
            }

            return new MyPromise((resolve) => resolve(param))
        }
    }

    static reject(param: any) {
        if(param?.then instanceof Function) {
            let then = param.then;
            return new MyPromise((_, reject) => {
                then(reject)
            })
        } else {
            return new MyPromise((_, reject) => reject(param))
        }
    }

    static all(promises: MyPromise[]) {
        if(!Array.isArray(promises)) {
            throw new Error('argument must arry')
        }

        const results: any[] = []
        let count = 0

        if(promises.length === 0) {
            return MyPromise.resolve(results)
        }

        return new MyPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then((res) => {
                    count++
                    results[index] = res
                    if(count === promises.length) {
                        resolve(results)
                    }
                }, (reason) => {
                    reject(reason)
                })
            })
        })
    }

    static race(promises: MyPromise[]){
        if(!Array.isArray(promises)) {
            throw new Error('argument must arry')
        }

        if(promises.length === 0) {
            return MyPromise.resolve()
        }

        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then(resolve, reject);
            })
        })
    }

    constructor(fn: (resolve: Function, reject: Function) => void) {
        this.name = `Promse-${promiseCount++}`;
        console.log(`【${this.name}】开始构造`);
        fn(this._resolve.bind(this), this._reject.bind(this))
    }

    // 这里只处理终态
    _handle() {

        if(this.status === STATUS.FULFILLED || this.status === STATUS.REJECTED) {
            const handleCb = this.status === STATUS.FULFILLED ? this.onFulfilled : this.onReject
            const nextPromiseCb = this.status === STATUS.FULFILLED ? this.nextPromiseResolve : this.nextPromiseReject

            let nextRes

            if(handleCb) {
                try {
                    nextRes = handleCb(this.value)
                }catch (e) {
                    this.nextPromiseReject && this.nextPromiseReject(e)
                }
            }

            if(nextPromiseCb) {
                nextPromiseCb(nextRes)
            }
        }
    }

    _resolve(res?: any){

        if(this.status !== STATUS.PENDING) {
            return
        }

        // 如果收到了promise，则向入参promise注册then,回调是当前promise的_resolve
        // 这就意味着当前promise的_resolve会进入两次
        if(res?.then instanceof Function) {
            res.then(this._resolve.bind(this), this._reject.bind(this))
            return
        }

        this.status = STATUS.FULFILLED
        this.value = res

        this._handle()
    }

    _reject(reason: any) {
        this.status = STATUS.REJECTED
        this.value = reason

        this._handle()

    }

    then(onFulfilled?: Function, onReject?: Function){

        return new MyPromise((resolve, reject) => {
            // 保存当前promise的onFulfilled和onReject
            // 以及后邻promise的resolve和reject
            this.onFulfilled = onFulfilled
            this.onReject = onReject
            this.nextPromiseResolve = resolve
            this.nextPromiseReject = reject

            // 根据当前promise的状态，继续执行后续操作
            this._handle()
        })
    }

    catch(onError: Function) {
        return this.then(undefined, onError);
    }

    finally (onDone: Function){
        return this.then((res) => MyPromise.resolve(onDone()).then(() => res), (reason) => MyPromise.resolve(onDone()).then(() => { throw reason }))
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

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000)
}).finally(() => {
    console.log('onDone')
})
