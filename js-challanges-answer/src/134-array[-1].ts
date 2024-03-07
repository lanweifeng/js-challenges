const ArrayProxy = (array: any[]) => {
    return new Proxy(array, {
        get: (target, prop) => {
            if (prop == '-1') {
                return target[target.length - 1];
            } else if (!isNaN(Number(prop))) {
                return target[prop];
            } else {
                return undefined;
            }
        }
    })
}
