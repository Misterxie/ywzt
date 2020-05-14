import './gdmap.css'
import PointText from './gdmap/PointText.js'
import MapList from './gdmap/MapList.js';
// import CustomPolyrect from '@/assets/js/gdmap/customPolyrect.js'
// import ClusterMarker from '@/assets/js/gdmap/ClustererMarker.js'
// import PolyrectList from '@/assets/js/gdmap/PolyrectList.js'
// import MaskPolyrect from '@/assets/js/gdmap/maskPolyrect3'
// import PolyrectText from './gdmap/PolyrectText'
// import MouseTool from '@/assets/js/gdmap/MouseTool.js'
// import app from '@/assets/js/utils'
// const DEFAULT_STYLE = 'amap://styles/grey'
export default class IMap {
    constructor(opt, readyFun) {
        this._init(opt, readyFun)
    }
    _init(opt, readyFun) {
        let self = this
        let minZoom = opt.minZoom || 1
        let maxZoom = opt.maxZoom || 25
        let viewMode = opt.viewMode || '2D'
        let pitch = opt.pitch || 0
        let mapMarkerList = opt.mapMarkerList || []
        // let control = opt.control == undefined ? true : opt.control
        let style = opt.style || 'amap://styles/7f8a61c989ad3fd766f0759185fd0634'
        this._style = style
        self.mapClick = opt.mapClick
        self.clickCallback = opt.click
        self.currentOpenVideoSrcIndex = null;
        self.marker = [];

        this.map = new AMap.Map(opt.id, {
            viewMode:viewMode,
            pitch:pitch,
            center: [opt.x || 120.558404, opt.y || 27.972177],
            zoom: opt.zoom || 15,
            zooms: [minZoom, maxZoom],
            keyboardEnable: false,
            mapStyle: style,
        })

        setTimeout(() => {
            //高德地图的完成事件不可控....
            typeof readyFun === 'function' && readyFun()
        }, 1);

        /*********  添加pitchControlBar start*********/
        if(opt.pitchControlBar){
            self.map.addControl(new AMap.ControlBar({
                showZoomBar:false,
                showControlButton:true,
                position:{
                    left:'-1rem',
                    top:'0.6rem'
                }
            }))
        }
        /*********  添加pitchControlBar end*********/

        /*********  添加搜索提示 start*********/
        var placeSearch = new AMap.PlaceSearch({
            map: self.map,
        });
        AMap.event.addListener( new AMap.Autocomplete({ input: opt.searchId }), "select", (e)=>{
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name,(status,result) => {
                console.log(status, result)
                self.map.setZoom(17)
            })
        });
        /********* 添加搜索提示 end*********/

        /**************  有高度的线**************/
        /********* 添加marker标图 start*********/
        if(mapMarkerList.length != 0){
            //有高度的线
            var object3Dlayer = new AMap.Object3DLayer({ zIndex: 200,opacity:1 });
            self.map.add(object3Dlayer);
            var lines = new AMap.Object3D.Line();
            var lineGeo = lines.geometry;
            var height = -470;

            console.log()
            //添加marker
            for(var i=0;i<mapMarkerList.length;i++){
                // var iconUrl = './image/map-pin-security.png';
                var iconUrl = mapMarkerList[i].iconUrl
                // var iconUrl=this.mapMarkerList[i].iconUrl;
                self.marker[i] = new AMap.Marker({
                    // icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    icon:iconUrl,
                    position: [mapMarkerList[i].pos.lng,mapMarkerList[i].pos.lat],
                    // height:500,//设置高度，向上为正
                    title: mapMarkerList[i].name,
                });
                self.map.add(self.marker[i]);
                /**************  marker 点击事件 start**************/
                //  AMap.event.addListener(sef.marker[i], 'click', function() {
                //     $.each(self.marker,(index,item)=>{
                //         if(this._amap_id === item._amap_id){
                //            self.currentOpenVideoSrcIndex = index;
                //            console.log(self.currentOpenVideoSrcIndex);
                //         }
                //     })
                // })
                /**************  marker 点击事件 end**************/

                /**************  有高度的线 start**************/
                var center = self.lnglatToG20([mapMarkerList[i].pos.lng,mapMarkerList[i].pos.lat]);

                //实现虚线
                var perLen = height/10;
                for(var k=0,m=1;k<10;){
                    lineGeo.vertices.push(center.x, center.y, k*perLen);
                    lineGeo.vertexColors.push(255,  255, 255, 1);
                    lineGeo.vertices.push(center.x, center.y, m*perLen);
                    lineGeo.vertexColors.push(255,  255, 255, 1);
                    k=m+1;
                    m=k+1;
                }
                // lineGeo.vertices.push(center.x, center.y, 0);
                // lineGeo.vertexColors.push(255,  255, 255, 1);
                // lineGeo.vertices.push(center.x, center.y, height);
                // lineGeo.vertexColors.push(255,  255, 255, 1);
                // object3Dlayer.add(lines);
                /**************  有高度的线 start **************/
            }
        }
        /********* 添加marker标图 end*********/

