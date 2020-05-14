<template>
    <div style="width:calc(100% - 10px);height:397px;" id="gdMap" ref="gdMap"></div>
</template>

<script>
    import IMap from './js/gdmap.js'
    import $ from 'jquery'
export default {
    name: "gdMap",
    data () {
        return {
            //高德地图坐标
            map:'',
            mapMarkerList:[
                // {name:'里沙海域',pos:{lng:'122.392307',lat:'29.981185'},iconUrl:'src/views/home/components/image/map-pin-security.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002265-01&PlayMethod=0&StreamingType=1'},
                // {name:'峭壁公园',pos:{lng:'122.391252 ',lat:'29.981595'},iconUrl:'src/views/home/components/image/pin-camera1.png',src:'  rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002298-01&PlayMethod=0&StreamingType=1'},
                // {name:'千步沙观景台',pos:{lng:'122.390527 ',lat:'29.983545'},iconUrl:'src/views/home/components/image/pin-camera2.png',src:' rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002249-01&PlayMethod=0&StreamingType=1'},
                // {name:'环岛龙头坑',pos:{lng:'122.389229',lat:' 29.984127'},iconUrl:'src/views/home/components/image/map-pin-security.png',src:' rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100004753-01&PlayMethod=0&StreamingType=1'},
                // {name:'姆岭岗',pos:{lng:'122.389365',lat:'29.98208'},iconUrl:'src/views/home/components/image/pin-camera2.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002248-01&PlayMethod=0&StreamingType=1'},
                // {name:'青山湖公交站',pos:{lng:'122.390492 ',lat:'29.980715'},iconUrl:'src/views/home/components/image/map-pin-security.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002267-01&PlayMethod=0&StreamingType=1'},
                // {name:'里沙上停车场',pos:{lng:'122.390721',lat:'29.979715'},iconUrl:'src/views/home/components/image/pin-camera1.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002273-01&PlayMethod=0&StreamingType=1'},
                // {name:'里沙摊位',pos:{lng:'122.38999',lat:'29.979774'},iconUrl:'src/views/home/components/image/pin-camera2.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002275-01&PlayMethod=0&StreamingType=1'},
                // {name:'青沙休息区',pos:{lng:'122.391622',lat:'29.979225'},iconUrl:'src/views/home/components/image/pin-camera1.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002283-01&PlayMethod=0&StreamingType=1'},
                // {name:'牛头山凉亭',pos:{lng:'122.393233',lat:'29.980117'},iconUrl:'src/views/home/components/image/map_pin_security.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002286-01&PlayMethod=0&StreamingType=1'},
                // {name:'人脸抓拍',pos:{lng:'119.657122',lat:'29.108837'},iconUrl:'./image/close_alarm.png',src:'rtmp://122.224.82.76:1935/service/PuId-ChannelNo=180000000100000108-01&PlayMethod=0&StreamingType=1&FCode=9'},
                //打包
                // {name:'里沙海域',pos:{lng:'119.657122',lat:'29.108836'},iconUrl:'./dist/image/pos1.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002265-01&PlayMethod=0&StreamingType=1'},
                // {name:'里沙海域',pos:{lng:'119.392443',lat:'29.207329'},iconUrl:'./dist/image/pos2.png',src:'rtmp://115.231.122.2:1935/service/PuId-ChannelNo=122718000100002265-01&PlayMethod=0&StreamingType=1'},
                {name:'人脸抓拍',pos:{lng:'119.657122',lat:'29.108837'},iconUrl:'src/views/home/components/image/big_alarm.png',src:'rtmp://122.224.82.76:1935/service/PuId-ChannelNo=180000000100000108-01&PlayMethod=0&StreamingType=1&FCode=9'},

            ],
            videoSrcList:[
                // {src:'rtmp://183.129.146.195:1935/service/PuId-ChannelNo=121010000100005684-01&PlayMethod=0&StreamingType=1'},
                // {src:'rtmp://183.129.146.195:1935/service/PuId-ChannelNo=121010000100007870-01&PlayMethod=0&StreamingType=1'},
                // {src:'rtmp://183.129.146.195:1935/service/PuId-ChannelNo=121010000100006622-01&PlayMethod=0&StreamingType=1'},
                // {src:'rtmp://183.129.146.195:1935/service/PuId-ChannelNo=121010000100007194-01&PlayMethod=0&StreamingType=1'},
                // {src:'rtmp://183.129.146.195:1935/service/PuId-ChannelNo=126000000100000171-01&PlayMethod=0&StreamingType=1'},

            ],
            currentOpenVideoSrcIndexSrc:'', //点击的marker的index
            marker:[],
        }
    },
    methods:{
        //map init
        initMap(){
            this.$nextTick(() => {
                // x: 120.158045,
                // y: 30.277953,
                this.map = new IMap(
                    {
                        id: this.$refs.gdMap,
                        viewMode:'3D',
                        pitch:60,
                        x: 119.657122,
                        y: 29.108837,
                        zoom: 12,
                        minZoom: 5,
                        maxZoom: 25,
                        // style:'amap://styles/38d97b9a5759e011a4985bbd2c9767da',
                        style: 'amap://styles/9f76fdc31e1d3b82918715d5c2fbc118',
                        // style:'amap://styles/700600810c2ee218a2cc45884c714bc6',
                        pitchControlBar:false,//是否显示3D调节角度工具
                        mapMarkerList:this.mapMarkerList,//添加marker到地图
                        videoSrcList:this.videoSrcList, //marker对应的视频地址
                    },
                );
                this.marker = this.map.marker;
                $.each(this.marker,(index,item)=>{
                    item.on('click',()=>{
                        this.currentOpenVideoSrcIndexSrc = this.mapMarkerList[index].src;
                        // console.log(this.currentOpenVideoSrcIndexSrc)
                    })
                })
            })
        }
    },
    mounted(){
        this.initMap();
    }

}
</script>

<style scoped>

</style>