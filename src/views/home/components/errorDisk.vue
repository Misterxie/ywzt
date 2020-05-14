<template>
    <div style="width:100%;height:100%;" id="error-disk"></div>
</template>

<script>
import echarts from 'echarts';
import Util from '@/libs/util.js';
export default {
    name: 'errorDisk',
    data () {
        return {
            xAxis: [],
            errorDiskData: []
        }
    },
    methods: {
        drawErrorDiskEchart(){
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('error-disk'));
                const option = {
                    title: {},
                    tooltip: {},
                    color: ['#087ed6'],
                    toolbox: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            // data: ['01','02', '03', '04', '05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
                            data: this.xAxis,
                            axisLine:{
                                lineStyle:{
                                    color:'#cccccc',
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:'#000'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'#cccccc',
                                    width:'1'
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:'#000'
                                }
                            },
                            splitLine: {
                                // show: false,
                                lineStyle: {
                                    color: '#f3f4fa'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '坏盘数',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: "#d60903",  //折线小圆点颜色
                                    borderColor:"#fff",
                                    borderWidth: 2 ,
                                    lineStyle: {
                                        color: "#584ae1"  //折线颜色
                                    }
                                }
                            },
                            smooth: true,
                            symbol: "circle",//取消小圆点circle
                            symbolSize:8,
                            // data: [0,0,0,0,24,5,30,25,24,5,2,14,45,34,23,35,45,15,45,28,36,42,24,41,16,34,27,48,51,24]
                            data: this.errorDiskData
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        }
    },
    mounted () {
        Util.ajaxMethod('GET', '/api/center/getBadDiskInfo').then((res) => {
            this.xAxis = res.xData;
            this.errorDiskData = res.yData;
            this.drawErrorDiskEchart();
        })

    }
};
</script>

<style scoped>

</style>