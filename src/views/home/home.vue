<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
    .modelbg1{
        background:url('./components/styles/bg1.png') no-repeat;
        background-size:cover;
    }
    .modelbg2{
        background:url('./components/styles/modelbg2.png') no-repeat;
        background-size:cover;
    }
    .modelbg3{
        background:url('./components/styles/modelbg3.png') no-repeat;
        background-size:cover;
    }
    .modelbg4{
        background:url('./components/styles/modelbg4.png') no-repeat;
        background-size:cover;
    }
</style>
<template>
    <div class="home-main hasAllheight ">
        <Row :gutter="20" >
            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="user_created_count"
                        :end-val="count.createUser"
                        iconType="md-person-add"
                        color="#00bdc1"
                        :intro-text= "countName.name1"
                        :iconClass="{icon1:true}"
                        class="modelbg1"
                ></infor-card>
                <!--class="modelbg1" class="modelbg2" class="modelbg3"  class="modelbg4"-->
            </Col>
            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}" >
                <infor-card
                        id-name="visit_count"
                        :end-val="count.visit"
                        iconType="ios-eye"
                        color="#2385ff"
                        :iconSize="50"
                        :intro-text= "countName.name2"
                        :iconClass="{icon2:true}"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="collection_count"
                        :end-val="count.collection"
                        iconType="md-cloud-upload"
                        color="#6e5ffe"
                        :intro-text= "countName.name3"
                        :iconClass="{icon3:true}"
                ></infor-card>
            </Col>
            <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card
                        id-name="transfer_count"
                        :end-val="count.transfer"
                        iconType="ios-shuffle"
                        color="#ff8a00"
                        :intro-text= "countName.name4"
                        :iconClass="{icon4:true}"
                ></infor-card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="md-wifi"></Icon>
                                存储空间使用增量(近7天)
                            </p>
                            <div class="data-source-row">
                                <seven-memory-space></seven-memory-space>
                            </div>
                        </Card>

                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="md-wifi"></Icon>
                                空间使用量(存储域)
                            </p>
                            <div class="data-source-row">
                                <space-use></space-use>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="8" >
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="ios-map"></Icon>
                            点位地图分布
                        </p>
                        <div class="map-con">
                            <!--<Col span="10">-->
                                <!--<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>-->
                            <!--</Col>-->
                            <Col span="24" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <!--<home-map :city-data="cityData"></home-map>-->
                                    <gdMap></gdMap>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card class="hasAllheight">
                            <p slot="title" class="card-title">
                                <Icon type="md-wifi"></Icon>
                                累计坏盘数量(近30天)
                            </p>
                            <div class="data-source-row">
                                <error-disk></error-disk>
                            </div>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="md-wifi"></Icon>
                                告警数(近七天)
                            </p>
                            <div class="data-source-row">
                                <alarm-number></alarm-number>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="md-wifi"></Icon>
                        流量(总)
                    </p>
                    <div class="data-source-row">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <div style="height:278px;background:#fff;">
                    <!--<nodeDetailList></nodeDetailList>-->

                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="md-wifi"></Icon>
                            雷达扫描
                        </p>
                        <div class="data-source-row">
                            <radar></radar>
                        </div>
                    </Card>
                </div>
                <!--<Card>-->
                    <!--<p slot="title" class="card-title">-->
                        <!--<Icon type="md-map"></Icon>-->
                        <!--节点详细信息列表-->
                    <!--</p>-->
                    <!--<div class="data-source-row">-->
                        <!--&lt;!&ndash;<visite-volume></visite-volume>&ndash;&gt;-->
                        <!--<nodeDetailList></nodeDetailList>-->
                    <!--</div>-->
                <!--</Card>-->
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <div style="height:278px;background:#fff;">
                    <alarm-list></alarm-list>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import util from '@/libs/util.js';
import errorDisk from './components/errorDisk.vue';
import sevenMemorySpace from './components/sevenMemorySpace.vue';
import spaceUse from './components/spaceUse.vue';
import alarmNumber from './components/alarmNumber.vue';
import gdMap from './components/gdMap.vue';
import nodeDetailList from './components/nodeDetailList.vue';
import alarmList from './components/alarmList.vue';
import radar from './components/radar.vue';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem,

        errorDisk,
        sevenMemorySpace,
        spaceUse,
        alarmNumber,
        gdMap,
        nodeDetailList,
        alarmList,
        radar
    },
    data () {
        return {
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 280,
                visit: 840,
                collection: 5830,
                transfer: 60
            },
            countName: {
                name1: '', // 存储域
                name2: '', // 节点
                name3: '', // 磁盘数
                name4: ''  // 当日告警数
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        clickTest() {
            util.ajax.get("/api/cscpAppInfos").then(response => {
                console.log(response.data);
            });
        },
        //获取头部四个信息
        getCenterInfo() {
            util.ajaxMethod('GET','/api/center/getCenterInfo').then((res)=>{
                this.count.createUser = res.data1.value;
                this.count.visit = res.data2.value;
                this.count.collection = res.data3.value;
                this.count.transfer = res.data4.value;

                this.countName.name1 = res.data1.name;
                this.countName.name2 = res.data2.name;
                this.countName.name3 = res.data3.name;
                this.countName.name4 = res.data4.name;
            })
        }
    },
    mounted(){
       this.getCenterInfo();
    }
};
</script>
