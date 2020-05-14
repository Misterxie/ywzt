<template>
    <div style="width:100%;height:100%;" id="user_flow"></div>
</template>

<script>
import echarts from 'echarts';
import Util from '@/libs/util.js';
export default {
    name: 'userFlow',
    data () {
        return {
            inData: [],
            outData: []
        }
    },
    methods: {
        drawFlowEchart() {
            this.$nextTick(() => {
                //获取echart数据
                var userFlow = echarts.init(document.getElementById('user_flow'));
                const option = {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [
                        {
                            name: '入流量',
                            type: 'gauge',
                            // color: ['#ff7200'],
                            min: 0,
                            max: 100,
                            detail: {
                                formatter: '{value}Mb+',
                                fontSize: 14,
                                offsetCenter: [0, '50px']
                            },
                            // data: [{value: 50, name: '当前入流量'}],
                            data: this.inData,
                            center: ['25%', '50%'],
                            radius: '80%',
                            title: {
                                offsetCenter: [0, '80px']
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 10,
                                    shadowBlur: 0,
                                    color: [
                                        [0.3, '#11bbff'],
                                        [0.7, '#544be2'],
                                        [1, '#fe510c']
                                    ]
                                }
                            },
                            splitLine: {
                                length: 10
                            }
                        },
                        {
                            name: '出流量',
                            type: 'gauge',
                            min: 0,
                            max: 100,
                            detail: {
                                formatter: '{value}Mb+',
                                fontSize: 14,
                                offsetCenter: [0, '50px']
                            },
                            // data: [{value: 50, name: '当前出流量'}],
                            data: this.outData,
                            center: ['75%', '50%'],
                            radius: '80%',
                            title: {
                                offsetCenter: [0, '80px']
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 10,
                                    shadowBlur: 0,
                                    color: [
                                        [0.3, '#11bbff'],
                                        [0.7, '#544be2'],
                                        [1, '#fe510c']
                                    ]
                                }
                            },
                            splitLine: {
                                length: 10
                            }
                        }
                    ]
                };


                userFlow.setOption(option);
                window.addEventListener('resize', function () {
                    userFlow.resize();
                });
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
