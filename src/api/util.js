function groupArr (arr, step = 2) {
  return arr.reduce((x, y, idx, arr) => {
    return x[x.length - 1].push(y) === step ? (idx !== arr.length - 1 ? [...x, []] : [...x]) : [...x]
  }, [[]])
}
let idx
function throttling (callback, imgs, defaultSrc, delay = 1000) {
  idx = 0
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      callback(imgs, defaultSrc)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}
function lzimg (imgs, defaultSrc) {
  const clientHeight = document.documentElement.clientHeight
  const len = imgs.length
  for (let i = idx; i < len; i++) {
    if (imgs[i].getBoundingClientRect().top < clientHeight) {
      if (imgs[i].getAttribute('src').includes(defaultSrc)) {
        imgs[i].src = imgs[i].getAttribute('data-lazy')
        idx++
      }
    }
  }
}

export {
  groupArr,
  lzimg,
  throttling
}
