const add = (num, sum = 0) => {
    if(num === 0) {
        return sum;
    }
    return add(num - 1, sum + num)
}

add(100)
