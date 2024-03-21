let str = "QIANDUANGOngchengshi猕猴桃Jquery很帅！哈哈 haha";
// str = str.replace(/[a-zA-Z]/g, (content) => {
//     return content.toUpperCase() === content
//         ? content.toLowerCase()
//         : content.toUpperCase();
// });

str = str.replace(/[a-zA-Z]/g, (content) => {
    return content.toUpperCase() === content ? content.toLowerCase() : content.toUpperCase()
})


console.log(str);
