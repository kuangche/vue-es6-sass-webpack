/**
 * Created by jige on 2016/11/23.
 */
import * as utils from '../../common/utils';
const state = {
    user: {
        id: utils.Tools.getCookie('userId'),
        name: utils.Tools.getCookie('userName'),
    },
    rememberMe: utils.Tools.getCookie('rememberMe') == null ? false : utils.Tools.getCookie('rememberMe')
}
const mutations = {
    SIGNIN_USER(state, user) {
        state.user = user;
    },
    REMEMBER_USER(state, rememberMe) {
        state.rememberMe = rememberMe;
    },
}
/*
 * 登录接口
 *  useId、userName都是该接口写到cookie里面的
 *  使用时 需要从cookie里面获取
 * */
const actions = {
    signIn: ({ dispatch, commit }, data)=> {
        return new Promise((resolve, reject) => {
            utils.MlTools.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: data.username,
                    password: data.password,
                    rememberMe: data.rememberMe
                },
                success(data){
                    if (data.statusCode == 200) {//正常登录
                        const userId = utils.Tools.getCookie('userId');
                        const userName = utils.Tools.getCookie('userName');
                        commit('SIGNIN_USER', {
                            id: userId,
                            name: userName
                        });
                        resolve(data)
                    }else if(data.statusCode == 300){//登录异常
                        reject(data.message)
                    }
                },
                error(err){//登录失败
                    reject(err.message)
                }
            })
        })
    },
    rememberChange({commit}, rememberMe){
        commit('REMEMBER_USER', rememberMe);
    },
}
export default {
    state,
    mutations,
    actions
}