Promise['myReject'] = function (param: any) {
    return new Promise((resolve, reject) => reject(param));
}
