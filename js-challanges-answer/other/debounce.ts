const debounce = (fn, time) => {
    let timer = null
    return (...args) => {
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, time)
    }
}
