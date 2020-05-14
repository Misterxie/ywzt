<template>
    <div style="width:100%;height:100%;" id="space-use"></div>
</template>

<script>
import echarts from 'echarts';
import Util from '@/libs/util.js';
export default {
    name: 'spaceUse',
    data () {
        return {
            xAxis: [],
            usedData: [],
            noUsedData: []
        }
    },
    methods: {
        drawSpaceEchart(){
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('space-use'));
                // const option = {
                //     tooltip: {
                //         trigger: 'item',
                //         formatter: '{a} <br/>{b} : {c} ({d}%)'
                //     },
                //     legend: {
                //         orient: 'vertical',
                //         left: 'right',
                //         data: ['ios', 'android', 'pc', 'web', 'others']
                //     },
                //     series: [
                //         {
                //             name: '访问来源',
                //             type: 'pie',
                //             radius: '66%',
                //             center: ['50%', '60%'],
                //             data: [
                //                 {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
                //                 {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
                //                 {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                //                 {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
                //                 {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                //             ],
                //             itemStyle: {
                //                 emphasis: {
                //                     shadowBlur: 10,
                //                     shadowOffsetX: 0,
                //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //                 }
                //             }
                //         }
                //     ]
                // };
                const option = {
                    color: ['#eaebf6', '#008aff'],
                    tooltip: {
                        // trigger: 'axis',
                        // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        //     type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
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
                            // data: ['义乌域', '永康域', '东阳域', '婺城域', '浦江域', '仙居域', '武义域'],
                            data: this.xAxis,
                            axisTick: {
                                alignWithLabel: false
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#cccccc',
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
                            name: '已使用',
                            type: 'bar',
                            barWidth: 15,
                            stack: 'two',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#757beb'
                                    },
                                        // {
                                        //     offset: 0.8,
                                        //     color: '#589ded'
                                        // },
                                        {
                                            offset: 1,
                                            color: '#10a9ef'
                                        }
                                    ])
                                }
                            },
                            // data: [50, 100, 110, 95, 120, 70, 60]
                            data: this.usedData
                        },
                        {
                            name: '未使用',
                            type: 'bar',
                            barWidth: 15,
                            stack: 'two',
                            itemStyle: {
                                color: '#eaebf6'
                            },
                            // data: [200, 150, 140, 155, 130, 180, 190]
                            data: this.noUsedData
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
        Util.ajaxMethod('GET', '/api/center/getAreaOfStorageUsed').then((res) => {
            this.xAxis = res.xData;
            this.usedData = res.yData;
            this.noUsedData = res.y1Data;
            this.drawSpaceEchart();
        })

    }
};
</script>

<style scoped>

</style>