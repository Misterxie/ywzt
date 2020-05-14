/* eslint-disable */
import Cookies from 'js-cookie';
import { loginAction,  isHasPermission} from '../api/api';

const user = {
    state: {},
    mutations: {
        logout(state, vm) {
            Cookies.remove('user');
            // Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
    },
    actions: {
        login({ commit }, form) {
            // console.log(form);
            return loginAction(form).then(data => {
                console.log("in action call back");              

                return data; //这个是下一个then传入的参数
            })
        },
    }
};

export default user;
