<template>
    <div id="nav">
        <nav class="navbar">
            <div class="container-fluid">
                <span @click="show_aside()" class="icon-nav material-symbols-outlined" id="btn-menu">
                    menu
                </span>

                <h4>SIGEM</h4>
                <div>
                    <span class="material-symbols-outlined icon-nav">
                        notifications
                    </span>
                    <router-link class="rotes account-logo" to="/account/admin/">
                        <span class="material-symbols-outlined icon-nav">
                            person
                        </span>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
@import "../../assets/css/styleApp.css";
</style>

<script>
export default {
    data() {
        return {
            user: {},
            token: ''
        };
    },
    mounted() {
        this.token = localStorage.token;
        this.get_user()
    },

    methods: {
        show_aside() {
            document.getElementById('aside-app').style.transform = "scale(1)"
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
    },
};


</script>