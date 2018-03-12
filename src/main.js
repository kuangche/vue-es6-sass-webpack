/**
 * Created by jige on 2016/11/21.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import routes from './routes'
import store from './store/store'
import App from './App.vue';
import * as utils from './common/utils';

//开发环境加载mock数据
if(process.env.NODE_ENV == 'development'){
    require('./common/mockData');
}

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.utils = utils;

//创建router实例，然后传入routers配置
const router = new VueRouter({
    routes
});


//注册一个全局的 before 钩子,管理用户登录跳转
router.beforeEach(({meta,path}, from, next) => {
    const rememberMe = utils.Tools.getCookie('rememberMe');
    const userId = utils.Tools.getCookie('userId');
    const userName = utils.Tools.getCookie('userName');

    if(!utils.Tools.isEmpty(userId) && !utils.Tools.isEmpty(userName)){
        if((rememberMe == 'true' && path == '/login') || (rememberMe == 'true' && path == '/')){
            return next({path: '/manage'});//更换成自己的主页
        }
    }else if(path != '/login') {
        return next({path: '/login'});
    }
    next();
})

//创建和挂载根实例，通过 router 配置参数注入路由
new Vue({
    router,
    store,
    components: {
        App
    },
    template: `<App/> `
}).$mount('#container')
