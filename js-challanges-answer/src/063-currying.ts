const currying = (fn) => {
    const handle = (...args) => {
        if(args.length >= fn.length) {
            return fn(...args)
        }
        return (...arg) => handle(...args, ...arg)
    }

    return handle
}
