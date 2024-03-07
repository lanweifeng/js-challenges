const printNum = (start: number, end: number) => {
    const res = [];

    for(let i = start; i <= end; i++){
        if(isReverseNum(i)){
            res.push(i);
        }
    }

    return res;
}

const isReverseNum = (num: number) => {
    const str = num.toString();
    let left = 0;
    let right = str.length - 1;

    while (left < right){
        if(str[left] !== str[right]){
            return false;
        }
        left++;
        right--;
    }

    return true;

}
