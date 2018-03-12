/**
 * Created by jige on 2016/12/23.
 */
import Vue from 'vue';
import axios from 'axios'
import Tools from './Tools';
const moment = require('moment');
const config = require('../../config');

/**
 * 注册一个全局自定义指令 v-focus
 */
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})

/**
 * 公共工具类----业务相关
 */
class MlTools {
    //本地开发端口8888
    static staticUrl = window.location.port == 8888 ? './':config.staticUrl;

    static baseUrl = window.location.port == 8888 ? './':config.baseUrl;

    /**
     * 栅格系统，被分成多少行列
     * W:水平方向分成24列
     * H:垂直方向分成24行
     * @type {{W: number, H: number}}
     */
    static grid = {
        W:48,
        H:48
    }

    /**
     * 退出账户时，删除当前账户下保存的cookie
     */
    static delUser() {
        Tools.delCookie('userId');
        Tools.delCookie('userName');
        Tools.delCookie('JSESSIONID');
        Tools.delCookie('rememberMe');
    }
    /**
     * 封装全局ajax
     * @param param
     */
    static ajax(param) {
        if (param.type === 'post') {
            axios({
                method: 'post',
                url:this.baseUrl + param.url,
                data:param.data
            }).then((res) => {
                const result = typeof(res.data) =='object' ? res.data : JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                const error = typeof(err.data) =='object' ? err.data : JSON.parse(err.data);
                param.error(error.message);
            })
        } else if (param.type === 'get') {
            axios({
                method: 'get',
                url:this.baseUrl + param.url
            }).then((res) => {
                const result = typeof(res.data) =='object' ? res.data : JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                const error = typeof(err.data) =='object' ? err.data : JSON.parse(err.data);
                param.error(error);
            })
        }
    }
}

export default MlTools;
