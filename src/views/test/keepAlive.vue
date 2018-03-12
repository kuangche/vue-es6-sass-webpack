<template>
    <div>
        <div class="testCon">
            <ul>
                <li @click="changeComponent('Component1')">组件1</li>
                <li @click="changeComponent('Component2')">组件2</li>
                <li @click="changeComponent('Component3')">组件3</li>
            </ul>
            <div>
                <keep-alive>
                    <component v-bind:is="currentView"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import Component1 from './component/keepAlive/component1';
    import Component2 from './component/keepAlive/component2';
    import Component3 from './component/keepAlive/component3';
    export default {
    	components:{
    		Component1,
            Component2,
            Component3,
        },
      data(){
    		return{
                currentView:'Component1'
            }
      },
      methods:{
            changeComponent(name){
                this.currentView = name;
            }
      }
    }
</script>
<style lang="scss" scoped>
    .testCon{
        border: 1px solid #ccc;
        width: 1000px;
        height: 500px;
        transform: translateX(-50%) translateY(-50%);
        position: absolute;
        left: 50%;
        top:50%;
        li{
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #ddd;
            cursor: pointer;
        }
    }
</style>