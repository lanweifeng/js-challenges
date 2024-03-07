Promise.prototype["myAllSettle"] = function(promise: Promise<any>[]){
    const result = [];

    const allPromise = promise.map((promise, index) => {
        return promise.then((data) => {
            result[index] = {status: 'fulfilled', value: data}
        }, (e) => {
            result[index] = {status: 'rejected', value: e}
        }).catch((e) => {
            result[index] = {status: 'rejected', value: e}
        })
    })

    return Promise.all(allPromise).then(() => result)
}

Promise['myAllSettle2'] = function (promises: Promise<unknown>[]) {
    if(!Array.isArray(promises)) {
        throw Error('请传入数组')
    }

    const result: {status: 'fulfilled' | 'rejected', value?: unknown, reason?: unknown}[] = [];
    const allPromises = promises.map((promise, i) => {
        return promise.then((res) => {
            result[i] = { status: 'fulfilled', value: res };
        }, (reason) => {
            result[i] =  { status: 'rejected', reason };
        })
    })

    return Promise.all(allPromises).then(() => result)
}
