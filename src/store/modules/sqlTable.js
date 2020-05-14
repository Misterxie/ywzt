/* eslint-disable */

import { pageSqlAction } from '../api/api';

const state = {
    pageData: { ajax: {}, cols: [], data: [], page: { start: 0, limit: 15, totao: 0 } }
}

const getters = {
    ctsiTablePageData: function(state) { return state.pageData; }
}

const actions = {
    fetchCtsiTableData(context, payload, isnew) {
        console.log("########## payload this in project ##########");
        console.log(payload);
        if (isnew) {
            state.page.start = 0;
            payload.start = 0;
        }
        pageSqlAction(payload.sqlName, payload.params, payload.start, payload.length)
            .then(data => {
                //data.type = payload.type;
                console.log("########### result ########");
                console.log(data);
                var page = { start: payload.start, limit: payload.length, total: data.recordsTotal }
                data.page = page;
                return context.commit('fetchCtsiTableData', data)
            });
    }
};

const mutations = {
    fetchCtsiTableData(state, data) {
        state.pageData = data;
        console.log(state.pageData)
    }
};



export default {
    state,
    getters,
    mutations,
    actions
}
