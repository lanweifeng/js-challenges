
const data = {
    name: 'root',
    children: [
        { name: '叶子1-1' }, // 正常叶子节点
        { name: '叶子1-2', children: [] }, // 有 children 属性但为空数组的节点
        {
            name: '叶子2-1',
            children: [
                {
                    name: '叶子3-1',
                    children: [
                        { name: '叶子4-1' } // 正常的更深层次叶子节点
                    ]
                }
            ]
        }
    ]
}

// 深度优先， 外部变量记录当前深度，递归需要回退
const getTreeDepth = (tree: any) => {

    let maxDepth = 0
    let curDepth = 0

    const dfs = (treeData: any) => {
        curDepth++
        if(curDepth > maxDepth) {
            maxDepth = curDepth
        }
        if(Array.isArray(treeData.children) && treeData.children.length) {
            treeData.children.forEach(childItem => dfs(childItem))
        }
        curDepth--
    }

    dfs(tree)

    return maxDepth
}

// 深度优先，通过形参记录当前深度，不需要回退
const getTreeDepth2 = (tree: any) => {
    let maxDepth = 0


    const dfs = (node: any, curDepth = 1) => {

        // 叶子节点
        if(!node.children || node.children.length === 0) {
            maxDepth = Math.max(maxDepth, curDepth)
            return
        }

        node.children.forEach(child => dfs(child, curDepth + 1))

    }

    dfs(tree)

    return maxDepth

}

// 广度优先, 使用shift删除层头节点
const getTreeDepth3 = (tree: any) => {
    let depth = 0

    // 广度优先队列
    const queue: any[] = []

    if(tree) {
        queue.push(tree)
    }

    // 遍历队列
    while(queue.length) {
        // 进来就是一层
        depth++
        // 这一层的个数
        const size = queue.length
        // 遍历这一层
        for(let i = 0; i < size; i++) {
            // 取出这一层当前的第一个节点
            const node = queue.shift()
            if(node.children && node.children.length) {
                // 将下一层的节点放入队列
                queue.push(...node.children)
            }
        }
    }

    return depth
}

// 广度优先，使用指针记录层节点，不删除
const getTreeDepth4 = (tree: any) => {
    let depth = 0
    const queue: any[] = []
    let levelStart = 0

    if(tree){
        queue.push(tree)
    }

    // 使用start来确定是否有更多节点需要处理
    while(levelStart < queue.length){
        // 进来就是一层
        depth++
        // 当前层级节点个数
        const size = queue.length - levelStart
        // 遍历这一层
        for(let i = 0; i < size; i++) {
            // 不同点：不使用shift()，使用指针定位，减小数组操作成本
            const node = queue[levelStart + i]
            if(node.children && node.children.length) {
                // 将下一层的节点放入队列
                queue.push(...node.children)
            }
        }
        // 更新start的位置，这一层已经遍历完了
        levelStart += size
    }


    return depth
}


console.log(getTreeDepth(data))
console.log(getTreeDepth2(data))
console.log(getTreeDepth3(data))
console.log(getTreeDepth4(data))
