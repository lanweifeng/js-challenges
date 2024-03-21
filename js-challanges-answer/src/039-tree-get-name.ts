const treeData = [
    {
        name: "root",
        children: [
            { name: "src", children: [{ name: "index.html" }] },
            { name: "public", children: [] },
        ],
    },
];

// ['root/src/index.html', 'root/public']

const RecursiveTree = (data) => {
    const res: string[] = []

    const dfs = (item: any[], preFix: string = '') => {
        for(let i = 0; i < item.length; i++) {
            // 检测是不是子节点
            if(!item[i].children || !item[i].children.length) {
                res.push(`${preFix}${item[i].name}`);
            } else {
                dfs(item[i].children, `${preFix}${item[i].name}/`);
            }
        }
    }

    dfs(data)

    return res
}
console.log(RecursiveTree(treeData));
