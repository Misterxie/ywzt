import Main from '@/views/Main.vue';
import util from '@/libs/util.js';

//注：这里引入私有的文件名
// import organizationManagement from '@/views/organization.vue';

let routeMap = new Map();
let xmlhttp;
let menus = [];

export let initDynamicRouter = () => {
    //注：这里进行map映射，注意key应该为对应数据中的name属性
    // routeMap.set('organization-management', organizationManagement);
    // routeMap.set('form', Main);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = onMenuResponse;
    xmlhttp.open('GET', util.baseUrl + '/api/system/cscpMenus', false);
    xmlhttp.setRequestHeader('Authorization', localStorage.token);
    xmlhttp.send(null);
    return menus;
}

function makeMenuTree(data) {
    var all = new Map();
    var menus = [];
    for (var i = 0; i < data.length; i++) {
        if (routeMap.has(data[i].name)) {
            var tmpData = new Object;
            tmpData.id = data[i].id;
            tmpData.parentId = data[i].parentId;
            tmpData.path = data[i].url;
            tmpData.title = data[i].title;
            tmpData.name = data[i].name;
            tmpData.icon = data[i].icon;
            tmpData.type = data[i].type;
            tmpData.permissionCode = data[i].permissionCode;
            tmpData.c = data[i].component;
            tmpData.component = routeMap.get(data[i].name);
            if(tmpData.type === "menu" || tmpData.type === "dir") {
                if (tmpData.parentId == 0) {
                    menus.push(tmpData);
                } else {
                    all.set(tmpData.id, tmpData);
                }

            }
        } else {
            //全局保存按钮权限数据
            if(data[i].type === "button" && data[i].permissionCode){
                if(localStorage['btnPermissionCode']){
                    localStorage['btnPermissionCode'] += data[i].permissionCode+';';
                }else{
                    localStorage['btnPermissionCode'] = data[i].permissionCode+';';
                }
            }
        }
    }
    return setToTeee(menus, all);
}

function setToTeee(menus, all) {
    all.forEach(function (value, key, map) {
        if (value.parentId != 0) {
            setToTreeLeaf(menus, value);
            all.delete(key);
        }
    });
    return menus;
}

function setToTreeLeaf(tree, node) {
    for (var i = 0; i < tree.length; i++) {
        if (tree[i].id == node.parentId) {
            if (tree[i].children == null) {
                tree[i].children = [];
            }
            tree[i].children.push(node);
            return true;
        }
        if (tree[i].children != null) {
            var children = setToTreeLeaf(tree[i].children, node);
            if (children) {
                return true;
            }
        }
    }
    return false;
}

function onMenuResponse() {
    if (xmlhttp.readyState != 4) return;
    if (xmlhttp.status != 200) {
        return;
    }

    menus = JSON.parse(xmlhttp.response);
    menus = makeMenuTree(menus);
}
