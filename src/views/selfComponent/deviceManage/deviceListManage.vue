<template>
    <div class="deviceAlarmManage hasAllheight">
        <div class="formData">
            <Form ref="searchFormValidate" :model="searchFormValidate" :rules="searchRuleValidate" :label-width="80">
                <Col span="6">
                    <FormItem label="设备号" prop="name">
                        <Input v-model="searchFormValidate.name" placeholder="请输入设备号"></Input>
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
                    <template slot-scope="{ row }" slot="deviceType">
                        <span class="deviceType" v-if="row.deviceType=='132'">IPC</span>
                        <span class="deviceType" v-if="row.deviceType=='111'">DVR</span>
                        <span class="deviceType" v-if="row.deviceType=='118'">NVR</span>
                        <span class="deviceType" v-if="row.deviceType=='114'">解码器</span>
                    </template>
                    <template slot-scope="{ row }" slot="isOnline">
                        <span class="online" v-if="row.isOnline==true">在线</span>
                        <span class="online" v-if="row.isOnline==false">不在线</span>
                    </template>
                    <template slot-scope="{ row }" slot="isSupportCloudStorage">
                        <span class="isSupportCloudStorage" v-if="row.isSupportCloudStorage==true">是</span>
                        <span class="isSupportCloudStorage" v-if="row.isSupportCloudStorage==false">否</span>
                    </template>
                    <template slot-scope="{ row }" slot="isSupportLocalStorage">
                        <span class="isSupportLocalStorage" v-if="row.isSupportLocalStorage==true">是</span>
                        <span class="isSupportLocalStorage" v-if="row.isSupportLocalStorage==false">否</span>
                    </template>
                    <template slot-scope="{ row }" slot="protocolType">
                        <span class="protocolType" v-if="row.protocolType=='1'">GB28181</span>
                        <span class="protocolType" v-if="row.protocolType=='2'">ONVIF</span>
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
        name: 'deviceListManage',
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
                        title: '设备编号',
                        key: 'deviceId',
                        width: 100
                    },
                    {
                        title: '设备号',
                        key: 'deviceNum',
                    },
                    {
                        title: '设备名称',
                        key: 'deviceName',
                        width: 100
                    },
                    {
                        title: '设备类型',
                        key: 'deviceType',
                        width: 100,
                        slot: 'deviceType'
                    },
                    {
                        title: '是否在线',
                        key: 'isOnline',
                        slot: 'isOnline',
                        width: 100
                    },
                    {
                        title: '是否有云存储',
                        key: 'isSupportCloudStorage',
                        slot: 'isSupportCloudStorage',
                        width: 130
                    },
                    {
                        title: '是否有本地存储',
                        key: 'isSupportLocalStorage',
                        slot: 'isSupportLocalStorage',
                        width: 130
                    },
                    {
                        title: '协议类型',
                        key: 'protocolType',
                        slot: 'protocolType',
                        width: 100
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
            handleSearch(name) { 
                this.getAlarmList(); 
            },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAlarmList();
            },
            //获取设备列表
            getAlarmList(){
                console.log(this.searchFormValidate.name);
                
                Util.ajaxMethod('POST', '/api/device/getDeviceList',{account: "qidachangjing",deviceNum:this.searchFormValidate.name,resultType: "0"}).then((res) => {
                    console.log(res);
                    if(res){
                        this.total = res.retData.total;
                        this.alarmList = res.retData.list;
                    }
                }).catch((error)=>{
                    this.$Message.info('获取设备列表失败，请重新获取');
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
            margin-left: 10px;
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