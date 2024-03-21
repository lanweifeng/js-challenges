const throttle = (fn, time) => {
    let preTime = Date.now()
    let timer

    return (...args) => {
        const now = Date.now()
        clearTimeout(timer)
        if(now - preTime > time) {
            fn(...args)
        } else {
            timer = setTimeout(() => {
                fn(...args)
            }, time - (now - preTime));
        }
        preTime = now
    }
}
