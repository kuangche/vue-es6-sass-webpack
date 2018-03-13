<template>
    <div class="loginCon">
        <div class="iconBg"></div>
        <div id="loginBox">
            <h3 class="header">欢迎登录</h3>
            <form>
                <div class="userName">
                    <input type="text" v-focus v-model="form.username" name="userName" @focus="focusHandle" @keyup.13="loginHandle" placeholder="请输入用户名"/>
                </div>
                <div class="passWord">
                    <input type="password" v-model="form.password" name="userName" @focus="focusHandle" @keyup.13="loginHandle" placeholder="请输入密码"/>
                </div>
                <div class="operate">
                    <span class="tips" v-if="showTips">{{tipsTxt}}</span>
                    <el-checkbox class="remember" :value="rememberMe" @change = "rememberHandle">下次自动登录</el-checkbox>
                </div>
                <span class="loginBtn" @click="loginHandle">登录</span>
            </form>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default{
        data(){
            return{
                showTips:false,
                tipsTxt:null,
                form:{
                    username:null,
                    password:null
                }
            }
        },
        computed:mapState({
            rememberMe: state => state.user.rememberMe,
            userId: state => state.user.user.id,
        }),
        methods:{
            ...mapActions({
                signIn: 'signIn',
                rememberChange: 'rememberChange',
            }),
            rememberHandle(e){
                this.rememberChange(e.target.checked);
            },
            focusHandle(){
                this.showTips = false;
                this.tipsTxt = "";
            },
            loginHandle(){
                const utils = this.utils;
                const _self = this;
                if( !utils.Tools.isEmpty(this.form.username) && !utils.Tools.isEmpty(this.form.password)){
                    this.signIn(Object.assign({},this.form,{rememberMe:this.rememberMe})).then((data)=>{//登录正常
                        this.showTips = false;
                        //跳转首页
                        _self.$router.push({ name: 'manage' });
                    },(message)=>{//登录异常
                        this.showTips = true;
                        this.tipsTxt = message;
                        utils.$('#loginBox').removeClass().addClass('shake animated')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                utils.$(this).removeClass();
                            });
                    })
                }else if(utils.Tools.isEmpty(this.form.username)){
                    this.showTips = true;
                    this.tipsTxt = "用户名不能为空";
                    utils.$('#loginBox').removeClass().addClass('shake animated')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            utils.$(this).removeClass();
                        });
                }else if(utils.Tools.isEmpty(this.form.password)){
                    this.showTips = true;
                    this.tipsTxt = "密码不能为空";
                    utils.$('#loginBox').removeClass().addClass('shake animated')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            utils.$(this).removeClass();
                        });
                }
            }
        }
    }
</script>