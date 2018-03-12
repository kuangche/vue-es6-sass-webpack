<template>
    <div>
        <ul>
            <li :style="{color:txtColor}">
                冬天还不走吗1两秒后更改颜色……
                <p>使用keep-alive,缓存当前组件，保存之前的状态,包括之前的样式</p>
                <p>生命周期内函数，通常指执行一次，但是销毁不会执行，除非去掉keep-alive</p>
            </li>
            <li>冬天还不走吗2</li>
            <li>冬天还不走吗3</li>
            <li>冬天还不走吗4</li>
        </ul>
    </div>
</template>
<script>
    export default {
    	data(){
    	    return{
                txtColor:'red'
            }
        },
    	mounted(){
    		setTimeout(()=>{
    			this.txtColor = 'green'
            },2000)
        }
    }
</script>