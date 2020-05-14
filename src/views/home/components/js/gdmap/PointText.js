import './pointText.less'
// 修改的同时css也需要改
const MARKER_WIDTH = 0
const MARKER_HEIGHT = 100
const DEFAULT_IMAGE_SRC = 'static/images/default_point.png'

/**
 * opt :
 * image : 显示的图片路径
 * text : 显示的文字内容
 * textColor : 文字颜色
 * position : [x,y] 显示的坐标点位置
 * moveIn : 鼠标移入 function
 * moveOut : 鼠标移出 function
 * extData: 自定义对象
 * methods:
 * show : 显示
 * hide : 隐藏
 * showRipples : 显示涟漪效果
 * closeRipples : 隐藏涟漪效果
 * setNumber : 修改显示数字内容
 */
export default class PointText {
  constructor(map, opt) {
    this._onMouseEnter = this._onMouseEnter.bind(this)
    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._initialize(map, opt || {})
  }
  _initialize(map, opt) {
    this._map = map
    this._show_circle = false // 显示光圈
    this._show = false
    this._show_ripples = false
    // this._number = opt.number || 0 // 显示数值
    // this._numberColor = opt.numberColor || '#26ace1'
    this._image = opt.image || DEFAULT_IMAGE_SRC // 显示的图片
    this._text = opt.text || '文字'
    this._textColor = opt.textColor || '#0285ff'
    this._position = opt.position || [120, 30]
    this._extData = opt.extData

    this._moveIn = opt.moveIn
    this._moveOut = opt.moveOut
    this._click = opt.click
  }

  _setInMap() {
    if (!this._marker) {
      var obj = this._createMarker(
        this._position[0],
        this._position[1],
        this._text,
        // this._number,
        this._image
      )
      this._marker = obj.marker
      this._dom = obj.dom
    }
    this._marker.setMap(this._map)
  }
  _removeInMap() {
    if (this._marker) {
      this._marker.setMap(null)
    }
  }
  getExtData() {
    return this._extData
  }

  show() {
    if (!this._show) {
      this._setInMap()
      this._show = true
      if (this._show_ripples) {
        this.showRipples()
      }
    }
  }

  hide() {
    if (this._show) {
      // 隐藏的时候自动把涟漪效果去掉
      this.closeRipples()
      this._removeInMap()
      this._show = false;
    }
  }

  // 展示涟漪效果
  showRipples() {
    if (!this._show_ripples) {
      if (this._show && this._dom) {
        let dom = this._dom
        dom.smallCircle.style.display = 'block'
        dom.largeCircle.style.display = 'block'
      }
      this._show_ripples = true;
    }
  }

  closeRipples() {
    if (this._show_ripples) {
      if (this._show && this._dom) {
        let dom = this._dom
        dom.smallCircle.style.display = '';
        dom.largeCircle.style.display = '';
      }
      this._show_ripples = false
    }
  }

  // // 修改数字
  // setNumber(number) {
  //   this._number = number;
  //   if (this._dom) {
  //     this._dom.number.innerText = number
  //   }
  // }

  _onMouseEnter() {
    // console.log('鼠标移入')
    typeof this._moveIn === 'function' && this._moveIn(this._extData, this)
  }

  _onMouseLeave() {
    // console.log('鼠标移出')
    typeof this._moveOut === 'function' && this._moveOut(this._extData, this)
  }

  _createMarker(x, y, text, imgsrc) {
    let offsetWidth = -MARKER_WIDTH / 2
    let offsetHeight = -MARKER_HEIGHT / 2
    let dom = this._createElement(text, imgsrc)

    dom.div.addEventListener('mouseenter', this._onMouseEnter)

    dom.div.addEventListener('mouseleave', this._onMouseLeave)

    let marker = new AMap.Marker({
      position: [x, y],
      offset: new AMap.Pixel(offsetWidth, offsetHeight),
      // topWhenClick: true,

      content: dom.div,
      bubble: false

    })
    return {
      marker,
      dom
    }
  }

  _createElement(strText, imageSrc) {
    let div = document.createElement('div')
    div.className = 'custom-text-point'

    // 涟漪效果
    let smallCircle = document.createElement('div');
    smallCircle.className = 'map-point-small-circle'
    div.appendChild(smallCircle);

    let largeCircle = document.createElement('div');
    largeCircle.className = 'map-point-large-circle';
    div.appendChild(largeCircle)

    // // 内容
    // let number = document.createElement('span')
    // number.className = 'map-point-number-dom'
    // number.style.color = this._numberColor;
    // // number.style.borderColor = this._numberColor;
    // number.innerText = numberValue
    // div.appendChild(number)

    let text = document.createElement('span')
    text.className = 'map-point-text-dom'
    text.style.color = this._textColor
    text.innerText = strText
    div.appendChild(text)

    let img = document.createElement('img')
    img.className = 'map-point-img-dom'
    img.src = imageSrc
    div.appendChild(img)



    return {
      div,
      text,
      img,
      // number,
      smallCircle,
      largeCircle
    }
  }
}