const tree = {
    name: '中国',
    children: [
        {
            name: '北京',
            children: [
                {
                    name: '朝阳群众'
                },
                {
                    name: '海淀区'
                },
                {
                    name: '昌平区'
                }
            ]
        },
        {
            name: '浙江省',
            children: [
                {
                    name: '杭州市',
                    code: '0571',
                },
                {
                    name: '嘉兴市'
                },
                {
                    name: '绍兴市'
                },
                {
                    name: '宁波市'
                }
            ]
        }
    ]
};

// 本质是遍历, dfs，bfs都行

const getTreeObj = (data: any, name: string) => {
    const dfs = (treeData, name) => {
        if(treeData.name === name) {
            return treeData
        } else {
            if(treeData.children) {
                for(let i = 0; i < treeData.children.length; i++) {
                        const res = dfs(treeData.children[i], name)
                        if(res) {
                            return res
                        }
                }
            }
        }
    }

    return dfs(data, name)
}

const getTreeObj2 = (data: any, name: string) => {
    const queue: any[] = []
    if(data) {
        queue.push(data)
    }

    while (queue.length) {
        const size = queue.length
        for(let i = 0; i < size; i++) {
            const node = queue.shift();
            if(node.name === name) {
                return node
            }
            if(node.children) {
                queue.push(...node.children)
            }
        }
    }

}

console.log(getTreeObj(tree, '杭州市'))
console.log(getTreeObj2(tree, '杭州市'))
