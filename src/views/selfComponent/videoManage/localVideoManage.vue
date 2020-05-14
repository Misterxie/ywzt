<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <Form ref="searchFormValidate" :model="searchFormValidate" :rules="searchRuleValidate" :label-width="80">
                <Col span="6">
                    <FormItem label="设备号" prop="name">
                        <Input v-model="searchFormValidate.name" placeholder="请输入设备号"></Input>
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
                        <Button class="btn_style1" size="small" style="margin-right: 5px" @click="VideoDown(index,row)">录像下载</Button>
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
    export default {
        name: "localVideoManage",
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
                        title: '播放地址',
                        key: 'httpUri',
                        width: 400
                    },
                    {
                        title: '播放开始时间',
                        key: 'playStartTime',
                    },
                    {
                        title: '播放结束时间',
                        key: 'playEndTime'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                alarmList: [
                ],
                total: 0,
                pageSize: 15,
                currentPage: 1
            }
        },
        methods: {
            p(s) {
                return s < 10 ? '0' + s : s
            },
            //form
            handleSearch(name) { this.getAlarmList(); },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //获取本地录像列表
            getAlarmList(){
                const d = new Date(this.searchFormValidate.date);

                const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate());
                const resstartTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds());
                const resendTime = this.p(d.getHours()+24) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds());

                if (this.searchFormValidate.date == "") {
                    this.startTime = "";
                    this.endTime = "";
                } else {
                    this.startTime = resDate+" "+ resstartTime;
                    this.endTime = resDate+" "+ resendTime;
                }
                Util.ajaxMethod('GET', '/api/video/getLocalFile',
                    {
                        deviceNum: this.searchFormValidate.deviceNum,
                        netType: 1,
                        queryRecordStartIndex:this.currentPage,
                        queryRecordMaxCount:this.pageSize,
                        queryContent: {
                            startTime: this.startTime,
                            endTime: this.endTime
                        }
                    }
                ).then((res) => {
                    if(res){
                        this.total = res.recordsTotal;
                        this.alarmList = res.data;
                        this.clearSetAlarmForm();
                    }
                }).catch((error)=>{
                    this.$Message.info('获取本地录像列表失败，请重新获取');
                })
            },
            //录像下载
            VideoDown(index,row){
                window.open(row.httpUri);
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