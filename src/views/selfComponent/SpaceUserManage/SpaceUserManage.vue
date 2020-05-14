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
                    <button data-v-553822d9=""  @click="handleAdd()" type="button" class="ivu-btn ivu-btn-primary ivu-btn-circle">
                        <i class="ivu-icon ivu-icon-md-add"></i>
                        <span>添加</span>
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
                    <template slot-scope="{ row }" slot="type">
                        <span class="type" v-if="row.type=='1'">乡镇</span>
                        <span class="type" v-if="row.type=='2'">校园</span>
                        <span class="type" v-if="row.type=='3'">小区</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <button data-v-553822d9="" @click="handleUpdate(index,row)" type="button" class="ivu-btn ivu-btn-primary">
                            <span>编辑</span>
                        </button>
                        <button data-v-553822d9="" @click="goSpacePoint(index,row)" type="button" class="ivu-btn ivu-btn-primary">
                            <span>点位授权</span>
                        </button>
                        <button data-v-553822d9="" @click="deleteSpaceUser(index,row)" type="button" class="ivu-btn ivu-btn-error">
                            <span>删除</span>
                        </button>
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
                        title: '用户编号',
                        key: 'id',
                        width: 200
                    },
                    {
                        title: '用户名',
                        key: 'account',
                        width: 200
                    },
                    {
                        title: '应用类型',
                        key: 'type',
                        slot: 'type',
                        width: 200
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                alarmList: [],
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
            //场景用户添加
            handleAdd(){
                this.$router.push({path: '/UserAdd'})
            },
            //场景用户编辑
            handleUpdate(index,row){
                this.$router.push({name: 'UserUpdate', params: {id:row.id, account:row.account, password:row.password, type:row.type}});
            },
            //场景用户点位授权
            goSpacePoint(index,row){
                
                this.$router.push({name: 'SpacePoint',params: {id:row.id,account:row.account} });
            },
            //场景用户删除
            deleteSpaceUser(index,row){
                // 使用confirm组件进行确认框提示
                this.$Modal.confirm({
                    title: "删除提示",
                    content: "是否确认删除",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        Util.ajaxMethod('DELETE', '/api/user/'+row.id).then((res) => {
                            this.getAlarmList();
                            this.$Message.info('场景用户删除成功');
                        }).catch((error)=>{
                            this.$Message.info('场景用户列表失败');
                        })                       
                    }
                })
            },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //获取场景用户列表
            getAlarmList(index,row){
                Util.ajaxMethod('GET', '/api/user/',{account: this.selectForm,resultType: 0,page: this.currentPage,size:this.pageSize}).then((res) => {
                    // console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                    }
                }).catch((error)=>{
                    this.$Message.info('获取用户场景列表失败，请重新获取');
                })
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
    @import "../../../styles/common.less";
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