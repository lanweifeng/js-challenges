const flat = (data: any[] = []) => {
    const res = [];

    const dfs = (item) => {
        if(Array.isArray(item)){
            item.forEach((i) => {
                dfs(i)
            })
        }else {
            res.push(item)
        }
    }
    data.forEach((i) => {
        dfs(i);
    })

    return res;
}

// dfs可以保证顺序不变
Array.prototype['myFlat'] = function(depth: number = 1) {
    const res = []

    const dfs = (data: any, curDepth: number) => {
        if(Array.isArray(data)) {
            if(curDepth >= depth) {
                res.push(data)
            } else {
                data.forEach(item => dfs(item, curDepth + 1))
            }
        } else {
            res.push(data)
        }
    }

    this.forEach(item => dfs(item, 0))

    return res
}

// bfs，顺序会变
Array.prototype['myFlat2'] = function(depth: number = 1){
    let curDepth = 0
    const queue = [...this]
    const res = []
    let start = 0

    while (start < queue.length) {
        const size = queue.length - start
        for(let i = 0; i < size; i++) {
            if(Array.isArray(queue[i]) && curDepth < depth){
                queue.push(...queue[i])
            } else {
                res.push(queue[i])
            }
        }
        curDepth++
        start += size
    }

    return res
}
