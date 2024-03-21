let str = ' as      '

const trim = (string: string) => {
    return string.replace(/^\s*|\s*$/g, '')
}

console.log(trim(str))
