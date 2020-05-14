/* eslint-disable */

import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import { vm } from '@/main.js';

let util = {

};

util.permissionSwitch = true;

util.title = function (title) {
    title = title || '智能视频云业务中台';
    window.document.title = title;
};

//密码加密公钥，为空时不加密
const rsaPubKey = "";
// http://122.224.82.76:28181/storage_yw
// http://122.224.82.77:8989
const ajaxUrl = process.env.SERVER_BASEURL ? process.env.SERVER_BASEURL :
    env === 'development' ? 'http://122.224.82.77:8989/znspy' : env === 'production' ? 'http://122.224.82.77:8989/znspy' : 'http://122.224.82.77:8989/znspy';
// env === 'development' ? 'http://127.0.0.1:9000/storage_yw' : env === 'production' ? 'http://127.0.0.1:9000/storage_yw' : 'http://127.0.0.1:9000/storage_yw';
// http://122.224.82.76:8989
// env === 'development' ? 'http://localhost:9000' : env === 'production' ? 'http://localhost:9000' : 'http://localhost:9000';
// const ajaxUrl = env === 'development' ? 'http://192.9.99.92:7013' : env === 'production' ? 'http://192.9.99.92:7013' : 'http://192.9.99.92:7013';

const statisticUrl = process.env.STATISTIC_URL ? process.env.STATISTIC_URL : 'https://s.ctbiyi.com/img';

const userName = 'jht150817';

const projectName = 'storage_yw';

util.baseUrl = ajaxUrl;

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.ajax.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.token;
    return config;
}, function (error) {
    // 请求失败的处理
    return Promise.reject(error);
});

util.ajax.interceptors.response.use(function (res) {
    //在这里对返回的数据进行处理403
    
    if(!res.config.url.includes('refreshToken')){
        //记录ajax调用的时间
        sessionStorage.lastAjaxTime = new Date().getTime();
    }
    return res;
}, function (error) {
    //Do something with response error
    if (error.response.data.status == 401) {
        if(vm.$route.name !== 'login'){
            vm.$Notice.warning({
                title: vm.$t('身份认证信息已失效，请重新登录。'),
                desc: "",
                duration: 3
            });
            vm.$router.push({
                name: 'login'
            });
        }
    }else{
        if (error.response.data.status == 403){
            vm.$Notice.warning({
                title: error.response.data.message,
                desc: "",
                duration: 3
            });
        }
    }
    return Promise.reject(error);
})

util.ajaxMethodWidthParams = function (url, method, params) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        util.ajax({
            method: method,
            url: url,
            data: params
        }).then(response => {
            res(response.data);
        }).catch((error) => {
            reject(error);
        });
    })
};

util.ajaxGetData = function (url, params) {
    return new Promise((resolve, reject) => {
        var p = new URLSearchParams();
        for (var key in params) {
            p.append(key, params[key]);
        }
        util.ajax.post(url, p)
            .then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
    })
}

