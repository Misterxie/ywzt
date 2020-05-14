<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <Form ref="searchFormValidate" :model="searchFormValidate" :rules="searchRuleValidate" :label-width="80">
                <Col span="6">
                    <FormItem label="名称" prop="name">
                        <Input v-model="searchFormValidate.name" placeholder="请输入名称"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="日期">
                        <Row>
                            <Col span="24">
                                <FormItem prop="date">
                                    <DatePicker type="date" placeholder="选择日期" v-model="searchFormValidate.date"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
                <Col span="10">
                    <Col span="20">
                        <Button class="btn_style1" @click="handleSearch('searchFormValidate')">搜索</Button>
                    </Col>
                </Col>
            </Form>
        </div>
        <div class="tableData" ref="tableData">
            <div style="" class="tableStyle scrollbar-thumb">
                <i-table border  ref="selection" :columns="alarmCloumns" :data="alarmList">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="btn_style1" size="small" style="margin-right: 5px" @click="alarmSet(index,row)">设置告警已读</Button>
                    </template>
                </i-table>
            </div>
            <Page :total="this.total" show-total class="devicePage" :page-size="this.pageSize" @on-change="selectPage"/>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util.js';
    import $ from 'jquery'
    import axios from 'axios'
    export default {
        name: "deviceAlarmManage",
        data () {
            return {
                //searchform
                searchFormValidate: {
                    name: '',
                    date: ''
                },
                searchRuleValidate: { },
                //table
                alarmCloumns: [
                    {
                        title: '告警编号',
                        key: 'store_id',
                        width: 200
                    },
                    {
                        title: '设备编号',
                        key: 'node_id',
                        width: 200
                    },
                    {
                        title: '告警级别',
                        key: 'alarm_level',
                        width: 200
                    },
                    {
                        title: '告警内容',
                        key: 'alarm_num'
                    },
                    {
                        title: '告警时间',
                        key: 'alarm_time'
                    },
                    {
                        title: '告警类型',
                        key: 'alarm_type',
                        width: 100
                    },
                    {
                        title: '是否已读',
                        key: 'alarm_type',
                        width: 100
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                alarmList: [],
                total: 0,
                pageSize: 15,
                currentPage: 1
            }
        },
        methods: {
            //form
            handleSearch(name) { this.getAlarmList(); },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //获取告警列表
            getAlarmList(){
                Util.ajaxMethod('POST', '/api/alarm/getAlarms',{page: this.currentPage,size:this.pageSize}).then((res) => {
                    console.log(res);
                    
                    if(res){
                        this.total = res.recordsTotal;
                        this.alarmList = res.data;
                        this.clearSetAlarmForm();
                    }
                }).catch((error)=>{
                    this.$Message.info('获取告警列表失败，请重新获取');
                })
            },
            //设置告警已读
            alarmSet(index,row){
                Util.ajaxMethod('POST', '/api/alarm/updateAlarm',{deviceAlarmIds: row.deviceAlarmIds}).then((res) => {
                    if(res){
                        this.$Message.info('设置告警已读成功');
                    }
                }).catch((error)=>{
                    this.$Message.info('设置告警已读失败，请重新设置');
                })

            }

        },
        mounted () {
            this.getAlarmList();


        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/common.less";
    .deviceAlarmManage {
        .ivu-table-wrapper{
            /*height:100%;*/
        }
        .formData{
            height: 60px;
        }
        .tableData{
            height: calc(~"100% - 60px");
            .tableStyle{
                height:calc(~"100% - 50px");
                overflow-y: scroll;
                background:#fff;
            }
            .devicePage{
                margin:10px 0;
                height:32px;
                text-align:left;
                position:relative;
            }
            .selectBtn{
                position:relative;
                top:-40px;
            }
        }
        .btn_style1{
            background:#2d8cf0;
            color:#fff;
        }
        .btn_style2{
            background:#ff6c00;
            color:#fff;
        }
        .btn_style3{
            background:#10a9f0;
            color:#fff;
        }

    }

</style>