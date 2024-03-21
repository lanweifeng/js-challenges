const url =
    "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled"


// 分割法
const parseURL = (urlStr: string) => {
    const res = {}
    const arr1 = urlStr.split("?")
    if(!arr1[1]) {
        return res
    }
    const arr2 = arr1[1].split('&')
    arr2.forEach(i => {
        let [key, value] = i.split('=')
        value = value ? decodeURIComponent(value) : value
        if(Array.isArray(res[key])) {
            res[key].push(value)
        } else if(res[key]) {
            res[key] = [res[key], value];
        } else {
            res[key] = value;
        }
    })

    return res
}

// 正则法
const parseURL2 = (urlStr: string) => {
    const res = {}


    const reg = /[?&]([^=]+)=([^&]+)/g

    let match

    while((match = reg.exec(urlStr)) !== null) {
        let [_, key, value] = match
        value = value ? decodeURIComponent(value) : value
        if(Array.isArray(res[key])) {
            res[key].push(value)
        } else if(res[key]) {
            res[key] = [res[key], value];
        } else {
            res[key] = value;
        }
    }

    return res
}

console.log(parseURL(url))
console.log(parseURL2(url))
