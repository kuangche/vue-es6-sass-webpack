import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/user';
import manageUser from './manage/user/user';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        user: user,
        manageUser: manageUser,
    }
})