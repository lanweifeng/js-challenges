const deepClone = (data) => {
    const record = new Map();
    const deep = (dataTemp) => {
        if(record.get(dataTemp)){
            return record.get(dataTemp)
        }

        if(typeof dataTemp !== 'object' || dataTemp === null){
            return dataTemp
        }

        let clone
        if(Array.isArray(dataTemp)){
            clone = []
            record.set(dataTemp, clone);
            dataTemp.forEach((i) => {
                clone.push(deep(i))
            })
            return clone
        }else if(dataTemp instanceof RegExp){
            clone = new RegExp(dataTemp)
            record.set(dataTemp, clone);
            return clone
        }else if(dataTemp instanceof Date){
            clone = new Date(dataTemp)
            record.set(dataTemp, clone);
            return clone
        } else if(Object.prototype.toString.call(dataTemp) === '[object Object]'){
            const clone = {}
            record.set(dataTemp, clone);
            Object.keys(dataTemp).forEach(key => {
                clone[key] = deep(dataTemp[key])
            })
            return clone
        }
    }
    return deep(data);
}
