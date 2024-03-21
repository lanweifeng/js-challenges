const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1,
                children: [
                    {
                        id: 3,
                        text: '节点1_1_1',
                        parentId: 2
                    },
                    {
                        id: 4,
                        text: '节点1_1_2',
                        parentId: 2
                    }
                ]
            },
            {
                id: 5,
                text: '节点1_2',
                parentId: 1,
                children: [
                    {
                        id: 6,
                        text: '节点1_2_1',
                        parentId: 5
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        text: '节点2',
        parentId: 0,
        children: [
            {
                id: 8,
                text: '节点2_1',
                parentId: 7
            }
        ]
    }
]


function treeToList(data: any[]) {
    let res: any[] = [];

    const dfs = (tree: any[]) => {
        tree.forEach(node => {
            const {children, ...item} = node
            res.push(item)
            if(children && children.length) {
                dfs(children)
            }
        })
    }

    dfs(data)

    return res;
}

const treeToList2 = (data: any[]) => {
    const res: any[] = []
    const queue: any[] = data || []

    while (queue.length) {
        const size = queue.length
        for(let i = 0; i < size; i++) {
            const node = queue.shift()
            const {children, ...item} = node
            res.push(item)
            if(children?.length) {
                queue.push(...children)
            }
        }
    }

    return res
}


console.log(treeToList(data))
console.log(treeToList2(data))
