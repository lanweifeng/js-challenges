const debounce = (fn, time: number) => {
    let timer = null
    return (...args) => {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, time)
    }
}


const throttle = (fn, delay) => {
    let preTime = Date.now()

    return (...args) => {
        const newTime = Date.now()
        if(newTime - preTime >= delay) {
            fn(...args)
            preTime =  Date.now()
        }
    }
}
