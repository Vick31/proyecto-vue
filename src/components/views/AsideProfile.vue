<template>
    <div class="section">

        <h2>Datos de usuario</h2>

        <div class="container-body">

            <div class="body-aside">

                <div class="buttons">
                    <router-link class="rotes" to="/account">
                        <span class="material-symbols-outlined">
                            person
                        </span>
                        <button>Información personal</button>
                    </router-link>
                </div>

                <div class="buttons">
                    <router-link class="rotes" to="/account/edit">
                        <span class="material-symbols-outlined">
                            manage_accounts
                        </span>
                        <button>Editar información</button>
                    </router-link>
                </div>

                <div class="buttons">
                    <router-link class="rotes" to="/account/password">
                        <span class="material-symbols-outlined">
                            lock_reset
                        </span>
                        <button>Cambiar contraseña</button>
                    </router-link>
                </div>

                <div @click="logout()" class="buttons">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                    <button>Cerrar sesión</button>
                </div>

            </div>

            <div class="form-body">
                <router-view></router-view>
            </div>

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


        this.get_token()

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

        this.loading = false

    },
    methods: {

        async get_token() {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        },

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