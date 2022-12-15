<template>

    <div class="container-home">
        <div class="title">
            <h1> APP SIGEM </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quasi non tenetur dolorem libero recusandae modi harum repudiandae placeat debitis!</p>
            <img class="img-header" src="../../../img/mantenimiento-01.jpg" alt="">
        </div>
        <div class="main">
            <router-link to="/user/agendar/citas" class="rotes">
                <div class="card-home">
                    <div class="img-home">
                        <span class="material-symbols-outlined icon-home">
                            event
                        </span>
                    </div>
                    <div class="card-content">
                        <h4>Eventos</h4>
                        <small></small>
                    </div>
                </div>
            </router-link>

            <router-link to="/user/clientes" class="rotes">
                <div class="card-home">
                    <div class="img-home">
                        <span class="material-symbols-outlined icon-home">
                            group
                        </span>
                    </div>
                    <div class="card-content">
                        <h4>Clientes</h4>
                        <small></small>
                    </div>
                </div>
            </router-link>
            <router-link to="/user/equipos" class="rotes">
                <div class="card-home">
                    <div class="img-home">
                        <span class="material-symbols-outlined icon-home">
                            dvr
                        </span>
                    </div>
                    <div class="card-content">
                        <h4>Equipos</h4>
                        <small></small>
                    </div>
                </div>
            </router-link>
            <router-link to="/account/user" class="rotes">
                <div class="card-home">
                    <div class="img-home">
                        <span class="material-symbols-outlined icon-home">
                            manage_accounts
                        </span>
                    </div>
                    <div class="card-content">
                        <h4>Tu Cuenta</h4>
                        <small></small>
                    </div>
                </div>
            </router-link>
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

            if (localStorage.rol != 3) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token == null
            }
            this.token = localStorage.token;
        }
    },

    methods: {

    },
};
</script>