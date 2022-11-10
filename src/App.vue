<template>

    <div class="container-body">

        <div id="aside-app">
            <router-view name="aside"></router-view>
        </div>

        <div class="section">
            <div class="container-section">
                <router-view name="navbar"></router-view>
                
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>



<style scoped>
@import "../src/assets/css/styleApp.css";
@import "../src/assets/css/styleLogin.css";
</style>


<script>
export default {
    data() {
        return {
        };
    },
    mounted() {
    },

    methods: {
    },
};


</script>