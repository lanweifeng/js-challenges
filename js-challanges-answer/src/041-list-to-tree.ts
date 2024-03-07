const data = [
    { id: 0, name: '部门0' },
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 2 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
    { id: 7, name: '部门7' },
    { id: 8, name: '部门8', pid: 7 },
    { id: 9, name: '部门9', pid: 7 },
    { id: 10, name: '部门10', pid: 9 },
    { id: 11, name: '部门11', pid: 10 },
    { id: 12, name: '部门12', pid: 0 },
    { id: 13, name: '部门13', pid: 12 },
    { id: 14, name: '部门14' },
    { id: 15, name: '部门15', pid: 14 },
]

const toTree = (list: any[]) => {
    const res: any[] = [];
    const temp = {};

    list.forEach((item) => {
        item.children = item.children || [];
        temp[item.id] = item;
    })

    list.forEach((item) => {
        if(temp[item.pid]){
            temp[item.pid].children.push(item);
        } else {
            res.push(item)
        }
    })

    return res;
}

console.log(toTree(data))
