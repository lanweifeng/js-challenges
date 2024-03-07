const myPromiseAll = (promises: Promise<any>[]) => {
    if (!Array.isArray(promises)) {
        throw new Error('The input should be an array of promises.');
    }
    if (promises.length === 0) {
        return Promise.resolve([]);
    }
    const res: Promise<any>[] = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
            p.then((r) => {
                count++
                res[index] = r;
                if (count === promises.length) {
                    resolve(res)
                }
            }).catch((e) => {
                reject(e);
            })
        })
    })
}


const myPromiseAll2 = (promises: Promise<unknown>[]): Promise<unknown[]> => {
    if(!Array.isArray(promises)) {
        throw new Error('必须传入数组')
    }

    if(promises.length === 0) {
        return Promise.resolve([])
    }

    const result = []
    let count = 0

    return new Promise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then((res) => {
                    result[i] = res
                    count++
                    if(count === promises.length) {
                        resolve(result)
                    }
                }).catch((e) => {
                    reject(e)
                })
        }
    })
}
