const random = (start, end, count) => {
    const res = [];
    const record = {};

    for(let i = 0; i < count; i++){
        let num = getRandomInt(start, end);
        while(record[num]){
            num = getRandomInt(start, end);
        }
        res.push(num);
        record[num] = true;
    }

    return res;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
