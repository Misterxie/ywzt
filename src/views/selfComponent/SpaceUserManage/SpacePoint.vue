<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <div class="ivu-row">
                <div class="ivu-col ivu-col-span-10">
                    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                        <i class="ivu-iconivu-input-icon ivu-input-icon-normal"></i>
                        <!--    <input autocomplete="off" spellcheck="false" type="text" placeholder="根据点位id模糊查询..." class="ivu-input ivu-input-default" ref="mpNum"> -->
                        <Select placeholder="选择关联情况" v-model="selectType">
                            <Option value="1">未关联</Option>
                            <Option value="0">已关联</Option>
                        </Select>
                    </div>
                </div> 
                <div class="ivu-col ivu-col-span-14">
                    <button data-v-553822d9="" @click="handleSearch()" type="button" class="ivu-btn ivu-btn-default ivu-btn-circle">
                        <i class="ivu-icon ivu-icon-md-search"></i> 
                        <span>查询</span>
                    </button>
                    <button data-v-553822d9="" @click="handleAddPoint()" type="button" style="margin-left: 4px;" class="ivu-btn ivu-btn-primary">
                        <span>关联</span>
                    </button>
                    <button type="button" @click="handledeletePoint()" class="ivu-btn ivu-btn-default" style="margin-left: 4px;">
                        <span>取消关联</span>
                    </button>
                    <button type="button" @click="handlerefurbish()" class="ivu-btn ivu-btn-default" style="margin-left: 4px;">
                        <span>刷新</span>
                    </button>
                    <button type="button" @click="handleback()" class="ivu-btn ivu-btn-default" style="margin-left: 4px;">
                        <span>返回</span>
                    </button>
                    <span>当前用户为：{{this.$route.params.account}}</span>
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
                    <template slot-scope="{ row }" slot="isOnline">
                        <span class="isOnline" v-if="row.isOnline=='1'">在线</span>
                        <span class="isOnline" v-if="row.isOnline=='0'">不在线</span>
                    </template>
                    <template slot-scope="{ row }" slot="status">
                        <span class="status" v-if="row.status=='1'">未关联</span>
                        <span class="status" v-if="row.status=='0'">已关联</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        
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
        name: 'SpacePoint',
        data () {
            return {
                //table
                alarmCloumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '点位编号',
                        key: 'mpId',
                        width: 100
                    },
                    {
                        title: '点位名称',
                        key: 'mpName'
                    },
                    {
                        title: '经纬度',
                        key: 'mpGps'
                    },
                    {
                        title: '是否在线',
                        key: 'isOnline',
                        slot: 'isOnline'
                    },
                    {
                        title: '是否关联',
                        key: 'status',
                        slot: 'status'
                    }
                ],
                alarmList: [
                    {
                        // id: 10
                        // userId: 1
                        // mpId: 1
                        // mpNum: null
                        // mpName: "七大场景1"
                        // mpGps: "120.233227,30.271449"
                        // isOnline: 0
                        // status: 0
                    }
                ],
                selectType:"",
                total: 0,
                pageSize: 15,
                currentPage: 1
            }
        },
        created(){
            this.getParams()
        },
        methods: {
            getParams(){
                // 取到路由带过来的参数 作为提交用户点位编辑
                const routerParamsid = this.$route.params.id;
                
            },
            //场景用户点位查询
            handleSearch() {
                //this.selectType==1未关联 this.selectType==0已关联
                this.getAlarmList();
            },
            //场景用户点位授权
            handleAddPoint(index,row){
                //从场景用户管理带id值到点位授权页面
                console.log(this.$route.params.id);
                //checkbox获取数据
                console.log(this.$refs.selection.getSelection());
                if (this.$refs.selection.getSelection()!="") {
                    Util.ajaxMethod('POST', '/api/authoritys',   
                        {
                            authorityStatusDTOS: this.$refs.selection.getSelection(),
                            userId: this.$route.params.id
                        }
                    ).then((res) => {
                        if(res){
                            this.getAlarmList();
                            this.$Message.info('场景用户点位关联成功');
                        }
                    }).catch((error)=>{
                        this.$Message.info('场景用户点位关联失败，请重新关联');
                    })
                } else {
                    this.$Message.info('请勾选');
                }
            },
            //场景用户点位取消授权
            handledeletePoint(){
                if (this.$refs.selection.getSelection()!="") {
                    //对选中数据进行处理
                    var str = "";
                    this.$refs.selection.getSelection().forEach((e)=> {
                        str += ('ids='+e.id) + "&";
                    });
                    // 去除最后一个逗号
                    var data = str.substring(0, str.lastIndexOf('&'))
                    console.log(data);
                    Util.ajaxMethod('DELETE', '/api/authoritys/?'+data).then((res) => {
                        if(res){
                            this.getAlarmList();
                            this.$Message.info('场景用户点位取消关联成功');
                        }
                    }).catch((error)=>{
                        this.$Message.info('场景用户点位取消关联失败，请重新取消关联');
                    })
                } else {
                    this.$Message.info('请勾选');
                }     
            },
            //刷新列表
            handlerefurbish(){
                Util.ajaxMethod('GET', '/api/authoritys/'+this.$route.params.id,{resultType: 0,page: this.currentPage,size:this.pageSize}).then((res) => {
                    console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                        this.selectType = "";
                    }
                }).catch((error)=>{
                    this.$Message.info('获取场景用户点位列表失败，请重新获取');
                })
            },
            //返回场景用户管理
            handleback(){
                this.$router.push({name: 'SpaceUserManage'});
            },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //通过场景用户id获取点位列表
            getAlarmList(index,row){
                console.log(this.$route.params.id);
                Util.ajaxMethod('GET', '/api/authoritys/'+this.$route.params.id,{status: this.selectType,resultType: 0,page: this.currentPage,size:this.pageSize}).then((res) => {
                    console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                    }
                }).catch((error)=>{
                    this.$Message.info('获取场景用户点位列表失败，请重新获取');
                })
            }

        },
        mounted () {
            this.getAlarmList();
        },
        watch: {
            '$route': 'getParams'
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