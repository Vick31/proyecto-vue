<template>

    <div class="section">
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

</template>

<style scoped>
@import "../../assets/css/styleAccountUser.css";
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

        this.get_token();

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