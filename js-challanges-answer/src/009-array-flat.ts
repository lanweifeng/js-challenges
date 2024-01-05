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
