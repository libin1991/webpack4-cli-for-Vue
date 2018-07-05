const obj = {
    'Brazil': '巴西',
    'Switzerland': '瑞士',
    'CostaRica': '哥斯达黎加',
    'Serbia': '塞尔维亚',
    'Germany': '德国',
    'Mexico': '墨西哥',
    'Sweden': '瑞典',
    'Korea': '韩国',
    'Belgium': '比利时',
    'Panama': '巴拿马',
    'Tunisia': '突尼斯',
    'England': '英格兰',
    'Poland': '波兰',
    'Senegal': '塞内加尔',
    'Colombia': '哥伦比亚',
    'Japan': '日本'
}
console.log(Object.entries(obj))

for (let [key, val] of Object.entries(obj)) {
    console.log(key, val)
}

// const getEngName = ChineseName => {
//     let engName
//     for (let [key, val] of Object.entries(obj)) {
//         engName = (val == ChineseName && key)
//     }
//     return engName
// }

// console.log('日本 :', getEngName('日本'))

const arr = [
    [ 'Brazil', '巴西' ],
    [ 'Switzerland', '瑞士' ],
    [ 'CostaRica', '哥斯达黎加' ],
    [ 'Serbia', '塞尔维亚' ],
    [ 'Germany', '德国' ],
    [ 'Mexico', '墨西哥' ],
    [ 'Sweden', '瑞典' ],
    [ 'Korea', '韩国' ],
    [ 'Belgium', '比利时' ],
    [ 'Panama', '巴拿马' ],
    [ 'Tunisia', '突尼斯' ],
    [ 'England', '英格兰' ],
    [ 'Poland', '波兰' ],
    [ 'Senegal', '塞内加尔' ],
    [ 'Colombia', '哥伦比亚' ],
    [ 'Japan', '日本' ]
]

/* eslint eqeqeq:0 */
const getEngName = ChineseName => arr.filter(e => e[1] == ChineseName)[0][0]

console.log('韩国的英文名为：', getEngName('韩国'))
