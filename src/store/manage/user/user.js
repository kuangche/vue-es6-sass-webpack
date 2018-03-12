/**
 * Created by jige on 2016/11/23.
 */

import * as utils from '../../../common/utils';
const state = {
    pageNo: 1,
    pageSize: 10,
    total: null,
    searchTxt: '',
    userList: null,
}
const mutations = {
    SET_PAGE_NO_USER_MANAGE (state, pageNo) {
        state.pageNo = pageNo;
    },
    SET_PAGE_SIZE_USER_MANAGE (state, pageSize) {
        state.pageSize = pageSize;
    },
    SET_PAGE_TOTAL_USER_MANAGE (state, total) {
        state.total = total;
    },
    SET_USER_LIST_USER_MANAGE (state, userList) {
        state.userList = userList;
    },
}
const actions = {
    getListUser: ({ commit }, data)=> {
        return new Promise((resolve, reject) => {
            utils.MlTools.ajax({
                url: '/user/getUserList',
                type: 'post',
                data: {
                    userId: data.userId,
                    pageNo: data.pageNo,
                    pageSize: data.pageSize,
                    searchTxt: data.searchTxt,
                },
                success(data){
                    if(data.statusCode == 200){
                        const userList = data.bodyData.bodyData;
                        const total = data.bodyData.total;
                        commit('SET_USER_LIST_USER_MANAGE', userList);
                        commit('SET_PAGE_TOTAL_USER_MANAGE', total);
                        resolve(userList)
                    }else if(data.statusCode == 300){
                        reject(data.message)
                    }
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    delUser: ({commit}, userId) => {
        return new Promise((resolve, reject) => {
            utils.MlTools.ajax({
                url: '/user/delUser',
                type: 'post',
                data: {
                    userId: userId
                },
                success(data){
                    if(data.statusCode == 200){
                        resolve(data)
                    }else if(data.statusCode == 300){
                        reject(data.message)
                    }
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    setPageNoUser: ({commit}, pageNo) => {
        commit('SET_PAGE_NO_USER_MANAGE', pageNo)
    },
    setPageSizeUser: ({commit}, pageSize) => {
        commit('SET_PAGE_SIZE_USER_MANAGE', pageSize)
    }
}
export default {
    state,
    mutations,
    actions
}