const url = 'http://www.baidu.com/order/home?user=Tom&id=123&city=%E5%8D%97%E6%98%8C&id=1'

const output = {
  protocol: 'http',
  hostname: 'www.baidu.com',
  path: 'order',
  query: {
    user: 'Tom',
    id: [123, 1],
    city: '南昌'
  }
}

function parser(url) {
  const protocolArr = url.split('://')
  const protocol = protocolArr[0]
  const hostname = protocolArr[1].split('/')[0]
  const path = protocolArr[1].split('?')[0].slice(hostname.length)
  const query = {}
  const queryArr = protocolArr[1].split('?')[1].split('&')
  queryArr.forEach((item) => {
    const itemArr = item.split('=')
    const key = itemArr[0]
    const value = decodeURI(itemArr[1])
    query[key] = value
  })

  return {
    protocol,
    hostname,
    path,
    query
  }
}

console.log(parser(url));