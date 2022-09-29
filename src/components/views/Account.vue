<template>

    <div class="section">
        <div class="container-body">
            <h2>Datos de usuario</h2>

            <div class="body-content">

                <div class="body">

                    <div class="cards">
                        <b>Rol</b>
                        <p>{{ user.roles_id }}</p>
                    </div>

                    <div class="cards">
                        <b>Compania</b>
                        <p>{{ user.companies_id }}</p>
                    </div>

                    <div class="cards">
                        <b>Correo electronico</b>
                        <p>{{ user.email }}</p>
                    </div>

                    <div class="cards">
                        <b>Número de contacto</b>
                        <p>{{ user.phone_number }}</p>
                    </div>

                    <div class="cards">
                        <b>Fecha de creación</b>
                        <p>{{ user.created_at }}</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="body-aside">

            <h3>{{ user.name }}</h3>
            <h5>{{ user.dni }}</h5>
            <router-link class="rotes" to="/account/reset-password">
                <button>Cambiar contraseña</button>
            </router-link>
            <button @click="logout()">Cerrar sesión</button>
        </div>
    </div>

</template>

<style scoped>
@import "../../assets/css/styleAccount.css";
</style>
    


<script>
export default {
    data() {
        return {
            token: '',
            user: {},
        }
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
            this.get_user();
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder con esta cuenta"
                }
            })
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
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
            }
        },

        async logout() {
            try {

                const rs = await this.axios.get("/api/logout", {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                localStorage.clear();

                this.$router.push({

                    name: "Login",
                    params: {
                        message: rs.data.message,
                    },
                });
            } catch (e) {
                // console.log(e)
                this.$router.push({
                    name: "Login",
                    params: {
                        message: e.response.data.message,
                    },
                });
            }
        }
    },
}
</script>