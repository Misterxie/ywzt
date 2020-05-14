<template>
    <div style="width:100%;height:100%;" id="dark-error-disk"></div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '@/libs/util.js';
    export default {
        name: 'darkErrorDisk',
        data () {
            return {
                xAxis: [],
                errorDiskData: [],
                timeInterval1: {}
            }
        },
        methods: {
            drawErrorDiskEchart(){
                this.$nextTick(() => {
                    var dataSourcePie = echarts.init(document.getElementById('dark-error-disk'));
                    // const option = {
                    //     title: {},
                    //     tooltip: {},
                    //     color: ['#087ed6'],
                    //     toolbox: {},
                    //     grid: {
                    //         left: '3%',
                    //         right: '4%',
                    //         top: '10%',
                    //         bottom: '3%',
                    //         containLabel: true
                    //     },
                    //     xAxis: [
                    //         {
                    //             type: 'category',
                    //             boundaryGap: true,
                    //             // data: ['01','02', '03', '04', '05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
                    //             data: this.xAxis,
                    //             axisLine:{
                    //                 lineStyle:{
                    //                     color:'#6d7cad',
                    //                 }
                    //             },
                    //             axisLabel:{
                    //                 textStyle:{
                    //                     color:'#6d7cad'
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     yAxis: [
                    //         {
                    //             type: 'value',
                    //             axisLine:{
                    //                 lineStyle:{
                    //                     color:'#6d7cad',
                    //                     width:'1'
                    //                 }
                    //             },
                    //             axisLabel:{
                    //                 textStyle:{
                    //                     color:'#6d7cad'
                    //                 }
                    //             },
                    //             splitLine: {
                    //                 // show: false,  //是否显示分隔线
                    //                 lineStyle: {
                    //                     type:'dotted',
                    //                     color: '#3b3a59'
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     series: [
                    //         {
                    //             name: '坏盘数',
                    //             type: 'line',
                    //             // itemStyle: {
                    //             //     normal: {
                    //             //         color: "#292841",  //折线小圆点颜色
                    //             //         borderColor:"#7180f6",
                    //             //         borderWidth: 2 ,
                    //             //         lineStyle: {
                    //             //             color: "#7180f6",  //折线颜色
                    //             //             width: 2.5
                    //             //         }
                    //             //     }
                    //             // },
                    //             itemStyle: {
                    //                 normal: {
                    //                     color: "#5e4ce9",  //折线小圆点颜色
                    //                     borderColor:"rgba(14,76,233,0.4)",
                    //                     borderWidth: 0,
                    //                     lineStyle: {
                    //                         // color: "#2a5ce9"  //折线颜色
                    //                         width: 3,
                    //                         color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    //                             {
                    //                                 offset: 0,
                    //                                 color: '#5e4ce9'
                    //                                 // color: 'rgba(16, 169, 239, 1)'
                    //                             },
                    //                             {
                    //                                 offset: 1,
                    //                                 color: '#56aaff'
                    //                                 // color: 'rgba(117, 123, 235, 1)'
                    //                             }
                    //                         ])
                    //
                    //                     }
                    //                 }
                    //             },
                    //             smooth: true,
                    //             symbol: "circle",//取消小圆点circle
                    //             symbolSize: 6,
                    //             // data: [0,0,0,0,24,5,30,25,24,5,2,14,45,34,23,35,45,15,45,28,36,42,24,41,16,34,27,48,51,24]
                    //             data: this.errorDiskData
                    //         }
                    //     ]
                    // };
                    const option = {
                        // backgroundColor:'#292841',
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
                                //data: ['01','02', '03', '04', '05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
                                data: this.xAxis,
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
                                axisLine:{
                                    lineStyle:{
                                        color:'#525179',
                                        width:'1'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#525179'
                                    }
                                },
                                splitLine: {
                                    // show: false,  //是否显示分隔线
                                    lineStyle: {
                                        type:'dotted',
                                        color: '#3b3a59'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '坏盘数',
                                type: 'line',
                                // itemStyle: {
                                //     normal: {
                                //         color: "#292841",  //折线小圆点颜色
                                //         borderColor:"#7180f6",
                                //         borderWidth: 2 ,
                                //         lineStyle: {
                                //             color: "#7180f6",  //折线颜色
                                //             width: 2.5
                                //         }
                                //     }
                                // },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                // color: '#10a9ef',
                                                color: 'rgba(89, 109, 241, 0.2)'
                                            },
                                            {
                                                offset: 0.8,
                                                // color: '#757beb',
                                                color: 'rgba(89, 109, 241, 0)'
                                            }
                                        ])
                                    }
                                },

                                itemStyle: {
                                    normal: {
                                        color: "rgba(228,109,62,0.8)",  //折线小圆点颜色
                                        borderColor:"rgba(249,123,73,0)",
                                        borderWidth: 3,
                                        lineStyle: {
                                            // color: "#2a5ce9"  //折线颜色
                                            width: 2,
                                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                                {
                                                    offset: 0,
                                                    color: '#4d6ff9'
                                                    // color: 'rgba(16, 169, 239, 1)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#4d6ff9'
                                                    // color: 'rgba(117, 123, 235, 1)'
                                                }
                                            ])

                                        }
                                    }
                                },
                                smooth: true,
                                symbol: "circle",//取消小圆点circle
                                symbolSize:4,
                                //data: [0,0,0,0,24,5,30,25,24,5,2,14,45,34,23,35,45,15,45,28,36,42,24,41,16,34,27,48,51,24]
                                data: this.errorDiskData
                            }

                        ]

                    };
                    dataSourcePie.setOption(option);
                    window.addEventListener('resize', function () {
                        dataSourcePie.resize();
                    });

                    if(dataSourcePie){
                        this.timeInterval1 = setInterval(()=>{
                            dataSourcePie.resize();
                        },1000);
                    }else{
                        clearInterval(this.timeInterval1);
                    }
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