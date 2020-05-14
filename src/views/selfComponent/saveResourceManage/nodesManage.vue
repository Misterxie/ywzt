<template>
    <div class="nodesManage hasAllheight">
        <div class="formData">
            <Form ref="searchNodesForm" :model="searchNodesForm" :rules="searchNodesRule" :label-width="80">
                <Col span="6">
                    <FormItem label="名称" prop="name">
                        <Input v-model="searchNodesForm.name" placeholder="请输入名称"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="日期">
                        <Row>
                            <Col span="24">
                                <FormItem prop="date">
                                    <DatePicker type="date" placeholder="选择日期" v-model="searchNodesForm.date"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>
                <Col span="10">
                    <Col span="24">
                        <Button class="btn_style1" @click="handleSubmit('searchNodesForm')">搜索</Button>
                        <Button class="btn_style3"  @click="openaddNodesModal()">新增节点</Button>
                    </Col>
                </Col>
            </Form>
        </div>
        <div class="tableData" ref="tableData">
            <!--height="500"-->
            <div style="" class="tableStyle scrollbar-thumb">
                <i-table border  ref="selection" :columns="nodesCloumns" :data="nodesDataLsit">
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
        <Modal v-model="addNodesModal" title="新增节点" width="60%" >
            <div style="height:400px;overflow: auto;">
                <Form ref="addNodesForm" :model="addNodesForm" :rules="addNodesRules" :label-width="120" >
                    <Col :span="8">
                        <FormItem label="节点编号" prop="node_id">
                            <Input v-model="addNodesForm.node_id" placeholder="输入节点编号"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="节点名称" prop="node_name">
                            <Input v-model="addNodesForm.node_name" placeholder="输入节点名称"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="ip地址" prop="ip">
                            <Input v-model="addNodesForm.ip" placeholder="输入ip地址"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="所属存储域" prop="store_area_id">
                            <Input v-model="addNodesForm.store_area_id" placeholder="输入所属存储域"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="空间大小（GB）" prop="total_size">
                            <Input v-model="addNodesForm.total_size" placeholder="输入空间大小（GB）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="已用空间（GB）" prop="use_size">
                            <Input v-model="addNodesForm.use_size" placeholder="输入已用空间（GB）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="存储使用率" prop="store_usage">
                            <Input v-model="addNodesForm.store_usage" placeholder="输入存储使用率"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="运行时间" prop="run_time">
                            <Input v-model="addNodesForm.run_time" placeholder="输入运行时间"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="接收速率（b/s）" prop="recv_rate">
                            <Input v-model="addNodesForm.recv_rate" placeholder="输入接收速率（b/s）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="发送速率（b/s）" prop="send_rate">
                            <Input v-model="addNodesForm.send_rate" placeholder="输入发送速率（b/s）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="CPU占用率" prop="cpu_usage">
                            <Input v-model="addNodesForm.cpu_usage" placeholder="输入CPU占用率"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="内存占用大小（MB）" prop="memory_use">
                            <Input v-model="addNodesForm.memory_use" placeholder="输入内存占用大小（MB）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="剩余内存大小" prop="memory_left">
                            <Input v-model="addNodesForm.memory_left" placeholder="输入剩余内存大小（MB）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="I/O等待" prop="wait">
                            <Input v-model="addNodesForm.wait" placeholder="输入I/O等待"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="磁盘数量" prop="disk_num">
                            <Input v-model="addNodesForm.disk_num" placeholder="输入磁盘数量"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="槽位数量" prop="slot_num">
                            <Input v-model="addNodesForm.slot_num" placeholder="输入槽位数量"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="坏盘数量" prop="current_baddisk">
                            <Input v-model="addNodesForm.current_baddisk" placeholder="输入坏盘数量"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="历史坏盘数" prop="history_baddisk">
                            <Input v-model="addNodesForm.history_baddisk" placeholder="历史坏盘数"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="历史坏盘率" prop="history_baddisk_rate">
                            <Input v-model="addNodesForm.history_baddisk_rate" placeholder="输入历史坏盘率"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="节点在线状态" prop="node_status">
                            <Select v-model="addNodesForm.node_status" placeholder="选择节点在线状态">
                                <Option value="1">在线</Option>
                                <Option value="0">不在线</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="系统盘空间占用率" prop="systemdisk_usage">
                            <Input v-model="addNodesForm.systemdisk_usage" placeholder="系统盘空间占用率"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="SSD磨损状态" prop="ssd_waer_status">
                            <Select v-model="addNodesForm.ssd_waer_status" placeholder="输入SSD磨损状态">
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="网卡数量" prop="card_num">
                            <Input v-model="addNodesForm.card_num" placeholder="输入网卡数量"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="网卡异常数量" prop="card_exption_num">
                            <Input v-model="addNodesForm.card_exption_num" placeholder="输入网卡异常数量"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="磁盘读取速率" prop="read_rate">
                            <Input v-model="addNodesForm.read_rate" placeholder="输入磁盘读取速率（MB/S）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="磁盘写入速率" prop="write_rate">
                            <Input v-model="addNodesForm.write_rate" placeholder="输入磁盘写入速率（MB/S）"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="连接数" prop="connect_num">
                            <Input v-model="addNodesForm.connect_num" placeholder="输入连接数"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="电源状态" prop="power_status">
                            <Input v-model="addNodesForm.power_status" placeholder="输入电源状态(百分比表示)"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="风扇状态" prop="fan_status">
                            <Input v-model="addNodesForm.fan_status" placeholder="输入风扇状态(百分比表示)"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="元数据节点类型" prop="node_type">
                            <Input v-model="addNodesForm.node_type" placeholder="输入元数据节点类型"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="是否副本模式" prop="is_copy">
                            <Input v-model="addNodesForm.is_copy" placeholder="输入是否副本模式"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="是否纠删码模式" prop="is_delete_code">
                            <Input v-model="addNodesForm.is_delete_code" placeholder="输入是否纠删码模式"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="raid方式" prop="raid">
                            <Input v-model="addNodesForm.raid" placeholder="输入raid方式"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="协议类型" prop="protocol_type">
                            <Input v-model="addNodesForm.protocol_type" placeholder="输入协议类型"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="8">
                        <FormItem label="启动时间" prop="start_time">
                            <Row>
                                <Date-picker type="datetime" placeholder="选择日期和时间"  value="yyyy-MM-dd HH:mm:ss" @on-change="selectStartDate"></Date-picker>
                            </Row>
                        </FormItem>
                    </Col>
                </Form>
            </div>
            <div slot="footer">
                <i-button class="btn_style1" size="large" @click.native="resetForm('addNodesForm')">重置</i-button>
                <i-button class="btn_style2" size="large"  @click.native="handleAdd('addNodesForm')">提交</i-button>
            </div>
        </Modal>
        <!--详情弹框-->
        <Modal v-model="detailModal" title="节点详情管理" width="80%" @on-ok="detailModal = false" @on-cancle="detailModal = false">
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
        name: "nodesManage",
        data () {
            return {
                //searchform
                searchNodesForm: {
                    name: '',
                    date: ''
                },
                searchNodesRule: {
                    // name: [
                    //     { required: true, message: '名称不能为空', trigger: 'blur' }
                    // ],
                },
                //addFrom
                addNodesForm: {
                    node_id: "", //节点编号
                    node_name: "", //节点名称
                    ip: "", //ip地址
                    store_area_id: "",//所属存储域
                    total_size: "", //空间大小（GB）
                    use_size: "", //已用空间（GB）
                    store_usage: "", //存储使用率
                    start_time: "2019-10-28 04:22:15", //启动时间
                    run_time: "", //运行时间
                    recv_rate: "", //接收速率（b/s）
                    send_rate: "", //发送速率（b/s）
                    cpu_usage: "", //CPU占用率
                    memory_use: "", //内存占用大小（MB）
                    memory_left: "", //剩余内存大小
                    wait: "", //I/O等待
                    disk_num: 0, //磁盘数量
                    slot_num: 0, //槽位数量
                    current_baddisk: 0, //坏盘数量
                    history_baddisk: 0, //历史坏盘数
                    history_baddisk_rate: "", //历史坏盘率
                    node_status: "", //节点在线状态0不在线1在线
                    systemdisk_usage: "", //系统盘空间占用率
                    ssd_waer_status: 0, //SSD磨损状态0-10磨损情况加重
                    card_num: 0, //网卡数量
                    card_exption_num: 0, //网卡异常数量
                    read_rate: "", //磁盘读取速率（MB/S）
                    write_rate: "",  //磁盘写入速率（MB/S）
                    connect_num: "",  //连接数
                    power_status: "", //电源状态 用百分比表示
                    fan_status: "", //风扇状态 用百分比表示
                    node_type: "", //元数据节点类型-----
                    is_copy: 0, //是否副本模式-----
                    is_delete_code: 0, // 是否纠删码模式-----
                    raid: "", //raid方式-----
                    protocol_type: "", //协议类型-----
                    creator: "", //创建者
                    // createdate: "2019-10-28 04:22:15", //创建时间
                },
                addNodesRules: {
                    node_id: [
                        { required: true, message: '节点编号不能为空', trigger: 'blur' }
                    ],
                    node_name: [
                        { required: true, message: '节点名称不能为空', trigger: 'blur' }
                    ],
                    ip: [
                        { required: true, message: 'ip地址不能为空', trigger: 'blur' }
                    ],
                    store_area_id:[
                        { required: true, message: '所属域不能为空', trigger: 'blur' }
                    ]
                },
                //table
                nodesCloumns: [
                    {
                        title: '节点编号',
                        key: 'node_id',
                        width: 100
                    },
                    {
                        title: '节点名称',
                        key: 'node_name',
                        width: 100
                    },
                    {
                        title: 'ip地址',
                        key: 'ip',
                        width: 200
                    },
                    {
                        title: '所属存储域',
                        key: 'store_area_id',
                        width: 100
                    },
                    {
                        title: '总空间大小(GB)',
                        key: 'total_size',
                        width: 150
                    },
                    {
                        title: '已用空间（GB）',
                        key: 'use_size',
                        width: 150
                    },
                    {
                        title: '存储使用率(%)',
                        key: 'store_usage',
                        width: 150
                    },
                    {
                        title: 'CPU占用率(%)',
                        key: 'cpu_usage',
                        width: 150
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                nodesDataLsit: [],
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
                addNodesModal: false,
            }
        },
        methods: {
            //查询 form
            handleSubmit (name) { this.getNodesList(); },
            openaddNodesModal () {  this.addNodesModal = true; },
            //详情
            showDetail (index,row) {
                this.detailModal = true;
                this.saveInfoData = [];
                Util.ajaxMethod('GET', '/api/cscpNode/getCscpNodeSet', {node_id: row.node_id}).then((res) => {
                    if(res){
                        for(let key in res){
                            this.saveInfoData.push({nameKey: key, value: res[key]});
                        }
                        this.drawPie(res.memory_usage, res.memory_use);
                    }
                }).catch((error) => {
                    this.$Message.info('获取详情失败，请重新获取');
                })
            },
            drawPie (memory_usage,memory_use) {
                let myChart = this.$echarts.init(this.$refs.savePie);
                let option = {
                    title: {
                        text: '当前内存占比统计',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                    },
                    series: [
                        {
                            name: '内存使用情况',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '60%'],
                            data: [
                                {value: memory_use, name: '已使用'},
                                {value: memory_usage - memory_use, name: '未使用'},

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
            //选择启动时间
            selectStartDate(date){ this.addNodesForm.start_time = date; },
            //点击分页
            selectPage(page){
                this.currentPage = page;
                this.getNodesList();
            },
            //添加存储域
            handleAdd(name) {
                this.$refs[name].validate((valid) => {
                    if(valid){
                        Util.ajaxMethod('POST', '/api/cscpNode/save', this.addNodesForm).then((res) => {
                            if(res){
                                this.getNodesList();
                                this.addNodesModal = false;
                            }
                        }).catch((error) => {
                            this.$Message.info('添加节点失败，请重新添加');
                        })
                    }
                })
            },
            //删除
            remove (index , row) {
                Util.ajaxMethod('DELETE', '/api/cscpNode/delete/' + row.node_id).then((res) => {
                    this.getNodesList();
                }).catch((error)=>{
                    this.$Message.info('删除节点失败');
                })
            },
            //获取存储域列表
            getNodesList(){
                Util.ajaxMethod('GET', '/api/cscpNode/search',{page: this.currentPage,size:this.pageSize}).then((res) => {
                    if(res){
                        this.total = res.recordsTotal;
                        this.nodesDataLsit = res.data;
                        this.clearaddNodesForm();
                    }
                }).catch((error)=>{
                    this.$Message.info('获取节点列表失败，请重新获取');
                })
            },
            // handleSelectAll(status) { this.$refs.selection.selectAll(status);},
            //清除添加表单addNodesForm
            clearaddNodesForm() {
                this.addNodesForm = {
                    node_id: "",
                    node_name: "",
                    ip: "",
                    store_area_id: "",
                    total_size: "",
                    use_size: "",
                    store_usage: "",
                    start_time: "",
                    run_time: "",
                    recv_rate: "",
                    send_rate: "",
                    cpu_usage: "",
                    memory_use: "",
                    memory_left: "",
                    wait: "",
                    disk_num: 0,
                    slot_num: 0,
                    current_baddisk: 0,
                    history_baddisk: 0,
                    history_baddisk_rate: "",
                    node_status: "",
                    systemdisk_usage: "",
                    ssd_waer_status: "",
                    card_num: 0,
                    card_exption_num: 0,
                    read_rate: "",
                    write_rate: "",
                    connect_num: "",
                    power_status: "",
                    fan_status: "",
                    node_type: "",
                    is_copy: 0,
                    is_delete_code: 0,
                    raid: "",
                    protocol_type: "",
                    creator: "",
                    createdate: "",
                }
            },
            //重置表单
            resetForm(name){  this.$refs[name].resetFields(); }
        },
        mounted () {
            this.getNodesList();
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/common.less";
    .nodesManage {
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
    }

</style>