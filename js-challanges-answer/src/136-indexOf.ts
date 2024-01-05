String.prototype['myIndexOf'] = function (searchValue: string, fromIndex: number = 0) {
    for(let i = fromIndex; i < this.length; i++){
        let index = i;
        let isMatch = true;
        for(let j = 0; j < searchValue.length; j++){
            if(index >= this.length || this[index] !== searchValue[j]){
                isMatch = false;
                break;
            }
            index++;
        }
        if(isMatch){
            return i;
        }
    }
    return -1;
}
