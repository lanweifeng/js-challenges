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
