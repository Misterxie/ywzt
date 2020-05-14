import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import { routers } from './system-router';
import store from '@/store';
import { initDynamicRouter } from './dynamic-router'

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

function addDynamicRouters() {
    try {
        let biyiAdminMenus = Vue.prototype.$ctsiComponents.initDynamicRouter();
        let selfMenus = initDynamicRouter();
        let menus = [...biyiAdminMenus, ...selfMenus];
        if(menus.length > 0){
            // 刷新界面菜单
            store.commit('updateAppRouter', menus.filter(item => item.children.length > 0));
            store.commit('updateMenulist', menus.filter(item => item.children.length > 0));
            let tagsList = [];
            store.state.app.routers.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
            store.commit('setTagsList', tagsList);
            return false;
        }else{
            return true;
        }
    } catch (error) {
        return true;
    }
}

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Vue.prototype.$ctsiComponents) {
        //加载了ctsi-sample-web组件
        if(to.name.startsWith('user')
            || to.name.startsWith('home')
            || to.name.startsWith('role')
            || to.name.startsWith('workgroup')
            || to.name.startsWith('organization')
            || to.name.startsWith('logging')
            || to.name.startsWith('work_group')
            || to.name.startsWith('login')
            || to.name.startsWith('selfEdit') ){
            Util.statistic('baseComp', "admin", to.name);//统计信息
        }
        if (to.name === 'welcome') {
            next()
        } else {
            if(localStorage.isFresh == "true") {
                let isGoToLogin = addDynamicRouters();
                localStorage.isFresh = false;
                sessionStorage.addedRouter = true;
                if(isGoToLogin){
                    next({
                        name: 'login'
                    })
                }else{
                    if(sessionStorage.currentRouteName && sessionStorage.currentRouteName!='null'){
                        next({
                            name: sessionStorage.currentRouteName
                        });
                    }else{
                        next({
                            name: 'home_index'
                        });
                    }
                }
            }else{
                if(to.name === "login"){
                    Util.userLogout();
                    next();
                }else{
                    let isGoToLogin = false;
                    if(!sessionStorage.currentRouteName){
                        if(!sessionStorage.addedRouter){
                            isGoToLogin = addDynamicRouters();
                        }
                    }
                    if(isGoToLogin){
                        next({
                            name: 'login'
                        })
                    }else{
                        if(localStorage.token){
                            next();
                        }else{
                            if(to.name === "login"){
                                Util.userLogout();
                                next();
                            }else{
                                next({
                                    name: 'login'
                                })
                            }
                        }
                    }
                }
            }
        }
    } else {
        //未加载了ctsi-sample-web组件
        if (to.path === '/') {
            next('/welcome')
        } else {
            next()
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
