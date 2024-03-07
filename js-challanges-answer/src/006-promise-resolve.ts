Promise['myResolve'] = function (param: any) {
    if(param instanceof Promise) {
        return param
    }
    return new Promise((resolve) => resolve(param));
}
