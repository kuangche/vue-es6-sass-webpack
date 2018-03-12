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

    export default {
        components:{
            HeaderComponent,
            NavComponent
        }
    }
</script>