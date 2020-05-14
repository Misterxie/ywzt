<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <div class="ivu-row">
                <div class="ivu-col ivu-col-span-18">
                    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                        <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal"></i>
                        <input autocomplete="off" v-model="selectForm" spellcheck="false" type="text" placeholder="根据用户名模糊查询..." class="ivu-input ivu-input-default" ref="selectForm">
                    </div>
                </div>
                <div class="ivu-col ivu-col-span-6">
                    <button data-v-553822d9=""  @click="handleSearch()" type="button" class="ivu-btn ivu-btn-default ivu-btn-circle">
                        <i class="ivu-icon ivu-icon-md-search"></i>
                        <span>查询</span>
                    </button>
                </div>
            </div>
        </div>
        <hr style="margin: 5px;">
        <div class="tableData" ref="tableData">
            <div style="" class="tableStyle scrollbar-thumb">
                <i-table border  ref="selection" :columns="alarmCloumns" :data="alarmList">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row }" slot="scene">
                        <span class="type" v-if="row.scene=='1'">乡镇</span>
                        <span class="type" v-if="row.scene=='2'">校园</span>
                        <span class="type" v-if="row.scene=='3'">小区</span>
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
    import { Layout } from 'iview';
    export default {
        name: 'SpaceUserManage',
        data () {
            return {
                //searchform
                searchFormValidate: {
                    name: ''
                },
                searchRuleValidate: { },
                //table
                alarmCloumns: [
                    {
                        title: '编号',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        width: 150
                    },
                    {
                        title: '场景',
                        key: 'scene',
                        slot: 'scene',
                        width: 100
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: 'ip地址',
                        key: 'ip'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 200
                    }
                ],
                alarmList: [
                    // {
                    //     "id": 1,
                    //     "username": "xiaoyuan",
                    //     "scene": 2,
                    //     "time": "2020-04-09T15:18:43+08:00",
                    //     "ip": "60.191.20.190",
                    //     "status": "success"
                    // }
                    
                ],
                selectForm:"",
                total: 0,
                pageSize: 15,
                currentPage: 1
            }
        },
        methods: {
            //点位查询
            handleSearch() {
                this.getAlarmList();
            },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //获取登录日志列表
            getAlarmList(index,row){
                Util.ajaxMethod('GET', '/api/log/',{account: this.selectForm,page: this.currentPage,size:this.pageSize}).then((res) => {
                    // console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                        this.clearSetAlarmForm();
                    }
                }).catch((error)=>{
                    this.$Message.info('获取用户场景列表失败，请重新获取');
                })
            },
            //清除添加表单addFormValidate
            clearSetAlarmForm() {
                this.setAlarmForm = {
                    id: "",
                    account: "",
                    password: "",
                    type: ""
                }
            },
            //重置表单
            resetForm(name){  this.$refs[name].resetFields(); }

        },
        mounted () {
            this.getAlarmList();
        },
        created(){
            this.getAlarmList();
        },
        activated() {
            this.getAlarmList();
        },
    }
</script>

<style scoped lang="less">
    .deviceAlarmManage {
        .ivu-table-wrapper{
            /*height:100%;*/
        }
        .formData{
            // height: 60px;
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