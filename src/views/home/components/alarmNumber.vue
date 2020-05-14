<template>
    <div style="width:100%;height:100%;" id="alarm-number"></div>
</template>

<script>

import echarts from 'echarts';
import Util from '@/libs/util.js';
export default {
    name: 'alarmNumber',
    data () {
       return {
           xAxis: [],
           alarmData: [],
           normalData: []
       }
    },
    methods: {
        drawAlarmEchart() {
            this.$nextTick(() => {
                //获取echart数据
                var dataSourcePie = echarts.init(document.getElementById('alarm-number'));
                const option = {
                    color: ['#5b6efd', '#ffa13d'],
                    tooltip: {
                        // trigger: 'axis',
                        // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        //     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        // }
                    },
                    grid: {
                        top: '3%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            // data: ['01', '02', '03', '04', '05', '06', '07'],
                            data: this.xAxis,
                            axisTick: {
                                alignWithLabel: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#cccccc'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#000'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: {
                                // show: false,
                                lineStyle: {
                                    color: '#f3f4fa'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#f3f4fa',
                                    width:'0'
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:'#000'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '正常',
                            type: 'bar',
                            barWidth: 15,
                            stack: 'two',
                            // itemStyle: {
                            //     color: '#5971eb'
                            // },
                            // data: [200, 150, 140, 155, 130, 180, 190]
                            data: this.normalData
                        },
                        {
                            name: '告警',
                            type: 'bar',
                            barWidth: 15,
                            stack: 'two',
                            // itemStyle: {
                            //     color: '#e57c3d'
                            // },
                            // data: [50, 100, 110, 95, 120, 70, 60]
                            data: this.alarmData
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
        Util.ajaxMethod('GET', '/api/center/getAlarmInfo').then((res) => {
            this.xAxis = res.xData;
            this.alarmData = res.yData;
            this.normalData = res.y1Data;
            this.drawAlarmEchart();
        })

    }
};
</script>

<style scoped>

</style>