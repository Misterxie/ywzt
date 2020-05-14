<template>
    <div class="deviceAlarmManage hasAllheight ivu-row-flex-center">
        <div style="height:400px;overflow: auto;margin-left: 20%;">
            <Form ref="addNodesForm" :model="addNodesForm" :rules="addNodesRules" :label-width="120" class="ivu-form ivu-form-label-right">
                <Col :span="14">
                    <FormItem label="用户名" prop="account">
                        <Input placeholder="输入用户名" v-model="addNodesForm.account"></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="输入密码" prop="password">
                        <Input  placeholder="输入用户密码" v-model="addNodesForm.password" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="确认密码" prop="checkpassword">
                        <Input  placeholder="确认密码" v-model="addNodesForm.checkpassword" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="选择场景" prop="type">
                        <Select placeholder="选择场景" v-model="addNodesForm.type">
                            <Option value="1">乡镇</Option>
                            <Option value="2">校园</Option>
                            <Option value="3">小区</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Form>
        </div>
        <div slot="footer">
            <i-button class="btn_style1 ivu-col-offset-15" size="large" @click.native="resetForm('addNodesForm')">重置</i-button>
            <i-button class="btn_style2" size="large"  @click.native="handleAdd('addNodesForm')">提交</i-button>
        </div>
    </div>
</template>

<script>
    import Util from '@/libs/util.js';
    import $ from 'jquery';
    import crypto from 'crypto';
    export default {
        name: 'SpacePoint',
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入确认密码"));
                } else if (value !== this.addNodesForm.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                //searchform
                searchFormValidate: {
                    name: ''
                },
                searchRuleValidate: { },
                alarmList: [
                ],
                total: 0,
                pageSize: 15,
                currentPage: 1,
                //addFrom
                addNodesForm: {
                    account: "", //用户名
                    password: "", //用户密码
                    type: "", //场景类型
                },
                addNodesRules: {
                    account: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        {
                            pattern: /^[\w!@#$%^&*.]{6,18}$/,
                            message: "用户名至少6个字符,最多18个字符(只支持英文)"
                        }
                    ],
                    password: [
                        { required:  true, message: '请输入密码', trigger: 'blur'},
                        {
                            pattern: /^[\w!@#$%^&*.]{6,16}$/,
                            message: "密码范围在6~16位之间"
                        }
                    ],
                    checkpassword: [
                        { required: true, trigger: 'blur', validator: validatePass},
                    ],
                    type: [
                        { required: true, message: '场景类型不能为空', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            //提交添加用户
            handleAdd(addNodesForm){
                const md5 = crypto.createHash('md5');
                this.$refs.addNodesForm.validate(valid => {
                    if (valid) {
                        md5.update(this.addNodesForm.password);
                        var pwd = md5.digest('hex');
                        Util.ajaxMethod('POST', '/api/user/', 
                            {
                                account:this.addNodesForm.account,
                                password: pwd,
                                type: this.addNodesForm.type
                            }
                        ).then((res) => {
                            if(res.retCode == 0){
                                this.$router.push({name: 'SpaceUserManage'})
                            } else if(res.retCode == 1){
                                this.$Message.info(res.retDesc);
                            }
                        }).catch((error)=>{
                            this.$Message.info('添加用户失败，请重新添加');
                        })    
                    }
                })
            },
            //清除添加表单addFormValidate
            clearSetAlarmForm() {
                this.setAlarmForm = {
                    account: "", 
                    password: "", 
                    type: ""
                }
            },
            //重置表单
            resetForm(name){  this.$refs[name].resetFields(); }

        },
        mounted () {
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
</style>