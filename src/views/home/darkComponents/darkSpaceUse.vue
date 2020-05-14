<template>
    <div style="width:100%;height:100%;" id="dark-space-use"></div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '@/libs/util.js';
    export default {
        name: 'darkSpaceUse',
        data () {
            return {
                xAxis: [],
                usedData: [],
                noUsedData: [],
                timeInterval0: {}
            }
        },
        methods: {
            drawSpaceEchart(){
                this.$nextTick(() => {
                    var dataSourcePie = echarts.init(document.getElementById('dark-space-use'));
                    const option = {
                        color: ['#322e68'],
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
                                        color:'#525179',
                                        width:'1'
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
                                name: '已使用',
                                type: 'bar',
                                barWidth: 18,
                                stack: 'two',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#5e4ce9'
                                        },
                                            // {
                                            //     offset: 0.8,
                                            //     color: '#589ded'
                                            // },
                                            {
                                                offset: 1,
                                                color: '#52a5ff'
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
                                barWidth: 18,
                                stack: 'two',
                                itemStyle: {
                                    color: '#322e68'
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

                    if(dataSourcePie){
                        this.timeInterval0 = setInterval(()=>{
                              dataSourcePie.resize();
                        },1000);
                    }else{
                        clearInterval(this.timeInterval0);
                    }
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