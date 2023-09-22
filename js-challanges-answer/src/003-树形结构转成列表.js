const data = [
    {
        id: 1,
        text: '福建省',
        children: [
            {
                id: 2,
                text: '龙岩市',
            }
        ]
    }
]

function findId(array, id) {
    let result = '';
    const find = (array, id) => {
        for(let i = 0; i < array.length; i++) {
            if(array[i].id === id) {
                result = array[i].text + result;
                return true;
            }
            if(array[i].children) {
                const isFind = find(array[i].children, id);
                if(isFind) {
                    result = array[i].text + result;
                    return true;
                }
            }
        }
    }
    find(array, id)
    return result;
}
