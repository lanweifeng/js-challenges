const isObj = (param) => String.prototype.toString.call(param) === '[object Object]'


const isEqual = (a, b) => {
    if(a === b) {
        return true
    }

    if(isObj(a) && isObj(b)) {
        const Akeys = Object.keys(a)
        const Bkeys = Object.keys(b)

        if(Akeys.length !== Bkeys.length) {
            // key个数不一致
            return false
        }

        if(Akeys.some(Akey => !Bkeys.includes(Akey))){
            // A有 B没有
            return false
        }

        // 这里不用再比较了，因为长度一致，所以上面那个循环已经比较了
      /*  if(Bkeys.some(Bkey => !Akeys.includes(Bkey))) {
            // B有 A没有
            return false
        }*/

        //都有
        for(let i = 0; i < Akeys.length; i++) {
            if(!isEqual(a[Akeys[i]], b[Akeys[i]])) {
                return false
            }
        }

        return true
    }

    // 其他对象（日期、正则）等默认不相等
    return false
}

