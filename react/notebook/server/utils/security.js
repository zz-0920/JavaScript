// 转译标签，防止sql注入
const escape = (str) => {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

module.exports ={
    escape
}