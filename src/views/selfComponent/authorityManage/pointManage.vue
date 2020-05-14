<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <div class="ivu-row">
                <div class="ivu-col ivu-col-span-18">
                    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                        <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal"></i>
                        <input autocomplete="off" spellcheck="false" type="text" placeholder="根据设备号模糊查询..." class="ivu-input ivu-input-default" ref="mpNum">
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
                    <template slot-scope="{ row }" slot="isOnline">
                        <span class="online" v-if="row.isOnline=='1'">在线</span>
                        <span class="online" v-if="row.isOnline=='0'">不在线</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        
                        <button data-v-553822d9="" @click="deviceTearDown(index,row)" v-if="row.isOnline=='1'" type="button" class="ivu-btn ivu-btn-error">
                            <span>设备断流</span>
                        </button>
                        <button data-v-553822d9="" @click="deviceTearDown(index,row)" v-if="row.isOnline=='0'" type="button" class="ivu-btn ivu-btn-error" disabled>
                            <span>设备断流</span>
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
    export default {
        name: 'ponitManage',
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
                        title: '设备号',
                        key: 'mpNum',
                        width: 200
                    },
                    {
                        title: '点位名称',
                        key: 'mpName',
                        width: 200
                    },
                    {
                        title: '经纬度',
                        key: 'mpGps'
                    },
                    {
                        title: '在线状态',
                        key: 'isOnline',
                        slot: 'isOnline',
                        width: 100
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        width: 200
                    }
                ],
                alarmList: [
                    // {
                    //     mpId: 1
                    //     mpNum: "33020300041327893817"
                    //     mpName: "七大场景1"
                    //     mpGps: ""
                    //     isOnline: 0
                    // }
                ],
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
            //获取点位列表
            getAlarmList(index,row){
                console.log(this.currentPage);
                
                Util.ajaxMethod('GET', '/api/monitorypoints',{mpNum: this.$refs.mpNum.value,resultType: 0,page: this.currentPage,size:this.pageSize}).then((res) => {
                    console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                    }
                }).catch((error)=>{
                    this.$Message.info('获取点位列表失败，请重新获取');
                })
            },
            //设备断流
            deviceTearDown(index,row){
                // 使用confirm组件进行确认框提示
                this.$Modal.confirm({
                    title: "删除提示",
                    content: "确定该设备断流",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                        Util.ajaxMethod('POST', '/api/device/deviceTearDown',{"deviceNum": row.mpNum,"streamType": "1","account": "qidachangjing",}).then((res) => {
                            console.log(res);
                            this.$Message.info('设备成功断流');
                        }).catch((error)=>{
                            this.$Message.info('设备断流失败，请重新断流');
                        })
                    }
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