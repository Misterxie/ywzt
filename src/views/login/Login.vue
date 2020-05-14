<style lang="less">
    @import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>登录中...</div>
        </Spin>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="md-log-in"></Icon>欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="md-person"></Icon>
                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="16" type="md-lock"></Icon>
                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <SecurityCode
                                    :value.sync="value"
                                    :biyiCaptchaKey.sync="biyiCaptchaKey"
                                    width="260"
                                    ref="securityCode"
                            ></SecurityCode>
                        </FormItem>
                    </Form>
                    <Button @click="handleSubmit" type="primary" long>登录</Button>
                    <div style="margin-top:5px;font-size:10px;">
                        <Checkbox style="marign-top:30px;" v-model="rememberme" @on-change="setRememberMe">记住我</Checkbox>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    import iView from "iview";
    import util from "@/libs/util.js";
    import { SecurityCode } from "biyi-captcha";

    export default {
        data() {
            return {
                loading: false,
                rememberme: false,
                form: {
                    userName: "",
                    password: ""
                },
                rules: {
                    userName: [
                        { required: true, message: "账号不能为空", trigger: "blur" }
                    ],
                    password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
                },
                value: "",
                biyiCaptchaKey: ""
                //oldUserName: ''
            };
        },
        components: {
            SecurityCode: SecurityCode
        },
        methods: {
            setRememberMe(value) {
                if (value) {
                    localStorage["rememberme"] = 1;
                } else {
                    localStorage["rememberme"] = 0;
                }
            },
            handleSubmit() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        var vm = this;
                        var pswd = util.encryptPassword(this.form.password); //对密码进行加密
                        util
                            .ajaxMethod(
                                "post",
                                "/api/system/login",
                                {
                                    username: this.form.userName,
                                    password: pswd,
                                    rememberme: localStorage["rememberme"]
                                },
                                {
                                    biyiCaptchaKey: this.biyiCaptchaKey,
                                    biyiCaptcha: JSON.stringify({
                                        code: this.value
                                    })
                                }
                            )
                            .then(data => {

                                if (data.success == false) {
                                    vm.$Notice.error({
                                        title: "提示",
                                        desc: "登陆失败：" + data.msg
                                    });
                                    this.getCaptcha();
                                    iView.LoadingBar.finish();
                                    this.loading = false;
                                } else {
                                    localStorage.token = data.token;
                                    vm.$Notice.info({
                                        title: "提示",
                                        desc: "登陆成功!"
                                    });
                                    util
                                        .ajaxMethodWidthParams(
                                            util.baseUrl + "/api/system/cscpCurrentUserDetails",
                                            "GET",
                                            {}
                                        )
                                        .then(function(detail) {
                                            Cookies.set("access", 0);
                                            vm.$store.commit("setAvator", detail.imgPath);
                                            var n =
                                                (detail.familyName == null ? "" : detail.familyName) +
                                                (detail.name == null ? "" : detail.name);
                                            if (n == "") {
                                                n = vm.form.userName;
                                            }
                                            Cookies.set("user", n);
                                            Cookies.set("username", vm.form.userName);
                                            Cookies.set("userId", detail.userId);
                                            localStorage.userId = detail.userId;
                                            vm.$router.push({
                                                name: "home_index"
                                            });
                                            iView.LoadingBar.finish();
                                            vm.$Spin.hide();
                                        });
                                }
                            })
                            .catch(error => {
                                vm.$Notice.error({
                                    title: "提示",
                                    desc: "登陆失败：" + error.response.data.message
                                });
                                this.$refs.securityCode.init();
                                iView.LoadingBar.finish();
                                this.loading = false;
                            });
                    }
                });
            }
        },
        created() {
            if (!localStorage["rememberme"]) {
                localStorage["rememberme"] = 0;
            }
        }
    };
</script>

<style>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
