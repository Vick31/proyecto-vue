<template>

</template>
<style scoped>
@import "../../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            token: '',
            user: {},
        };
    },
    mounted() {

        if (localStorage.token) {
            this.$router.push({
                name: "Login",
                params: { message: "Ingresa tu usuario y contraseña" }
            })

        } else {
            this.$router.push({
                name: "Login",
                params: { message: "Ingresa tu usuario y contraseña" }
            })
        }
    },
    
    methods: {

    },
};
</script>