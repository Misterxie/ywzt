<template>
    <div style="width:100%;height:100%;" id="seven-memory-space"></div>
</template>

<script>
import echarts from 'echarts';
import Util from '@/libs/util.js';
export default {
    name: 'sevenMemorySpace',
    data () {
        return {
            xAxis: [],
            memorySpaceData: []
        }
    },
    methods: {
        drawMemorySpaceEchart() {
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('seven-memory-space'));
                const option = {
                    title: {},
                    tooltip: {},
                    // color: ['#087ed6'],
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
                            boundaryGap: false,
                            // data: ['01', '02', '03', '04', '05', '06', '07'],
                            data : this.xAxis,
                            axisLine:{
                                lineStyle:{
                                    color:'#cccccc',
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:'#666666'
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
                                    color:'#666666'
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
                            name: '存储空间',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: "#17b7f3",  //折线小圆点颜色
                                    borderColor:"#fff",
                                    borderWidth: 2,
                                    lineStyle: {
                                        color: "#2a5ce9"  //折线颜色
                                        // color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                        //     {
                                        //         offset: 0,
                                        //         // color: '#10a9ef',
                                        //         color: 'rgba(16, 169, 239, 1)'
                                        //     },
                                        //     {
                                        //         offset: 1,
                                        //         // color: '#757beb',
                                        //         color: 'rgba(117, 123, 235, 1)'
                                        //     }
                                        // ])

                                    }
                                }
                            },
                            areaStyle: {
                                // normal: {
                                //     color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                //         {
                                //             offset: 0,
                                //             // color: '#10a9ef',
                                //             color: 'rgba(16, 169, 239, 0.3)'
                                //         },
                                //         {
                                //             offset: 1,
                                //             // color: '#757beb',
                                //             color: 'rgba(117, 123, 235, 0.3)'
                                //         }
                                //     ])
                                // }
                            },
                            smooth: true,
                            symbol: "circle",//取消小圆点circle
                            symbolSize: 8,
                            // data: [8,10,15,50,24,5,30]
                            data: this.memorySpaceData
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
        Util.ajaxMethod('GET', '/api/center/getRiseOfStorageUsed').then((res) => {
            this.xAxis = res.xData;
            this.memorySpaceData = res.yData;
            this.drawMemorySpaceEchart();
        })

    }
};
</script>

<style scoped>

</style>