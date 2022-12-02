<template>
    <div class="aside">
        <div class="body-aside">
            <span @click="remove_aside()" class="material-symbols-outlined" id="close">
                close
            </span>
            <ul>
                <router-link class="rotes" to="/super-admin/home">
                    <li class="logo">
                        <span class="material-symbols-outlined">
                            home
                        </span>
                        <small>Inicio</small>
                    </li>
                </router-link>
            </ul>
            <div>

                <ul>
                    <router-link class="rotes" to="/super-admin/admin">
                        <li>
                            <span class="material-symbols-outlined">
                                groups
                            </span>
                            <small>ADMINS</small>
                        </li>
                    </router-link>
                </ul>
                <ul>
                    <router-link class="rotes" to="/super-admin/companies">
                        <li>
                            <span class="material-symbols-outlined">
                                dvr
                            </span>
                            <small>COMPAÑIAS</small>
                        </li>
                    </router-link>

                </ul>
                <ul>
                <router-link class="rotes" to="/super-admin/roles">
                    <li>
                        <span class="material-symbols-outlined">
                            assignment_ind
                        </span>
                        <small>ROLES</small>
                    </li>
                </router-link>
            </ul>
            </div>
            

            <ul>
                <div class="rotes" to="/account/user" @click="logout()">
                    <li>
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                        <small>CERRRAR SESIÓN</small>
                    </li>
                </div>
            </ul>

        </div>
    </div>
</template>

<style scoped>
@import "../../assets/css/styleApp.css";
</style>

<script>
export default {
    data() {
        return {
        };
    },
    mounted() {
    },

    methods: {
        remove_aside() {
            document.getElementById('aside-app').style.transform = "scale(0)"
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
};


</script>