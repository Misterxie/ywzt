<template>
    <!--<div style="width:100%;height:100%" id="echartsCon">-->
        <div style="width:100%;height:100%;" id="black-seven-memory-space"></div>
    <!--</div>-->

</template>

<script>
    import echarts from 'echarts';
    import Util from '@/libs/util.js';
    import $ from 'jquery'
    export default {
        name: 'darkSevenMemorySpace',
        data () {
            return {
                xAxis: [],
                memorySpaceData: [],
                dataSourcePie: {},
                timeInterval:{},
            }
        },
        methods: {
            drawMemorySpaceEchart() {
                this.$nextTick(() => {
                    this.dataSourcePie = echarts.init(document.getElementById('black-seven-memory-space'));
                    const option =  {
                        // backgroundColor:'#292841',
                        title: {},
                        tooltip: {},
                        // color: ['#087ed6'],
                        toolbox: {},
                        grid: {
                            left: '1%',
                            right: '1%',
                            top: '10%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                //data: ['01', '02', '03', '04', '05', '06', '07'],
                                data : this.xAxis,
                                axisLine:{
                                    lineStyle:{
                                        color:'#525179',
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#525179'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                // show:false,
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
                                },
                                splitLine: {
                                    // show: false,
                                    lineStyle: {
                                        type:'dotted',
                                        color: '#3b3a59'
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
                                        color: "#fff",  //折线小圆点颜色
                                        borderColor:"rgba(14,76,233,0.4)",
                                        borderWidth: 9,
                                        lineStyle: {
                                            // color: "#2a5ce9"  //折线颜色
                                            width: 3,
                                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                                {
                                                    offset: 0,
                                                    color: '#4b67f9'
                                                    // color: 'rgba(16, 169, 239, 1)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#5598f9'
                                                    // color: 'rgba(117, 123, 235, 1)'
                                                }
                                            ])

                                        }
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                            {
                                                offset: 0,
                                                // color: '#10a9ef',
                                                color: 'rgba(75, 103, 249, 0.2)'
                                            },
                                            {
                                                offset: 1,
                                                // color: '#757beb',
                                                color: 'rgba(85, 152, 249, 0.2)'
                                            }
                                        ])
                                    }
                                },
                                smooth: true,
                                symbol: "circle",//取消小圆点circle
                                symbolSize: 8,
                                //data: [8,10,15,50,24,5,30]
                                data: this.memorySpaceData
                            }
                        ]
                    };
                    this.dataSourcePie.setOption(option);
                    window.addEventListener('resize', () => {
                        this.dataSourcePie.resize();
                    });

                    if(this.dataSourcePie){
                        this.timeInterval = setInterval(()=>{
                            this.dataSourcePie.resize();
                        },1000);
                    }else{
                        clearInterval(this.timeInterval);
                    }

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

    }
</script>

<style scoped>

</style>