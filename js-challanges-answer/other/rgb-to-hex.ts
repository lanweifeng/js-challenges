// rgb(255, 0, 0)
// #ff3300

const rgbToHex = (rgb: string) => {
    const reg = /^(rgb|RGB)\(([^)]*)\)$/g
    const match = reg.exec(rgb)

    const rgbStr = match?.[2]
    if(rgbStr){
        const [r, g, b] = rgbStr.split(',').map(i => parseInt(i.trim()).toString(16).padStart(2, '0'))
        return `#${r}${g}${b}`
    }
    return null
}

console.log(rgbToHex('rgb(255, 51, 0)'))
