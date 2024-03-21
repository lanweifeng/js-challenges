// 现有如下json（简化为对象），已知每个节点id唯一，编写findNode(id)，返回路径，如findNode(5 输出 1->4->5

const json = {
    id: 1,
    children: [
        { id: 2, children: [{ id: 3, children: [] }] },
        {
            id: 4,
            children: [
                { id: 5, children: [] },
                { id: 6, children: [] },
            ],
        },
        { id: 7, children: [] },
    ],
};

const findPath = (tree: any, targetId: number) => {
    const dfs = (data: any, prePath = '') => {
        if(data.id === targetId) {
            return  prePath ? prePath + "->" + data.id : `${data.id}`
        } else {
            if(data.children) {
                for(let i = 0; i < data.children.length; i++) {
                    const res = dfs(data.children[i], prePath ? prePath + "->" + data.id : `${data.id}`)
                    if(res){
                        return res
                    }
                }
            }
        }
    }

    return dfs(tree)
}

console.log(findPath(json, 5))