        self.map.on('click', event => {
            let point = event.lnglat
            console.log('map', point.getLng(), point.getLat())
            window.localStorage.setItem('map_point', point.getLng() + ',' + point.getLat())
            // console.log('map', event)
            let pixel = event.pixel
            let obj = self.map.getObject3DByContainerPos(pixel)
            // console.log(obj)
            if (obj) {
                let data = obj.object._data
                data && typeof data.click === 'function' && data.click(data, obj)
            } else {
                typeof self.mapClick === 'function' && self.mapClick(event)
            }
        })

    }

    on(eventName, handle, context) {
        return this.map.on(eventName, handle, context)
    }

    off(eventName, handle, context) {
        return this.map.off(eventName, handle, context)
    }

    //获取高德地图实例对象
    getMap() {
        return this.map
    }
    lnglatToG20(lnglat){
        lnglat = this.map.lngLatToGeodeticCoord(lnglat);
        lnglat.x = AMap.Util.format(lnglat.x, 3);
        lnglat.y = AMap.Util.format(lnglat.y, 3);
        return lnglat;
    }

    // 获取经纬度在地图容器上所在像素
    getLngLatToContainer(longitude, latitude) {
        let pixel
        if (latitude) {
            pixel = this.map.lngLatToContainer([longitude, latitude])
        } else {
            pixel = this.map.lngLatToContainer(longitude)
        }
        return {
            y: pixel.getY(),
            x: pixel.getX()
        }
    }

    createPointText(opt) {
        return new PointText(this.map, opt)
    }

    createMapList(opt) {
        return new MapList(this.map, opt)
    }

    // createPolyrect(opt) {
    //   return new CustomPolyrect(this.map, opt)
    // }

    // createPolyrectList(opt) {
    //   return new PolyrectList(this.map, opt)
    // }

    // createClusterMarker(opt) {
    //   return new ClusterMarker(this.map, opt)
    // }

    // //创建行政区域.
    // createMaskPolyrect(opt) {
    //   let maskPolyrect = new MaskPolyrect(this.map, opt)
    //   return maskPolyrect
    // }

    // // 创建带文字的多边形
    // createPolyrectText(opt) {
    //   let polygonText = new PolyrectText(this.map, opt);
    //   return polygonText;
    // }

    // // 创建鼠标工具
    // createMouseTool(opt) {
    //   let mouseTool = new MouseTool(this.map, opt)
    //   return mouseTool
    // }

    //设置地图可视区域
    setBound(minPoint, maxPoint) {
        if (minPoint.constructor === AMap.Bounds) {
            this.map.setBounds(minPoint)
        } else {
            let bound = new AMap.Bounds(minPoint, maxPoint)
            this.map.setBounds(bound)
        }
    }
    //设置地图中心点
    setCenter(centerPoint, zoom = null) {
        if (zoom == null) {
            this.map.setCenter(centerPoint)
        } else if (centerPoint == null) {
            this.map.setZoom(zoom)
        } else {
            this.map.setZoomAndCenter(zoom, centerPoint)
        }
    }
    //创建热力图
    createHeatMap() {
        var heatmapOpts = {
            //3d 相关的参数
            '3d': {
                //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
                heightBezier: [0.4, 0.2, 0.4, 0.8],
                //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
                gridSize: 2,
                heightScale: 1
            }
        }
        let heatMap = new AMap.Heatmap(this.map, heatmapOpts)
        return heatMap
    }

    createCircle(opt = {}) {
        let circle = new AMap.Circle({
            map: this.map,
            center: opt.center || [opt.x, opt.y],
            radius: opt.radius || 500,
            fillColor: opt.fillColor || '#006600',
            fillOpacity: opt.fillOpacity || 0.9,
            extData: opt.data
        })
        return circle
    }

    destroy() {
        this.map.destroy()
    }

    cp(x, y) {
        return new AMap.LngLat(x, y)
    }

    createPolygon(path = [], strokeColor = 'red', fillColor = null) {
        let polygon = new AMap.Polygon({
            path: path,
            strokeColor: strokeColor,
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: fillColor == null ? 'green' : fillColor,
            fillOpacity: fillColor == null ? 0 : 1,
            bubble: true
        })
        return polygon
    }

    addOverlay(overlay) {
        this.map.add(overlay)
    }

    //增加可缩放的2d图形
    addElasticMarker(longitude, latitude, url, name, data, callback) {
        let marker = new AMap.ElasticMarker({
            position: [longitude, latitude],
            zooms: [14.5, 20],
            styles: [{
                icon: {
                    img: url,
                    size: [64, 128],
                    ancher: [32, 128],
                    fitZoom: 17.5,
                    scaleFactor: 2,
                    maxScale: 2,
                    minScale: 0.125
                },
                label: {
                    content: name,
                    offset: [-32, -30],
                    position: 'TM',
                    minZoom: 16
                }
            }],
            zoomStyleMapping: {
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0
            },
            map: this.map,
            extData: data
        })

        marker.on('click', this.__clickHandle);

        typeof callback === 'function' && callback(marker)
    }

    __clickHandle(event) {
        let point = event.target;
        let data = point.getExtData();
        if (data) {
            typeof data.click === 'function' && data.click(data, event)
        }
    }

    createPoint2D(x, y, url) {
        var icon = this.createIcon(url)
        var marker = new AMap.Marker({
            position: new AMap.LngLat(x, y),
            icon: icon,
            offset: new AMap.Pixel(-24, -48)
        })
        return marker
    }
    createIcon(url) {
        let icon = new AMap.Icon({
            size: new AMap.Size(48, 48),
            // imageOffset: new AMap.Pixel(24, -48),
            image: url,
            imageSize: new AMap.Size(48, 48)
        })
        return icon
    }
}