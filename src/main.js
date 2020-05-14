/* eslint-disable */
import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/system-router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from 'axios';
import Cookies from 'js-cookie';
import CtsiButton from './views/components/ctsi-button.vue';
import CtsiDicSelect from './views/components/ctsi-dic-select.vue';
import './styles/selfIcon/iconfont.css'

import JSEncrypt from 'jsencrypt';
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

axios.defaults.withCredentials=true;

Vue.use(VueI18n);
Vue.use(iView);

window.addEventListener('beforeunload', e => {
    localStorage.isFresh = true;
});

Vue.component('ctsi-button', CtsiButton);
Vue.component('ctsi-dic-select', CtsiDicSelect);

Vue.prototype.$util = util;

export let vm = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');

        //初始化菜单
        if (!this.$ctsiComponents) {
            this.$store.commit("updateMenulist", []);
        }
    },
    created() {
        //************************************* */
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});