<template>
    <div>
        <header-component/>
        <div id="wrap">
            <nav-component/>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import HeaderComponent from './header.vue';
    import NavComponent from './nav.vue'
    var myMixin = {
        created: function () {
            this.hello()
        },
        methods: {
            hello: function () {
                console.log('hello from mixin!')
            }
        }
    }
    export default {
        mixins: [myMixin],
        components:{
            HeaderComponent,
            NavComponent
        }
    }
</script>