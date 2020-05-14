<template>
    <div style="width:100%;height:100%;" id="dark-alarm-number"></div>
</template>

<script>

    import echarts from 'echarts';
    import Util from '@/libs/util.js';
    export default {
        name: 'darkAlarmNumber',
        data () {
            return {
                xAxis: [],
                alarmData: [],
                normalData: [],
                timeInterval2: {}
            }
        },
        methods: {
            drawAlarmEchart() {
                this.$nextTick(() => {
                    //获取echart数据
                    var dataSourcePie = echarts.init(document.getElementById('dark-alarm-number'));
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
                                        color: '#525179'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#525179'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: {
                                    // show: false, //是否显示分隔线
                                    lineStyle: {
                                        type:'dotted',
                                        color: '#3b3a59'
                                    }
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#292841',
                                        width:'0'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#525179'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '正常',
                                type: 'bar',
                                barWidth: 10,
                                // stack: 'two',//
                                itemStyle: {
                                    normal: {
                                        // color: '#5971eb'
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#3684f0'
                                        },
                                        {
                                            offset: 1,
                                            color: '#435de5'
                                        }
                                        ])
                                    }
                                },
                                // data: [50, 100, 110, 95, 120, 70, 60]
                                data: this.normalData
                            },
                            {
                                name: '告警',
                                type: 'bar',
                                barWidth: 10,
                                // stack: 'two', //two
                                itemStyle: {
                                    normal: {
                                        // color: '#5971eb'
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#f69e11'
                                        },
                                        {
                                            offset: 1,
                                            color: '#de4618'
                                        }
                                        ])
                                    }
                                },
                                // data: [200, 150, 140, 155, 130, 180, 190]
                                data: this.alarmData
                            }

                        ]
                    };
                    dataSourcePie.setOption(option);
                    window.addEventListener('resize', function () {
                        dataSourcePie.resize();
                    });

                    if(dataSourcePie){
                        this.timeInterval2 = setInterval(()=>{
                            dataSourcePie.resize();
                        },1000);
                    }else{
                        clearInterval(this.timeInterval2);
                    }
                });
            }

        },
        mounted () {
            Util.ajaxMethod('GET', '/api/center/getAlarmInfo').then((res) => {
                this.xAxis = res.xData;
                this.alarmData = res.y1Data;
                this.normalData = res.yData;
                this.drawAlarmEchart();
            })

        }
    };
</script>

<style scoped>

</style>