<template>
    <div style="width:100%;height:100%;overflow: hidden" id="radarBox">
        <div class="radar" id="radar"></div>
    </div>
</template>

<script>
import Radar from './js/radarSetting.js';
import $ from 'jquery';
export default {
    name: "radar",
    data (){
      return {
          pointList:[
              {
                  type: 'type1',
                  severity: 'critical', //ordinary,critical,pulsation
                  coords: [116.407395, 39.904211], // 北京
                  city: '北京',
                  title: '大额预授权交易异常',
                  total: 3
              }, {
                  type: 'type1',
                  severity: 'critical',
                  coords: [104.066801, 30.572816], // 成都
                  city: '成都',
                  title: '大额预授权交易异常',
                  total: 3
              }, {
                  type: 'type1',
                  severity: 'pulsation',
                  coords: [121.473701, 31.230416], // 上海
                  city: '上海',
                  title: '大额预授权交易异常',
                  total: 3
              }, {
                  type: 'type2',
                  severity: 'critical',
                  coords: [113.264385, 23.12911], // 广州
                  city: '广州',
                  title: '大额预授权交易异常',
                  total: 3
              },{
                  type: 'type2',
                  severity: 'ordinary',
                  coords: [111.264385, 23.13911], // xin
                  city: '新的',
                  title: '大额预授权交易异常',
                  total: 4
              }
          ]
      }
    },
    mounted() {
        // var radar = new Radar(document.querySelector('.radar'));
        var radar = new Radar(document.getElementById('radar'));
        radar.init({scanSpeed: 2});  // 扫描的速度，单位为deg，必须为360的约数
        radar.addRiskPoints(this.pointList);
        // document.getElementById('radar').style.height = document.getElementById('radar').style.width;
        $("#radar").height($("#radar").width())
        //判断宽高中得最小
        if( $("#radarBox").height() <  $("#radarBox").width()){
            $("#radar").width($("#radarBox").height() - 10);
            $("#radar").height($("#radarBox").height() - 10);
        }else{
            $("#radar").height($("#radarBox").width() - 10);
            $("#radar").width($("#radarBox").width() - 10);
        }
        // window.addEventListener('resize',()=>{
        //     radar.init({scanSpeed: 2});  // 扫描的速度，单位为deg，必须为360的约数
        //     radar.addRiskPoints(this.pointList);
        // })

    }
}
</script>

<style scoped>
    @import './js/radar.css'

</style>