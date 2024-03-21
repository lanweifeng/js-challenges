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

const deepClone2 = (data: any) => {
    // 数据记录，用于防止循环引用
    const record = new Map()

    const deepCloneData = (dataTemp) => {
        // 是否出现过
        if(record.has(dataTemp)){
            return record.get(dataTemp)
        }

        // 检测基础类型
        if(typeof dataTemp !== 'object' || dataTemp === null) {
            return dataTemp
        }

        // 用于深拷贝的对象
        let clone

        if(Array.isArray(data)) {
            // 数组处理
            clone = []
            record.set(dataTemp, clone); // 提前设置记录，防止循环引用
            clone = dataTemp.map((item) => deepCloneData(item));
        } else if(dataTemp instanceof RegExp) {
            // 正则对象处理
            clone = new RegExp(dataTemp)
            record.set(dataTemp, clone);
        } else if(dataTemp instanceof Date) {
            // 日期对象处理
            clone = new Date(dataTemp)
            record.set(dataTemp, clone);
        } else {
            // kv对象处理
            clone = {}
            record.set(dataTemp, clone); // 提前设置记录，防止循环引用
            Object.keys(dataTemp).forEach((key) => {
                clone[key] = deepCloneData(dataTemp[key]);
            })
        }

        record.set(dataTemp, clone)
        return clone
    }

    return deepCloneData(data)

}
