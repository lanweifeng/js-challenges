Promise['myRace'] = function (promises: Promise<unknown>[]): Promise<unknown> {
    if(!Array.isArray(promises)) {
        throw new Error('Please provide an array of promises');
    }
    return new Promise<unknown>((resolve, reject) => {
        promises.forEach((promise, i) => {
            promise.then(resolve, reject);
        })
    })
}
