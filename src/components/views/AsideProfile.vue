<template>
    <div class="section">

        <h2>Datos de usuario</h2>

        <div class="container-body">

            <div class="form-body">
                <router-view></router-view>
            </div>

            <div class="body-aside">
                <div>
                    <img src="../../../img/logos-cuentas/AccountIcon2.png" alt="">
                </div>
                <div class="buttons">
                    <router-link class="rotes" to="/account/admin">
                        <span class="material-symbols-outlined">
                            person
                        </span>
                        <button>Información personal</button>
                    </router-link>
                </div>

                <div class="buttons">
                    <router-link class="rotes" to="/account/admin/edit">
                        <span class="material-symbols-outlined">
                            manage_accounts
                        </span>
                        <button>Editar información</button>
                    </router-link>
                </div>

                <div class="buttons">
                    <router-link class="rotes" to="/account/admin/password">
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

            if (localStorage.getItem('rol') != 1) {
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