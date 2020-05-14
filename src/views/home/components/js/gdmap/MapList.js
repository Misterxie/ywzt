
import './mapList.less';

/**
 * opt :
 *  width : 宽度
 *  height : 高度
 *  position : 放置位置
 *  click : 内容点击回调
 * 
 *  methods
 *  show : 显示
 *  hide : 隐藏
 *  setPosition 修改列表所在地图位置
 *  setData : 数据列表赋值
 */
export default class MapList {
  constructor(map, opt) {
    this._initialize(map, opt || {})
  }
  _initialize(map, opt) {
    this._map = map
    this._width = opt.width || 244;
    this._height = opt.height || 267
    this._show = false
    let position = opt.position || [120.096471, 30.222361]
    this._click = opt.click
    this._position = position
    this._dom = this._createElement();
    this._marker = this._createMarker(position[0], position[1], this._dom)
    this.setData()
  }

  setPosition(x, y) {
    // console.log(x, y)
    this._marker.setPosition([x, y])
  }

  setData(list) {
    this._dom.innerHTML = '';
    this._dataList = list
    if (list && list.length > 0) {
      list.forEach(item => {
        let div = document.createElement('div')
        div.className = 'custom-map-list-dom'
        div.innerText = item.name
        div.title = item.name
        div.style.color = item.color || '#bbd1e9'
        this._dom.appendChild(div)
        div.addEventListener('click', (e) => {
          this._onClick(item, e)
        })
      });
    } else {
      let div = document.createElement('div')
      div.className = 'custom-map-empty'
      div.innerText = '正在建设中'
      this._dom.appendChild(div)
    }

  }

  show() {
    if (!this._show) {
      this._marker.setMap(this._map)
      this._show = true
    }
  }

  hide() {
    if (this._show) {
      this._marker.setMap(null)
      this._show = false
    }
  }

  _onClick(data, event) {
    typeof this._click === 'function' && this._click(data, event)
  }

  _createMarker(x, y, dom) {
    let marker = new AMap.Marker({
      offset: new AMap.Pixel(0, 0),
      content: dom,
      position: [x, y]
    })
    return marker
  }

  _createElement() {
    let div = document.createElement('div')
    div.className = 'custom-map-list'
    div.style.width = this._width + 'px'
    div.style.height = this._height + 'px'
    return div
  }
}