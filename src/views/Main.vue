<style lang="less">
@import "./main.less";
@import "../styles/common.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con scrollbar-thumb" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}" style="height:calc(100% - 60px);">
            <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <!--<img v-show="!shrink" src="../images/logo.png" key="max-logo" />-->
                    <!--<img v-show="shrink" style="width:40px;height:40px;margin-left:0;" src="../images/logo-min.png" key="min-logo" />-->
                </div>
                <div slot="top" class="homePageTab" :class="{homeActiveStyle:homeActive,shrinkHomePageTab:this.shrink}" @click="linkToHome()" @mouseover="handleHomeMouseOver()">
                    <i class="iconfont icon-zhuye" :style="{fontSize:!this.shrink?'14px':'20px',color:!this.shrink?'hsla(0,0%,100%,.7)':'#fff',marginRight:!this.shrink?'8px':'0px'}"></i>
                    <span v-if="!this.shrink" >登录日志</span>
                    <!--ivu-icon ivu-icon-md-key-->
                </div>
            </shrinkable-menu>
            <div class="navicon-con" style="position:absolute;bottom:10px;right:10px;">
                <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                    <Icon type="ios-menu" size="32"></Icon>
                </Button>
            </div>
        </div>
        <div  class="main-header-con" :style="{paddingLeft: shrink?'0px':'0px',height:'60px'}" >
            <div class="main-header" style="background:#515a6e">
                <div  class="header-logo">
                    <img  src="../images/-s-logo.png" key="max-logo" style="margin-top:9px;float:left;width:360px;height:60px line-height: 60px;"/>
                </div>
                <div class="header-middle-con" style="display:none;">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!--<full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>-->
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)" style="color:#fff">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="md-arrow-dropdown" ></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!--<DropdownItem name="selfDetail">个人信息</DropdownItem>-->
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <!--<img :src="avatorPath" style="width:32px;height:32px;background: #619fe7;margin-left: 10px;border-radius:50%;">-->
                            <!--background: #619fe7-->
                            <img src="../images/-s-touxiang.png"  style="width:32px;height:32px;;margin-left: 10px;border-radius:50%;"/>
                            <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con" style="height:0;">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>

        <div ref="singlePageCon" class="single-page-con scrollbar-thumb" :style="{left: shrink?'60px':'200px',top:'60px',background:'#eef1f7'}">
            <div class="single-page ">
                <keep-alive :include="cachePage">
                    <router-view ></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import shrinkableMenu from "./components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./components/tags-page-opened.vue";
import breadcrumbNav from "./components/breadcrumb-nav.vue";
import fullScreen from "./components/fullscreen.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import $ from 'jquery';
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
  },
  data() {
    return {
      shrink: false,
      userName: "Admin",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      tokenInterval: null,
      homeActive: false,
    };
  },
  computed: {
    menuList() {
      // console.log(this.$store.state)
      let menuList = this.$store.state.app.menuList;
      let list = [menuList[1],menuList[2],menuList[3],menuList[4],menuList[0]];
      return list;
      // return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    }
  },
  methods: {
    pushVue() {
      this.$router.push({
        name: "user-management"
      });
    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
        // $(window).trigger("resize");
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        Cookies.set("user", "");
        Cookies.set("username", "");
        Cookies.set("userId", "");
        this.$router.push({
          name: "login"
        });
      } else if (name === "selfDetail") {
        util.openNewPage(this, "selfEdit");
        var userId = localStorage.userId;
        console.log("@#@#@#@#@#@#@#");
        console.log(userId);
        this.$router.push({
          name: "selfEdit",
          params: {
            id: userId
          }
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name == name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
    },
    beforePush(name) {
      return true;
    },
    fullscreenChange(isFullScreen) {
    },
    refreshToken() {
      this.$util.ajaxMethodWidthParams(this.$util.baseUrl + '/api/system/refreshToken?rememberme='+localStorage['rememberme'], 'get', {})
        .then((response) => {
          // console.log(response);
          localStorage.token = response.token;
        }).catch((error) => {
           console.log(error.response);
        });
    },
      linkToHome() {
          this.$router.push('/home');
          this.homeActive = true;
      },
      handleHomeMouseOver(){
        if(!this.shrink){

        }
      }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
      if(to.name !== 'home_index') {
          this.homeActive = false;
      }

    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
    if(this.$route.name === 'home_index'){
        this.homeActive = true;
    }
  },
  created() {
      // 显示打开的页面的列表
      this.$store.commit("setOpenedList");

      if (this.$ctsiComponents) {
        if(!sessionStorage.lastAjaxTime){
          sessionStorage.lastAjaxTime = new Date().getTime();
        }
        this.tokenInterval = setInterval(() => {
          if(new Date().getTime() - sessionStorage.lastAjaxTime > 30 * 60 * 1000){
            //如果时间间隔为半小时，停止刷新token
            clearInterval(this.tokenInterval);
          }else{
            this.refreshToken();
          }
        }, 60000);
      }
  },
  updated() {
  	if(this.$route.name !== 'login'){
      sessionStorage.currentRouteName = this.$route.name;
    }
  },
    beforeRouteLeave(to, from, next)  {
        if(to.name === 'login'){
            clearInterval(this.tokenInterval);
            console.log('清除tokenInterval');
        }
        next();
    }
};
</script>
