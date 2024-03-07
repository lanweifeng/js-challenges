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


const toList = (tree: any[]) => {
    const res: any[] = [];

    const dfs = (treeItem: any[]) => {
        treeItem.forEach((item) => {
            const {children, ...rest} = item;
            res.push(rest);
            if (children) {
                dfs(children);
            }
        })
    }

    dfs(tree)

    return res;
}

console.log(toList(data))
