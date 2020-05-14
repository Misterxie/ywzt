<template>
    <div style="width:calc(100% - 10px);height:calc( 397px + 44px );" id="darkMap" ref="darkMap"></div>
</template>

<script>
    import echarts from 'echarts';
    import $ from 'jquery';
    import Util from '@/libs/util.js';
    import uploadedDataURL from './echartsJs/jinhua.json'

    export default {
        name: 'darkMap',
        data () {
            return {
                geoGpsMap: {
                    '1': [109.1162, 34.2004],
                    '2': [116.4551, 40.2539],
                    '3': [113.12244, 23.009505],
                    '4': [87.9236, 43.5883],
                    '5': [127.9688, 45.368],
                    '6': [91.11, 29.97]
                },
                geoCoordMap: {
                    '婺城区': [119.45, 29.00],
                    '金东区': [119.70, 29.08],
                    '武义县': [119.82, 28.90],
                    '浦江县': [119.88, 29.45],
                    '磐安县': [120.43, 29.05],
                    '兰溪市': [119.45, 29.22],
                    '义乌市': [120.07, 29.30],
                    '东阳市': [120.43, 29.28],
                    '永康市': [120.03, 28.90]
                },
                colors: [
                    ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'],
                    ['#37A2DA', '#67E0E3', '#32C5E9', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#FB7293', '#E062AE', '#E690D1', '#E7BCF3', '#9D96F5', '#8378EA', '#8378EA'],
                    ['#DD6B66', '#759AA0', '#E69D87', '#8DC1A9', '#EA7E53', '#EEDD78', '#73A373', '#73B9BC', '#7289AB', '#91CA8C', '#F49F42']
                ],
                colorIndex: 0,
                dataSourcePie: '',
                timeInterval4: {}
            }
        },
        methods: {
            drawMapEchart () {
                this.$nextTick(() => {
                    //获取echart数据
                    this.dataSourcePie = echarts.init(document.getElementById('darkMap'));
                    this.init();
                });
            },
            init () {
                var year = ["2014","2015", "2016", "2017", "2018"]; //"2015", "2016", "2017", "2018"
                var mapData = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];

                /*柱子Y名称*/
                var categoryData = [];
                var barData = [];
                for (var key in this.geoCoordMap) {
                    categoryData.push(key);
                    mapData[0].push({
                        "year": '2014',
                        "name": key,
                        "value": this.randomNum(100, 300)
                    });
                    mapData[1].push({
                        "year": '2015',
                        "name": key,
                        "value": this.randomNum(100, 300)
                    });
                    mapData[2].push({
                        "year": '2016',
                        "name": key,
                        "value": this.randomNum(100, 300)
                    });
                    mapData[3].push({
                        "year": '2017',
                        "name": key,
                        "value": this.randomNum(100, 300)
                    });
                    mapData[4].push({
                        "year": '2018',
                        "name": key,
                        "value": this.randomNum(100, 300)
                    });

                }
                for (var i = 0; i < mapData.length; i++) {
                    barData.push([]);
                    for (var j = 0; j < mapData[i].length; j++) {
                        barData[i].push(mapData[i][j].value)
                    }
                }


                var geoJson = uploadedDataURL;
                echarts.registerMap('china', geoJson);
                //点
                var convertData = (data) => {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = this.geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
                var convertToLineData = (data, gps) =>{
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = this.geoCoordMap[dataItem.name];
                        var toCoord = gps; //郑州
                        //  var toCoord = geoGps[Math.random()*3];
                        if (fromCoord && toCoord) {
                            res.push([{
                                coord: fromCoord,
                                value: dataItem.value
                            }, {
                                coord: toCoord
                            }]);
                        }
                    }
                    return res;
                };
                var optionXyMap01 = {
                    timeline: {
                        data: year,
                        show: false,
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 3000,
                        left: '10%',
                        right: '10%',
                        bottom: '3%',
                        width: '80%',
                        //  height: null,
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#ddd'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        symbolSize: 10,
                        lineStyle: {
                            show: false,
                            color: '#555'
                        },
                        checkpointStyle: {
                            borderColor: '#777',
                            borderWidth: 2
                        },
                        controlStyle: {
                            show: false,
                            showNextBtn: true,
                            showPrevBtn: true,
                            normal: {
                                color: '#666',
                                borderColor: '#666'
                            },
                            emphasis: {
                                color: '#aaa',
                                borderColor: '#aaa'
                            }
                        }
                    },
                    baseOption: {
                        animation: true,
                        animationDuration: 1000,
                        animationEasing: 'cubicInOut',
                        animationDurationUpdate: 1000,
                        animationEasingUpdate: 'cubicInOut',
                        grid: {
                            right: '1%',
                            top: '15%',
                            bottom: '10%',
                            width: '20%'
                        },
                        tooltip: {
                            trigger: 'axis', // hover触发器
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                                shadowStyle: {
                                    color: 'rgba(150,150,150,0.1)' //hover颜色
                                }
                            }
                        },
                        geo: {
                            show: true,
                            map: 'china',
                            roam: true,
                            zoom: 12,
                            center: [120.197130,29.108837],
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // borderColor: 'rgba(147, 235, 248, 1)', //地图块border颜色
                                    borderColor: '#284adb',
                                    borderWidth: 1,
                                    areaColor: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.5,
                                        r: 0.8,
                                        colorStops: [
                                            {  //地图颜色
                                                offset: 0,
                                                color: 'rgba(41,40,65,0)'
                                                // color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(30, 31, 49, 0.5)'
                                                // color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(40, 91, 219, 0.5)',//地图块表层盖一层阴影颜色
                                    shadowOffsetX: -2,
                                    shadowOffsetY: 2,
                                    shadowBlur: 10
                                },
                                emphasis: {
                                    areaColor: '#389BB7',
                                    borderWidth: 0
                                }
                            }
                        }
                    },
                    options: []
                };
                for (var n = 0; n < year.length; n++) {
                    optionXyMap01.options.push({
                        backgroundColor: '#292841',  //051b4a
                        title: [
                            // {
                                /* text: '地图',
                                 subtext: '内部数据请勿外传',
                                 left: 'center',
                                 textStyle: {
                                     color: '#fff'
                                 }*/
                            // },
                            // {
                            //     id: 'statistic',
                            //     text: year[n] + "年数据统计情况",
                            //     right: '5%',
                            //     top: '30%',
                            //     textStyle: {
                            //         color: '#fff',
                            //         fontSize: 13
                            //     }
                            // }
                        ],
                        grid:{
                            top: '40%',
                            bottom: '3%',
                        },
                        xAxis: {
                            type: 'value',
                            scale: true,
                            position: 'top',
                            min: 0,
                            boundaryGap: false,
                            splitLine: {
                                show: false,
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                                margin: 2,
                                textStyle: {
                                    color: '#aaa'
                                }
                            },
                        },
                        yAxis: {
                            type: 'category',
                            //  name: 'TOP 20',
                            nameGap: 16,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#ddd',
                                    width: '0'
                                }
                            },
                            axisTick: {
                                // show: false,
                                lineStyle: {
                                    color: '#ddd'
                                }
                            },
                            axisLabel: {
                                // show: false,
                                interval: 0,
                                textStyle: {
                                    color: '#ccc'
                                }
                            },
                            data: categoryData
                        },
                        series: [
                            //未知作用
                            // {
                            //     //文字和标志
                            //     name: 'light',
                            //     type: 'scatter',
                            //     coordinateSystem: 'geo',
                            //     data: convertData(mapData[n]),
                            //     symbolSize: function (val) {
                            //         return val[2] / 10;
                            //     },
                            //     label: {
                            //         normal: {
                            //             formatter: '{b}',
                            //             position: 'right',
                            //             show: true
                            //         },
                            //         emphasis: {
                            //             show: true
                            //         }
                            //     },
                            //     itemStyle: {
                            //         normal: {
                            //             color: this.colors[this.colorIndex][n]
                            //         }
                            //     }
                            // },
                            //地图？
                            {
                                type: 'map',
                                map: 'china',
                                geoIndex: 0,
                                aspectScale: 0.75, //长宽比
                                showLegendSymbol: false, // 存在legend时显示
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false,
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    }
                                },
                                roam: true,
                                itemStyle: {
                                    normal: {
                                        areaColor: '#031525',
                                        borderColor: '#FFFFFF',
                                    },
                                    emphasis: {
                                        areaColor: '#2B91B7'
                                    }
                                },
                                animation: false,
                                data: mapData
                            },
                            //地图点的动画效果
                            {
                                //  name: 'Top 5',
                                type: 'effectScatter',
                                show: false,
                                coordinateSystem: 'geo',
                                data: convertData(mapData[n].sort(function (a, b) {
                                    return b.value - a.value;
                                }).slice(0, 20)),
                                symbolSize: function (val) {
                                    return val[2] / 20;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: this.colors[this.colorIndex][n],
                                        shadowBlur: 5,
                                        shadowColor: this.colors[this.colorIndex][n]
                                    }
                                },
                                zlevel: 1
                            },
                            //地图线的动画效果
                            // {
                            //     type: 'lines',
                            //     zlevel: 2,
                            //     effect: {
                            //         show: false,
                            //         period: 4, //箭头指向速度，值越小速度越快
                            //         trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            //         symbol: 'arrow', //箭头图标
                            //         symbolSize: 3, //图标大小
                            //     },
                            //     lineStyle: {
                            //         normal: {
                            //             color: this.colors[this.colorIndex][n],
                            //             width: 0.1, //尾迹线条宽度
                            //             opacity: 0.5, //尾迹线条透明度
                            //             curveness: .3 //尾迹线条曲直度
                            //         }
                            //     },
                            //     data: convertToLineData(mapData[n], this.geoGpsMap[Math.ceil(Math.random() * 6)])
                            // },
                            //柱状图
                            {
                                zlevel: 1.5,
                                type: 'bar',
                                symbol: 'none',
                                barWidth: 8,
                                itemStyle: {
                                    normal: {
                                        color: this.colors[this.colorIndex][n]
                                    }
                                },
                                data: barData[n]
                            }
                        ]
                    })
                }

                this.dataSourcePie.setOption(optionXyMap01);
                window.addEventListener('resize',  () => {
                    this.dataSourcePie.resize();
                });

                if(this.dataSourcePie){
                    this.timeInterval4 = setInterval(()=>{
                        this.dataSourcePie.resize();
                    },1000);
                }else{
                    clearInterval(this.timeInterval4);
                }
            },
            randomNum(minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1, 10);
                        break;
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                        break;
                    default:
                        return 0;
                        break;
                }
            }
        },
        mounted () {
            this.drawMapEchart();
        }
    }
</script>

<style scoped>

</style>