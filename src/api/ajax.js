export default (type = 'get', url, data = {}, async = true) => new Promise((resolve, reject) => {
  type = type.toUpperCase()
  let xhr
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest()
  } else {
    xhr = new ActiveXObject()
  }

  if (type === 'GET') {
    let str = ''
    Object.keys(data).forEach(key => {
      str += key + '=' + data[key] + '&'
    })
    str = str.slice(0, str.lastIndexOf('&'))
    url = str.length ? url + '?' + str : url
    xhr.open(type, url, async)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send()
  } else if (type === 'POST') {
    xhr.open(type, url, async)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(data))
  } else {
    reject(new Error('错误'))
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
        let obj = xhr.response
        if (typeof obj !== 'object') obj = JSON.parse(xhr.response)
        resolve(obj)
      } else {
        reject(xhr)
      }
    }
  }
})
