<template>
    
    <div class="container-body">
        <router-view name="aside"></router-view>
        <div class="section">
            <router-view name="navbar"></router-view>
            <div class="container-section">
                <!-- <transition name="fade"> -->
                    <router-view></router-view>
                <!-- </transition> -->
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
    async mounted() {
        this.get_token();
    },

    methods: {
        async get_token() {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        },
    },
};


</script>