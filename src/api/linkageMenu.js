export default class linkageMenu {
  constructor (optioins) {
    const { container, cur } = optioins
    this.data = optioins.data
    this.pos = {}
    this.container = document.querySelector(container)
    this.containerH = this.container.offsetHeight
    this.provincesEl = this.container.querySelector('.province')
    this.citysEl = this.container.querySelector('.city')
    this.areasEl = this.container.querySelector('.area')
    this.events = ['start', 'move', 'end']
    this.cur = cur
  }

  /**
   * @description 初始化地图数据
   */
  init () {
    this.initView(this.provincesEl, this.getData(this.data), 0)
  }

  /**
   * @description 渲染指定容器数据
   * @param {Element} box 容器
   * @param {Array} data 渲染数据
   * @param {Number} idx
   */
  initView (box, data, idx) {
    const cur = idx === 0 ? this.cur : ''
    const type = box.dataset.type
    let str = `<li class= ${cur} data-clear="0" data-idx="0">请选择</li>`
    this.pos[type + 'Num'] = data.length
    data.forEach((val, i) => {
      if (i + 1 === idx) {
        str += `<li class=${cur} data-idx = ${i + 1}>${val}</li>`
      } else {
        str += `<li data-idx = ${i + 1}>${val}</li>`
      }
    })
    box.innerHTML = str
    this.bindEvents(box)
  }

  /**
   * @description 从数据中提取数组类型的数据
   * @param {Object} obj
   * @param {String} key1
   * @param {String} key2
   * @returns 数组
   */
  getData (obj, key1, key2) {
    if (!key1) return Object.keys(obj)
    if (!key2) return Object.keys(obj[key1])
    return obj[key1][key2]
  }

  /**
   * @param {Event} event
   */
  movestart (event) {
    if (event.cancelable) {
      if (!event.defaultPrevented) {
        event.preventDefault()
      }
    }
    const el = event.target.parentElement
    const type = el.dataset.type
    const tY = el.style.transform
    this.pos[type + 'StartTime'] = Date.now()
    this.pos[type + 'Ty'] = this.extractTop(tY)
    this.pos[type + 'StartT'] = event.changedTouches[0].pageY
    this.pos[type + 'Index'] = event.target.dataset.idx
  }

  /**
   * @param {Event} event
   */
  movemove (event) {
    const el = event.target.parentElement
    const type = el.dataset.type
    const endT = event.changedTouches[0].pageY - this.pos[type + 'StartT']
    this.pos[type + 'EndT'] = this.pos[type + 'Ty'] + endT
    const idx = Math.round(this.pos[type + 'EndT'] / this.containerH)
    this.pos[type + 'Index'] = Math.abs(idx)
    this.localEl(el, idx)
  }

  /**
   * @description 定位元素显示位置
   * @param {Element} el
   * @param {Number} idx
   * @param {Boolean} isClick
   */
  localEl (el, idx, isClick) {
    const type = el.dataset.type
    let ty = idx * this.containerH
    if (!isClick) {
      if (idx >= 0) {
        idx = 0
        ty = 0
      }
      if (idx <= -this.pos[type + 'Num'] - 1) {
        idx = -this.pos[type + 'Num']
        ty = idx * this.containerH
      }
    }
    this.pos[type + 'Index'] = Math.abs(idx)
    el.style.transform = `translateY(${ty}px)`
    this.removeClass(el, 'li', this.cur)
    this.addClass(el, 'li', this.pos[type + 'Index'], this.cur)
  }

  /**
   * @description 判断是否是点击事件
   * @param {Event} event
   */
  moveend (event) {
    const el = event.target.parentElement
    const type = el.dataset.type
    const idx = +this.pos[type + 'Index']
    this.pos[type + 'EndT'] = idx * this.containerH
    if (Date.now() - this.pos[type + 'StartTime'] <= 200) {
      this.localEl(el, -idx, true)
    }
    if (idx) {
      this.changeData(+el.dataset.level)
    } else {
      this.clearOther(Number(el.dataset.level))
    }
  }

  /**
   * @description 从获得的transfrom中获取位移高度
   * @param {String} str
   */
  extractTop (str) {
    return Number(str.substring(str.indexOf('(') + 1, str.lastIndexOf('p')))
  }

  /**
   * @description 给指定容器绑定事件
   * @param {Element} box
   */
  bindEvents (box) {
    this.events.forEach(item => {
      box.addEventListener('touch' + item, event => {
        event = event || window.event
        this['move' + item](event)
      })
    })
  }

  /**
   * @description 清除指定容器下指定元素的指定类名
   * @param {Element} container
   * @param {String} el
   * @param {String} cn
   */
  removeClass (container, el, cn) {
    [...container.children].forEach(item => {
      item.classList.remove(cn)
    })
  }

  /**
   * @description  给指定容器下指定标签添加指定类名
   * @param {Element} container
   * @param {String} el
   * @param {Number} idx
   * @param {String} cn
   */
  addClass (container, el, idx, cn) {
    container.querySelectorAll(el)[idx].classList.add(cn)
  }

  changeData (level) {
    switch (level) {
      case 0:
        this.reloadProvince()
        break
      case 1:
        this.reloadCity()
        break
    }
  }

  reloadProvince () {
    this.citysEl.style.transform = 'translateY(0px)'
    const key1 = this.provincesEl.querySelector('.' + this.cur).innerText.trim()
    const data = this.getData(this.data, key1)
    this.initView(this.citysEl, data, 0)
    this.clearOther(1)
  }

  reloadCity () {
    this.areasEl.style.transform = 'translateY(0px)'
    const key1 = this.provincesEl.querySelector('.' + this.cur).innerText.trim()
    const key2 = this.citysEl.querySelector('.' + this.cur).innerText.trim()
    const data = this.getData(this.data, key1, key2)
    this.initView(this.areasEl, data, 0)
  }

  clearOther (level) {
    if (level === 0) {
      this.citysEl.innerHTML = ''
      this.areasEl.innerHTML = ''
    } else if (level === 1) {
      this.areasEl.innerHTML = ''
    }
  }
}
