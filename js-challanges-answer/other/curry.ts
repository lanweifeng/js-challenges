const curry = (fn) => {
    const handle = (...args) => {
        if(args.length > fn.length) {
            return fn(...args)
        } else {
            return (...arg) => handle(...args, ...arg)
        }
    }

    return handle
}
