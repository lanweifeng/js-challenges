const myInstanceof = (data: any, target: any) => {
    if(data === null || data === undefined || target === null || target === undefined){
        return false
    }

    let test = data
    while(test) {
        if (test.__proto__ === target.prototype) {
            return true
        }
        test = test.__proto__
    }

    return false;
}
