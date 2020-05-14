/* eslint-disable */
/**
 * Created by superman on 2016/12/2.
 */
import util from '@/libs/util.js';
// 使用代理
// const serverHost = process.env.NODE_ENV === 'production' ? 'http://192.9.99.91:7100' : 'http://192.9.99.91:7100';
// const serverHost = process.env.NODE_ENV === 'production' ? 'http://www.wangyuhao.top:7100' : 'http://www.wangyuhao.top:7100';
// const HOST = process.env.NODE_ENV === 'production' ? 'http://www.wangyuhao.top:7100' : 'http://www.wangyuhao.top:7100';
// const HOST = process.env.NODE_ENV === 'production' ? 'http://192.9.99.91:7100' : 'http://192.9.99.91:7100';

//const serverHost = process.env.NODE_ENV === 'production' ? 'http://localhost:9000' : 'http://localhost:9000';
const serverHost = util.baseUrl;


export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        util.ajax.get(url, params)
            .then(response => {
                resolve(response.data);
            })
    })
}
export function post(url, params) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        util.ajax.post(url, params).then(response => {
            console.log(response); 
            res(response.data);
        }).catch((error)=>{
            console.log(error)
            console.log(error.data)
            reject(error);
        });
    })
}

export function loginAction(form) {
    // let pswd = util.encryptPassword(form.password);//对密码进行加密
    return post('/user/login',{'username' : form.userName , 'password': form.password , 'validCode': form.validCode, 'code':'wyjx', 'rememberme': localStorage['rememberme']});
}

/*
export function roleListAction(cond) {
    return new Promise((resolve, reject) => {
        var url = serverHost + '/api/system/json/resultJSONDtoSQL.action';
        // var p = { sqlName: sqlName, params: params, start: start, length: length };
        var p = new URLSearchParams();
        p.append('sqlName', cond.sqlName);
        p.append('params', cond.params);
        p.append('start', cond.start);
        p.append('length', cond.length);
        // console.log(p);
        util.ajax.post(url, p)
            .then(response => {
                // console.log(response.data);
                resolve(response.data);
            })
    })

    //return fetch(serverHost + '/json/resultJSONDtoSQL.action', { sqlName: 'system.rolesQuery', params: cond.value + '###1#@#' + cond.value + '###1', start: cond.start, length: cond.length });
}
*/
/*
export function pageSqlAction(sqlName, params, start, length) {
    return new Promise((resolve, reject) => {
        console.log("@@@@@@@@@@@@@ in project @@@@@@@@@@@@@@@@")
        var url = serverHost + '/api/system/json/resultJSONDtoSQL.action';
        // var p = { sqlName: sqlName, params: params, start: start, length: length };
        var p = new URLSearchParams();
        p.append('sqlName', sqlName);
        p.append('params', params);
        p.append('start', start);
        p.append('length', length);
        // console.log(p);
        util.ajax.post(url, p)
            .then(response => {
                // console.log(response.data);
                resolve(response.data);
            })
    })
}
*/
/*
export function postMetaData(tableId, values, method) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        var url = serverHost + '/api/system/json/saveMetaObject.action';
        var p = new URLSearchParams();
        p.append('tableId', tableId);
        for (var i = 0; i < values.length; i++) {
            p.append('values', values[i]);
        }
        p.append('method', method);
        util.ajax.post(url, p).then(response => { res(response.data) });
    })
}
*/
export function postMetaDataUpdate(updateUrl, values) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        var url = serverHost + updateUrl;
        var p = new URLSearchParams();
       // p.append('tableId', tableId);
        for (var i = 0; i < values.length; i++) {
            p.append('values', values[i]);
        }
        //p.append('method', method);
        util.ajax.post(url, p).then(response => { res(response.data) });
    })
}

export function menuByRole(roleId) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        var url = '/api/system/menu/queryByRoleId';
        var p = new URLSearchParams();
        p.append('roles', roleId);

        util.ajax.post(url, p).then(response => {
            console.log(response.data);
            var items = response.data.items;
            for (var i = 0; i < items.length; i++) {
                setItem(items[i]);
            }
            res(items)
        })
    })
}

function setItem(item) {
    // console.log("#$$$$$$$$$$$$$$$$$$$$$$");
    // console.log(item);
    // console.log("###" + (item.hasPermission == true && item.permissions != null) + "####");
    if (item.hasPermission == true && item.permissions != null) {
        for (var i = 0; i < item.permissions.length; i++) {
            item.permissions[i].type = "permission";
            item.permissions[i].title = item.permissions[i].name + "(button2)";
            item.permissions[i].checked = item.permissions[i].select;
        }
        item.children = item.permissions;
        return;
    }

    if (item.items != null && item.items.length > 0) {
        item.children = item.items;
        for (var i = 0; i < item.items.length; i++) {
            setItem(item.items[i]);
        }
    }
    item.type = "menu";
}

export function saveMenuByRole(roleId, menus, permissions) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        var url = serverHost + '/api/system/menu/save';
        
        var p = new URLSearchParams();
        p.append('roles', roleId);
        p.append('menus', menus);
        p.append('permissions', permissions);

        util.ajax.post(url, p).then(response => {
            res(response.data);
        })
    })
}

export function ajaxMethodWidthParams(url, method, params) {
    return new Promise((resolver, reject) => {
        var res = resolver;
        util.ajax({
            method: method,
            url: url,
            data: params
        }).then(response => {
            res(response.data);
        });
    })
}


// roleListAction({ sqlName: 'system.rolesQuery', params: '' + '###1#@#' + '' + '###1', start: 0, length: 10 }).then(data => {
//     console.log("###############")
//     console.log(data);
// });
