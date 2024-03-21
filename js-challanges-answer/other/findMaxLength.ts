const findMaxLength = (data: Array<number>) => {
    if(!Array.isArray(data)){
        return 0
    }

    let max = 0
    let record = []
    data.forEach((item) => {
        if(item >= 0) {
            record.push(item)
            max = Math.max(max, record.length)
        }else {
            record = []
        }
    })

    return max
}
