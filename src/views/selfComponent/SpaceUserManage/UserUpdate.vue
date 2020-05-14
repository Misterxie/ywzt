<template>
    <div class="deviceAlarmManage hasAllheight ivu-row-flex-center">
        <div style="height:400px;overflow: auto;margin-left: 20%;" class="ivu-col-span-18">
            <Form ref="addNodesForm" :model="addNodesForm" :rules="Rules" :label-width="120" class="ivu-form ivu-form-label-right registerform" >
                <Col :span="14">
                    <FormItem label="用户名" prop="account">
                        <Input disabled v-model="this.$route.params.account" placeholder="account"></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="原密码" prop="password">
                        <Input  placeholder="请输入原密码" v-model="addNodesForm.password" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="新密码" prop="newpassword">
                        <Input  placeholder="请输入新密码" v-model="addNodesForm.newpassword" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="重复新密码" prop="checknewpass">
                        <Input  placeholder="请再次输入新密码" v-model="addNodesForm.checknewpass" type="password" password></Input>
                    </FormItem>
                </Col>
                <Col :span="14">
                    <FormItem label="选择场景" prop="type">
                        <Select placeholder="选择场景" v-model="addNodesForm.type">
                            <Option value="3">小区</Option>
                            <Option value="2">校园</Option>
                            <Option value="1">乡镇</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Form>
        </div>
        <div slot="footer">
            <i-button class="btn_style1 ivu-col-offset-15" size="large" @click.native="resetForm('addNodesForm')">重置</i-button>
            <i-button class="btn_style2" size="large"  @click.native="handleUpdate('addNodesForm')">提交</i-button>
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
                const md5 = crypto.createHash('md5');
                md5.update(value);
                var pwd = md5.digest('hex');
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (pwd !== this.$route.params.password) {
                    callback(new Error("请输入正确的原密码"));
                } else if (pwd === this.$route.params.password) {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                const md5 = crypto.createHash('md5');
                md5.update(value);
                var pwd = md5.digest('hex');
                if (value === "") {
                    callback(new Error("请输入新密码"));
                } else if(pwd === this.$route.params.password){
                    callback(new Error("新密码不可与原密码相同"));
                } else if(pwd !== ""){
                    if (this.addNodesForm.checknewpass !== "") {
                        this.$refs.addNodesForm.validateField("checknewpass");
                    }
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入新密码"));
                } else if (value !== this.addNodesForm.newpassword) {
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
                    id: "", //id
                    account: "", //用户名
                    password: "", //原密码
                    newpassword: "", //新密码
                    checknewpass: "", //确认密码
                    type: "", //场景类型
                },
                Rules: {
                    password: [
                        { required:  true, trigger: 'blur', validator: validatePass }
                    ],
                    newpassword: [
                        { required: true, trigger: 'blur', validator:validatePass2 },
                        {
                            pattern: /^[\w!@#$%^&*.]{6,16}$/,
                            message: "密码范围在为6到16位"
                        }
                    ],
                    checknewpass: [
                        { required: true, trigger: 'blur', validator: validatePass3 }
                    ],
                    type: [
                        { required: true, trigger: 'change', message: "场景类型不能为空" }
                    ]
                }
            }
        },
        methods: {
            //提交编辑用户
            handleUpdate(){
                const md5 = crypto.createHash('md5');
                this.$refs.addNodesForm.validate(valid => {
                    if (valid) {
                        md5.update(this.addNodesForm.newpassword);
                        var pwd = md5.digest('hex');
                        Util.ajaxMethod('POST', '/api/user/update', 
                            {
                                "account": this.$route.params.account,
                                "id": this.$route.params.id,
                                "password": pwd,
                                "type": this.addNodesForm.type
                            }
                        ).then((res) => {
                            if(res){
                                this.$router.push({name: 'SpaceUserManage'})
                            }
                        }).catch((error)=>{
                            this.$Message.info('编辑用户失败，请重新编辑');
                        })
                    } 
                })
            },
            //清除添加表单addFormValidate
            clearSetAlarmForm() {
                this.setAlarmForm = {
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