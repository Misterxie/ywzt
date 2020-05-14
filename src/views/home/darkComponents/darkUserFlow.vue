<template>
    <div style="width:100%;height:100%;" id="dark_user_flow"></div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '@/libs/util.js';
    import liquidFill from './echartsJs/liquidFill'
    export default {
        name: 'darkUserFlow',
        data () {
            return {
                inData: [],
                outData: [],
                timeInterval3: {}
            }
        },
        methods: {
            drawFlowEchart() {
                this.$nextTick(() => {
                    //获取echart数据
                    var userFlow = echarts.init(document.getElementById('dark_user_flow'));
                    const option = {
                        // backgroundColor: '#27263d',
                        title: [{
                            text: '流入',
                            left: '18%',
                            top: '87%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                color: '#4a82fe',
                                fontSize: 18,
                                textAlign: 'center'
                            }
                        }, {
                            text: '25439',
                            left: '29%',
                            top: '87%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                color: '#4a82fe',
                                fontSize: 20,
                                textAlign: 'center',
                            }
                        }, {
                            text: '流出',
                            left: '63.5%',
                            top: '87%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                color: '#7c50f1',
                                fontSize: 18,
                                textAlign: 'center',
                            }
                        }, {
                            text: '9844',
                            left: '73.5%',
                            top: '87%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                color: '#7c50f1',
                                fontSize: 20,
                                textAlign: 'center',
                            }
                        }],
                        series: [
                            {
                                type: 'liquidFill',
                                // data: [0.6, 0.5, 0.4, 0.3],
                                data: [15439/(25439+9844)],
                                direction: 'right', //波浪方向或者静止
                                radius: '65%',
                                // 水球颜色
                                color: ['#4a82fe'],
                                center: ['25%', '40%'], //水球位置
                                // outline  外边
                                outline: {
                                    // show: false
                                    borderDistance: 4, //内环padding值
                                    itemStyle: {
                                        borderWidth: 1, //圆边线宽度
                                        borderColor: 'rgba(74,130,254,0.5)',
                                    },
                                },
                                label: {
                                    normal: {
                                        formatter: '', //重置百分比字体为空
                                        // textStyle: {
                                        color: 'red',
                                        insideColor: 'yellow',
                                        fontSize: 10
                                        // }
                                    }
                                },
                                // 内图 背景色 边
                                backgroundStyle: {
                                    color: 'rgba(4,24,74,0)',
                                    // borderWidth: 5,
                                    // borderColor: 'red',
                                }
                            },
                            {
                                type: 'liquidFill',
                                data: [9844/(25439+9844)],
                                direction: 'right', //波浪方向或者静止
                                radius: '65%',
                                // 水球颜色
                                color: ['#7c50f1'],
                                center: ['70%', '40%'], //水球位置
                                // outline  外边
                                outline: {
                                    // show: false
                                    borderDistance: 4, //内环padding值
                                    itemStyle: {
                                        borderWidth: 1, //圆边线宽度
                                        borderColor: 'rgba(121,86,239,0.5)',
                                    },
                                },
                                label: {
                                    normal: {
                                        formatter: '', //重置百分比字体为空
                                        // textStyle: {
                                        color: 'red',
                                        insideColor: 'yellow',
                                        fontSize: 10
                                        // }
                                    }
                                },
                                // 内图 背景色 边
                                backgroundStyle: {
                                    color: 'rgba(4,24,74,0)',
                                    // borderWidth: 5,
                                    // borderColor: 'red',
                                }
                            }
                        ]
                    };

                    userFlow.setOption(option);
                    window.addEventListener('resize', function () {
                        userFlow.resize();
                    });

                    if(userFlow){
                        this.timeInterval3 = setInterval(()=>{
                            userFlow.resize();
                        },1000);
                    }else{
                        clearInterval(this.timeInterval3);
                    }

                });
            }

        },
        mounted () {
            Util.ajaxMethod('GET', '/api/center/getRateInfo').then((res) => {
                this.inData = res.inData;
                this.outData = res.outData;
                this.drawFlowEchart();
            })
        }
    };
</script>
