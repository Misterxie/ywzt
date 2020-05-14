<template>
    <div style="width:100%;height:100%;">
        <Card>
            <div slot="title" class="card-title" >
                <div class="table-item-head" style="position:relative;">
                    <table >
                        <thead>
                        <tr>
                            <!--<th style="width:15%">域编号</th>-->
                            <!--<th style="width:20%">节点编号</th>-->
                            <!--<th style="width:25%">告警类型</th>-->
                            <!--<th style="width:10%">告警级别</th>-->
                            <!--<th style="width:30%">告警时间</th>-->
                            <th class="ivu-col ivu-col-span-5">域编号</th>
                            <th class="ivu-col ivu-col-span-4">节点编号</th>
                            <th class="ivu-col ivu-col-span-4">告警类型</th>
                            <th class="ivu-col ivu-col-span-4">告警级别</th>
                            <th class="ivu-col ivu-col-span-5">告警时间</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="data-source-row" style="position:relative;">
                <div class="table-container-list scrollbar-thumb alermBox" style="height:100%;">
                    <ul id="alarmList" ref="alarmList" class="alarmList hasAllWidth" >
                        <li v-if="alarmList" v-for="(item,index) in this.alarmList" :key="index" @click="showAlarmInfo(item)">
                            <Col span="1"> <div class="logoCircle" ></div> </Col>
                            <Col span="4" style="padding-left:7px;text-align:left;">{{item.alarm_num}}</Col>
                            <Col span="4" >{{item.node_id}}</Col>
                            <Col span="4" >{{item.alarm_type}}</Col>
                            <Col span="4" >{{item.alarm_level}}</Col>
                            <Col span="5" >{{item.alarm_time}}</Col>
                        </li>
                    </ul>
                </div>
                <!--dialog-->
                <div id="alarmAlert" class="alarmAlert" style="">
                    <div @click="closeAlarmAlert()" class="closeAlarm" style=""></div>
                    <Table border :columns="currentActiveAlarmColumns" height="180" :data="currentActiveAlarm"></Table>
                </div>
            </div>

        </Card>
    </div>
</template>

<script>
    import Util from '@/libs/util.js';
    import $ from 'jquery';
    export default {
        name: "alarmList",
        data () {
            return {
                alarmList: [
                    // {
                    //     alarm_content: null,
                    //     alarm_level: "9",
                    //     alarm_num: "KLHOK9611056416838",
                    //     alarm_time: "2019-10-05 12:51:08",
                    //     alarm_type: "5",
                    //     createdate: "2019-10-24 15:17:31",
                    //     creator: null,
                    //     node_id: "77",
                    //     store_id: "37"
                    // }
                ],
                currentActiveAlarm: [],
                currentActiveAlarmColumns: [
                    {
                        title: 'nameKey',
                        key: 'nameKey'
                    },
                    {
                        title: 'value',
                        key: 'value'
                    }
                ]
            }
        },
        methods: {
            getNodesList () {
                Util.ajaxMethod('POST', '/api/alarm/getAlarms').then((res) => {
                    console.log(res);
                    
                    // this.alarmList = res.data;
                })
            },
            //告警消息弹框
            showAlarmInfo (item) {
                for (let key in item) {
                    this.currentActiveAlarm.push({nameKey: key, value: item[key]});
                }
                console.log(this.currentActiveAlarm)

                // this.currentActiveAlarm = item
                $("#alarmAlert").css("display", "block");
            },
            closeAlarmAlert() {
                $("#alarmAlert").css("display", "none");
            },
        },
        mounted() {
            this.getNodesList();
        }
    }
</script>

<style scoped lang="less">
    .table-item-head{
        width:100%;
        height:24px;
        line-height:24px;
        box-sizing: border-box;
        background-size:100% 100%;
        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size:12px;
        }
        th {
            color:#000;
            /*border-top: 1px solid #02384b;*/
            /*padding: 6px 0;*/
            font-size:12px;
        }
    }
    .table-container-list{
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        overflow-y: auto;
        border-collapse: collapse;
        tr{
            height:35px;
            line-height:35px;
            /*border-bottom: 1px solid #000;*/
        }
        td {
            /*font-size: 0.12rem;*/
            color: #000;
            padding: 5px 0;
            text-align:center;
            word-break:break-all;
        }
        .item-tr td:nth-child(1) {
            width: 15%;
        }
        .item-tr td:nth-child(2) {
            width: 20%;
        }
        .item-tr td:nth-child(3) {
            width: 30%;
        }
        .item-tr td:nth-child(4) {
            width: 35%;
        }

    }
    .scrollbar-thumb {
        &::-webkit-scrollbar {
            width: 5px;
            height: 10px;

        }

        // 滚动条滑块
        &::-webkit-scrollbar-thumb {
            border-radius: 0.02rem;
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background-color: #4693EC;
            //background-color:#fff;
        }

        // 滚动条轨道
        &::-webkit-scrollbar-track {
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0.02rem;
            background-color: #ccc;
        }
    }

    //告警列表
    .alarmList{
        /*position:absolute;*/
        /*top:0;*/
        /*right:0;*/
        /*left:0;*/
        /*overflow: hidden;*/

    }
    .alarmList > li{
        /*height:15%;*/
        height:35px;
        padding:8px;
        list-style: none;
    }
    .alarmList > li:hover{
        cursor:pointer;
        background: #70ddff;
    }
    .alarmList > li > div{
        font-size:10px;
        color:#000;
        height:100%;
        text-align:center;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .alarmList > li > div .logoCircle{
        width:12px;
        height:12px;
        margin:5px 5px 0;
        background:url("./image/alarm.png") no-repeat;
        background-size:100% 100%;
    }
    /*警告弹框*/
    .alarmAlert{
        color:#000;
        display:none;
        width:100%;
        height:100%;
        background: #e8caff;
        /*background:url("./image/alarm_bg.png") no-repeat;*/
        /*background-size:100% 100%;*/
        position:absolute;
        top:0;
        left:0;
        padding:20px 0 0;
    }
    .closeAlarm{
        width:18px;
        height:18px;
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
        background:url("./image/close_alarm.png") no-repeat;
        background-size:100% 100%;
    }
    .littleTag{
        display:inline-block;
        width:12px;
        height:12px;
        background:url("./image/big_alarm.png") no-repeat;
        background-size:100% 100%;
    }


</style>