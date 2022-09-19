<template>

    <div class="container-body">
        <h1>Bienvenido administrador {{ user.name }}</h1>
    </div>
    <router-link class="rotes" to="/register">
        <button @click="logout()">Cerrar sesión</button>
        <br>
        <button>Registrar</button>
    </router-link>

</template>

<style scoped>
/* @import "../assets/css/styleAccount.css"; */
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