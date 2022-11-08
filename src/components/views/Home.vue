<template>

    <div class="container-home">
        <div class="main">
            <div class="card-home">
                <div class="img-home">
                    <span class="material-symbols-outlined icon-home">
                        event
                    </span>
                </div>
                <div class="card-content">
                    <h4>Gestión de eventos</h4>
                    <small></small>
                </div>
            </div>
        </div>
    </div>

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
            alert('Bienvenido')

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