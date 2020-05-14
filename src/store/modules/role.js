/* eslint-disable */
import Cookies from 'js-cookie';
import { roleListAction } from '../api/api';

const user = {
    state: {
        roleList: [],
        rolePage: { start: 0, limit: 15, total: 0 }
    },
    mutations: {},
    actions: {
        roleList({ commit }, form) {
            // console.log(form);
            return roleListAction(form).then(data => {
                console.log("in action call back");
                return data; //这个是下一个then传入的参数
            })
        }
    }
};

export default user;
