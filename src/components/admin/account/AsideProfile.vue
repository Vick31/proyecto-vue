<template>
    <div class="section">

        <h2>Datos de usuario</h2>

        <div class="container-body">
            <div class="body-aside">
                <router-link class="rotes" to="/account/admin">
                    <div class="buttons">
                        <p class="material-symbols-outlined">
                            person
                        </p>
                        <p>Información personal</p>
                    </div>
                </router-link>

                <router-link class="rotes" to="/account/admin/edit">
                    <div class="buttons">
                        <p class="material-symbols-outlined">
                            manage_accounts
                        </p>
                        <p>Editar información</p>
                    </div>
                </router-link>

                <router-link class="rotes" to="/account/admin/password">
                    <div class="buttons">
                        <p class="material-symbols-outlined">
                            lock_reset
                        </p>
                        <p>Cambiar contraseña</p>
                    </div>
                </router-link>

                <router-link class="rotes" to="/account/admin/clientes-eliminados">
                    <div class="buttons">
                        <p class="material-symbols-outlined">
                            delete_forever
                        </p>
                        <p>Clientes eliminados</p>
                    </div>
                </router-link>

                <div @click="logout()" class="buttons rotes">
                    <p class="material-symbols-outlined">
                        logout
                    </p>
                    <p>Cerrar sesión</p>
                </div>

            </div>

            <div class="form-body">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../../../assets/css/styleAccount.css";
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

            if (localStorage.getItem('rol') != 2) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }

            this.token = localStorage.token;
        }

        this.loading = false

    },
    methods: {

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