<template>

    <div class="container-home">

        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <h1 class="navbar-brand">SIGEM</h1>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <div class="nav-profile">
                        <p>{{ user.first_name }}</p>
                        <img style="width: 2rem; height: 2rem; object-fit: cover;" :src="axios.defaults.baseURL + user.img" alt="">
                    </div>
                </div>
            </div>
        </nav>

        <div class="title">
            <h1> Sistema Integrado de Gestión de Equipos Medicos </h1>

            <img class="img-header" src="../../../img/mantenimiento-01.jpg" alt="">
        </div>

        <div class="main">
            <router-link to="/agendar/citas" class="rotes">
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

            <router-link to="/usuarios" class="rotes">
                <div class="card-home">
                    <div class="img-home">
                        <span class="material-symbols-outlined icon-home">
                            badge
                        </span>
                    </div>
                    <div class="card-content">
                        <h4>Usuarios</h4>
                        <small></small>
                    </div>
                </div>
            </router-link>

            <router-link to="/clientes" class="rotes">
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
            <router-link to="/equipos" class="rotes">
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
            <router-link to="/account/admin" class="rotes">
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

            if (localStorage.rol != 2) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }

            this.token = localStorage.token;
            this.get_user()
        }
    },

    methods: {
        async get_user() {

            try {
                const rs = await this.axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = rs.data.user;
            }

            catch (e) {
                console.log(e)
                console.log(this.token)
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
            }
        },
    },
};
</script>