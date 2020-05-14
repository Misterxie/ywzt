/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import authority from './modules/authority';
import app from './modules/app';
import user from './modules/user';
import 'url-search-params-polyfill';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user,
        authority,
    }
});

export default store;