util.ajaxMethod = function (method, url, params, headers) {
    let Params = {};
    let Data = {};
    let reg1 = new RegExp("^(G|g)(E|e)(T|t)$");
    let reg2 = new RegExp("^(D|d)(E|e)(L|l)(E|e)(T|t)(E|e)")
    if (reg1.test(method) || reg2.test(method)) {
        Params = params;
    } else {
        Data = params;
    }
    return new Promise((resolve, reject) => {
        util.ajax({
            method: method,
            url: url,
            params: Params,
            data: Data,
            headers: headers || {}
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
	return (targetArr.indexOf(ele) >= 0);
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess == 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess == currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    let routerObj = null;
    for (let item of routers) {
        if (item.name == name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title == 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name == name) {
                title = util.handleTitle(vm, item);
                if (item.name == 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name == name) {
                    title = util.handleTitle(vm, child);
                    if (item.name == 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name == 'home_index') {
        currentPathArr = [{
            title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
            path: '',
            name: 'home_index'
        }];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [{
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name == name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name == name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        // console.log(currentPathObj);
        if (currentPathObj.children.length <= 1 && currentPathObj.name == 'home') {
            currentPathArr = [{
                title: '首页',
                path: '',
                name: 'home_index'
            }];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [{
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name == name;
            })[0];
            currentPathArr = [{
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name == pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            /*if (item.children && false) {//这里是为了解决点击用户管理没有在tag栏显示的问题，主要是因为用户管理返回的数据带了children属性造成的
                return name == item.children[0].name;
            } else {
                return name == item.name;
            }*/
             return name == item.name;
        });
        tag = tag[0];
        if (tag) {
            //这里是为了解决点击用户管理没有在tag栏显示的问题，主要是因为用户管理返回的数据带了children属性造成的
            //目前这个只是针对user-management特定的临时解决方案，没有通用性
            //tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name == name && routers[i].children && routers[i].redirect == undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    util.ajax.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

util.setFormItemValue = function (targetArray, from) {
    for (var key in from) {
        for (var i = 0; i < targetArray.length; i++) {
            if (targetArray[i].props == key) {
                targetArray[i].value = from[key];
            }
        }
    }
};
util.findFormItemValue = function (formItems, prop) {
    for (var i = 0; i < formItems.length; i++) {
        if (formItems[i].props == prop) {
            return formItems[i].value;
        }
    }
    return null;
};
util.closeRoute = function (vueObject, routeName, nextRouteName) {
    let pageOpenedList = vueObject.$store.state.app.pageOpenedList;
    let lastPageObj = pageOpenedList[0];
    let len = pageOpenedList.length;
    for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].name == routeName) {
            if (i < (len - 1)) {
                lastPageObj = pageOpenedList[i + 1];
            } else {
                lastPageObj = pageOpenedList[i - 1];
            }
            break;
        }
    }

    vueObject.$store.commit('removeTag', routeName);
    vueObject.$store.commit('closePage', routeName);
    pageOpenedList = vueObject.$store.state.app.pageOpenedList;
    localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    //vueObject.$router.push({ name: nextRoute });
    /**
     * 问题：调用该函数关闭当前页面,无法通过路由传参，导致目标页面无法正确刷新
     * 修改：注释掉代码vueObject.$router.push({ name: nextRoute });
     * 增加以下代码(参考了tag-page-opened.vue的closePage函数)
     */
    for (let i = 1; i < pageOpenedList.length; i++) {
        if (pageOpenedList[i].name == nextRouteName) {
            lastPageObj = pageOpenedList[i];
            break;
        }
    }
    let routerObj = {};
    routerObj.name = lastPageObj.name;
    if (lastPageObj.argu) {
        routerObj.params = lastPageObj.argu;
    }
    if (lastPageObj.query) {
        routerObj.query = lastPageObj.query;
    }
    console.log(routerObj)
    vueObject.$router.push(routerObj);
}

util.querySqlAction = function (queryUrl, params, start, length) {
    return new Promise((resolve, reject) => {
        console.log("@@@@@@@@@@@@@ in project @@@@@@@@@@@@@@@@")
        var url = util.baseUrl + queryUrl;
        var p = new URLSearchParams();
        p.append('params', params);
        p.append('start', start);
        p.append('length', length);
        util.ajax.post(url, p)
            .then(response => {
                resolve(response.data);
            })
    });
}

util.pageUrlAction = function (url, params, start, length) {
    return new Promise((resolve, reject) => {
        var p = new URLSearchParams();        
        p.append('params', params);
        p.append('start', start);
        p.append('length', length);
        util.ajax.post(url, p)
            .then(response => {
                resolve(response.data);
            })
    });
}

util.pageSqlAction = function (sqlName, params, start, length) {
    return new Promise((resolve, reject) => {
        console.log("@@@@@@@@@@@@@ in project @@@@@@@@@@@@@@@@")
        var url = util.baseUrl + '/api/system/json/resultJSONDtoSQL.action';
        var p = new URLSearchParams();
        p.append('sqlName', sqlName);
        p.append('params', params);
        p.append('start', start);
        p.append('length', length);
        util.ajax.post(url, p)
            .then(response => {
                resolve(response.data);
            })
    });
}
util.putObjToArray = function (obj, objArray) {
    for (var i = 0; i < objArray.length; i++) {
        if (objArray[i].value == obj.value) {
            return;
        }
    }
    objArray.push(obj);
    return objArray;

}
util.syncArray = function (sarr, darr) {
    for (var i = 0; i < sarr.length; i++) {
        var hasObj = false;
        for (var j = 0; j < darr.length; j++) {
            if (sarr[i].value == darr[j].value) {
                hasObj = true;
            }
        }
        if (!hasObj) {
            darr.push(sarr[i]);
        }
    }
    for (var i = 0; i < darr.length; i++) {
        var hasObj = false;
        for (var j = 0; j < sarr.length; j++) {
            if (sarr[j].value == darr[i].value) {
                hasObj = true;
            }
        }
        if (!hasObj) {
            darr.splice(i, 1);
            i--;
        }
    }

}

util.isHasPermission = function(code){
    if(util.permissionSwitch){
        return localStorage['btnPermissionCode'].indexOf(code) >= 0;
    }else{
        return true;
    }
}

util.userLogout = function(){
    //清除Storage
    localStorage.clear();
    sessionStorage.clear();
}

export default util;

util.encryptPassword = function(str){
    if(rsaPubKey){
        //对密码进行加密
        let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
        encryptor.setPublicKey(rsaPubKey);  // 设置公钥
        return encryptor.encrypt(str);//加密
    }else{
        return str;
    }
}

util.statistic = function(type,name,childname){
    let img = new Image();
    img.src = statisticUrl+'?userName='+userName+'&projectName='+projectName+'&type='+type+'&componentName='+name+'&componentApiName='+childname+'&count=1'+'&s='+new Date().getTime();
    var appitem = document.querySelector('#main');
    if(appitem){
        appitem.appendChild(img);
        appitem.removeChild(img);
    }
}
