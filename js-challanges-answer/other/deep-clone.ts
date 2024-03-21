const deepClone = (source) => {

    const map = new Map()

    const clone = (data) => {
        // 基础类型直接返回
        if(typeof data !== 'object' || data === null) {
            return data;
        }

        // 处理过，直接返回
        if(map.has(data)) {
            return map.get(data)
        }

        // 处理复杂类型
        let cloneData

        if(Array.isArray(data)) {
            // 数组，遍历克隆
            cloneData = []
            map.set(data, cloneData);
            data.forEach(item => cloneData.push(clone(item)));
        } else if(data instanceof Date) {
            cloneData = new Date(data.getTime())
            map.set(data, cloneData)
        } else if(data instanceof RegExp) {
            cloneData = new RegExp(data)
            map.set(data, cloneData)
        } else if(data instanceof Function) {
            cloneData= data.bind()
            map.set(data, cloneData)
        } else {
            cloneData = {}
            map.set(data, cloneData)
            Object.keys(data).forEach(key => {
                cloneData[key] = clone(data[key])
            })
        }

        return cloneData

    }

    return clone(source)

}
