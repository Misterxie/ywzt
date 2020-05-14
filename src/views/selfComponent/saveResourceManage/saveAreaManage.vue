<template>
    <div class="saveAreaManage hasAllheight">
        <div class="formData">
            <Form ref="searchFormValidate" :model="searchFormValidate" :rules="searchRuleValidate" :label-width="80" >
                <Col span="6">
                    <FormItem label="名称" prop="name">
                        <Input v-model="searchFormValidate.name" placeholder="请输入名称" class="hasBorderStyle"></Input>
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
                    <Col span="24">
                        <Button class="btn_style1" @click="handleSearch('searchFormValidate')">搜索</Button>
                        <Button class="btn_style3" style="margin-left:10px;"  @click="openAddModal()" >新增存储域</Button>
                    </Col>
                </Col>
                <Col span="2"></Col>
            </Form>
        </div>
        <div class="tableData" ref="tableData">
            <div style="" class="tableStyle scrollbar-thumb">
                <i-table   ref="selection" :columns="areaCloumns" border style="border-color:#232137" :data="areaDataLsit" >
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="btn_style1" size="small" style="margin-right: 5px" @click="showDetail(index,row)">详情</Button>
                        <Button class="btn_style2" size="small" @click="remove(index,row)">删除</Button>
                    </template>
                </i-table>
            </div>
            <Page :total="this.total" show-total class="devicePage" :page-size="this.pageSize" @on-change="selectPage"/>
        </div>
        <!--新增弹框-->
        <Modal v-model="addModal" title="新增存储域" width="60%">
            <div style="height:300px;overflow: auto;">
                <Form ref="addFormValidate" :model="addFormValidate" :rules="addRuleValidate" :label-width="100" >
                    <Col :span="8">
                        <FormItem label="存储域编号" prop="store_area_id">
                            <Input v-model="addFormValidate.store_area_id" placeholder="输入存储域编号"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="存储名称" prop="store_name">
                        <Input v-model="addFormValidate.store_name" placeholder="输入存储名称"></Input>
                    </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="ip地址" prop="ip">
                            <Input v-model="addFormValidate.ip" placeholder="输入ip地址"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="厂商名称" prop="maker_name">
                            <Input v-model="addFormValidate.maker_name" placeholder="输入厂商名称"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="设备类型" prop="device_type">
                            <Input v-model="addFormValidate.device_type" placeholder="输入设备类型"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="是否在线" prop="is_online">
                            <Select v-model="addFormValidate.is_online" placeholder="选择是否在线">
                                <Option value="1">在线</Option>
                                <Option value="0">不在线</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="节点个数" prop="node_num">
                            <Input v-model="addFormValidate.node_num" placeholder="输入节点个数"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="总空间大小（GB）" prop="total_size">
                            <Input v-model="addFormValidate.total_size" placeholder="输入总空间大小"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="已用空间大小（GB）" prop="use_size">
                            <Input v-model="addFormValidate.use_size" placeholder="输入已用空间大小"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="用户空间个数" prop="user_num">
                            <Input v-model="addFormValidate.user_num" placeholder="输入用户空间个数"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="区域位置" prop="location">
                            <Input v-model="addFormValidate.location" placeholder="输入区域位置"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="上线日期" prop="online_date">
                            <Row>
                                <Date-picker type="datetime" placeholder="选择日期和时间"  value="yyyy-MM-dd HH:mm:ss" @on-change="selectDate"></Date-picker>
                            </Row>
                        </FormItem>
                    </Col>
                    <!--<Col :span="24">-->
                        <!--<FormItem>-->
                            <!--<Button type="primary" @click="handleAdd('addFormValidate')">Submit</Button>-->
                            <!--<Button @click="handleReset('addFormValidate')" style="margin-left: 8px">Reset</Button>-->
                        <!--</FormItem>-->
                    <!--</Col>-->
                </Form>
            </div>
            <div slot="footer">
                <i-button class="btn_style1" size="large" @click.native="resetForm('addFormValidate')">重置</i-button>
                <i-button class="btn_style2" size="large"  @click.native="handleAdd('addFormValidate')">提交</i-button>
            </div>
        </Modal>
        <!--详情弹框-->
        <Modal v-model="detailModal" title="存储管理" width="80%" >
            <div style="height:400px;">
                <Col span="12" style="height:400px;">
                    <div ref="savePie" style="width:500px;height:400px;"></div>
                </Col>
                <Col span="2"></Col>
                <Col span="10" style="height:400px;overflow: scroll">
                    <i-table border :columns="saveInfoColumns" :data="saveInfoData"></i-table>
                </Col>
            </div>
            <div slot="footer">
                <i-button class="btn_style1" size="large" @click.native="detailModal = false">确定</i-button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Util from '@/libs/util.js';
    import $ from 'jquery'
    export default {
        name: "saveAreaManage",
        data () {
            return {
                //searchform
                searchFormValidate: {
                    name: '',
                    date: ''
                },
                searchRuleValidate: {
                    // name: [
                    //     { required: true, message: '名称不能为空', trigger: 'blur' }
                    // ],
                    // date: [
                    //     { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    // ]
                },
                //addFrom
                addFormValidate: {
                    store_area_id: "",  //必填
                    store_name: "",  //必填
                    ip: "",  //必填
                    maker_name: "", //必填
                    device_type: "",
                    is_online: "0",
                    node_num: 0,
                    total_size: "",
                    use_size: "",
                    user_num: 0,
                    location: "",
                    online_date: "",
                },
                addRuleValidate: {
                    store_area_id: [
                        { required: true, message: '存储域编号不能为空', trigger: 'blur' }
                    ],
                    store_name: [
                        { required: true, message: '存储域名称不能为空', trigger: 'blur' }
                    ],
                    ip: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' }
                    ],
                    maker_name: [
                        { required: true, message: '厂商名称不能为空', trigger: 'blur' }
                    ]
                },
                //table
                areaCloumns: [
                    {
                        title: '存储编号',
                        key: 'store_area_id',
                        width: 100
                    },
                    {
                        title: 'IP地址',
                        key: 'ip',
                        width: 200
                    },
                    {
                        title: '是否在线',
                        key: 'is_online',
                        width: 100
                    },
                    {
                        title: '区域位置',
                        key: 'location'
                    },
                    {
                        title: '总空间大小(G)',
                        key: 'total_size'
                    },
                    {
                        title: '厂商名称',
                        key: 'maker_name'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                areaDataLsit: [
                    // {
                    //     "store_area_id": "2",
                    //     "store_name": "store2",
                    //     "ip": "192.167.0.1",
                    //     "location": "locate2",
                    //     "total_size": "10",
                    //     "use_size": "55",
                    //     "maker_name": "maker2",
                    //     "device_type": "124",
                    //     "user_num": null,
                    //     "node_num": null,
                    //     "is_online": "0",
                    //     "online_date": "2019-10-23 08:25:26",
                    //     "creator": "hy",
                    //     "createdate": "2019-10-22 08:25:37"
                    // }
                ],
                total: 0,
                pageSize: 15,
                currentPage: 1,
                //详情弹框
                detailModal: false,
                saveInfoColumns: [
                    {
                        title: 'nameKey',
                        key: 'nameKey'
                    },
                    {
                        title: 'value',
                        key: 'value'
                    }
                ],
                saveInfoData: [
                    // {nameKey: '存储Id', value: '192.167.37.66'},
                ],
                //添加弹框
                addModal: false
            }
        },
        methods: {
            //form
            handleSearch (name) { this.getAreaList(); },
            openAddModal () {  this.addModal = true; },
            //详情
            showDetail (index,row) {
                this.detailModal = true;
                this.saveInfoData = [];
                Util.ajaxMethod('GET', '/api/cscpStoreArea/getCscpStoreArea', {store_area_id: row.store_area_id}).then((res) => {
                   for(let key in res){
                       this.saveInfoData.push({nameKey: key, value: res[key]});
                   }
                    this.drawPie(res.total_size,res.use_size);
                })
            },
            drawPie (total_size,use_size) {
                let myChart = this.$echarts.init(this.$refs.savePie);
                let option = {
                    title: {
                        text: '当前存储使用率统计',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                    },
                    series: [
                        {
                            name: '存储使用率',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '60%'],
                            data: [
                                {value: use_size, name: '已使用'},
                                {value: total_size - use_size, name: '未使用'},

                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            //选择上线时间
            selectDate(date){ this.addFormValidate.online_date = date; },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getAreaList()
            },
            //添加存储域
            handleAdd(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        Util.ajaxMethod('POST', '/api/cscpStoreArea/save', this.addFormValidate).then((res) => {
                            if(res){
                                this.getAreaList();
                                this.addModal = false;
                            }
                        })
                    }
                })
            },
            //删除
            remove (index , row) {
                Util.ajaxMethod('DELETE', '/api/cscpStoreArea/delete/' + row.store_area_id).then((res) => {
                    this.getAreaList();
                })
            },
            //获取存储域列表
            getAreaList(){
                Util.ajaxMethod('GET', '/api/cscpStoreArea/search',{page: this.currentPage,size:this.pageSize}).then((res) => {
                    if(res){
                        this.total = res.recordsTotal;
                        this.areaDataLsit = res.data;
                        this.clearAddFormValidate();
                    }
                }).catch((error)=>{
                    this.$Message.info('获取存储域列表失败，请重新获取');
                })
            },
            //清除添加表单addFormValidate
            clearAddFormValidate() {
                this.addFormValidate = {
                    store_area_id: "",  //必填
                    store_name: "",  //必填
                    ip: "",  //必填
                    maker_name: "", //必填
                    device_type: "",
                    is_online: "0",
                    node_num: 0,
                    total_size: "",
                    use_size: "",
                    user_num: 0,
                    location: "",
                    online_date: ""
                }
            },
            //重置表单
            resetForm(name){ this.$refs[name].resetFields(); }
        },
        mounted () {
            this.getAreaList();


        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/common.less";
    @import "../../../styles/selfIview.less";

    .saveAreaManage {
        .ivu-table-wrapper{
            /*height:100%;*/
            border:none !important;
        }
        .formData{
            height: 60px;
            line-height:60px;
            background:#eef1f7;
            .hasBorderStyle{
                input{
                    background:rgba(24,23,39,1);
                    border:1px solid rgba(77,148,255,1);
                    border-radius:30px;
                }

            }

        }
        .tableData{
            height: calc(~"100% - 60px");
            .tableStyle{
                height:calc(~"100% - 50px");
                overflow-y: scroll;
                background:#eef1f7;



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
    }

</style>