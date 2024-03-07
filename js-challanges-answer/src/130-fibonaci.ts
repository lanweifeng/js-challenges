const record = {};
const fibonaci = (index: number) => {
    if(index <= 0 || !Number.isInteger(index)) {
        throw new Error('Index must be a positive integer.');
    }
    if(index === 1 || index === 2) {
        return 1
    }
    if(record[index]) {
        return record[index];
    }
    const res = fibonaci(index - 1) + fibonaci(index - 2)
    record[index] = res
    return res;
}
