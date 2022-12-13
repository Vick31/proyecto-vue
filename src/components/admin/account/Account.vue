<template>

    <div class="section">
        <div class="body">
            <h3>Información personal</h3>

            <div class="content-cards">
                <div class="cards">
                    <small>Imagen de perfil</small>
                    <img :src="axios.defaults.baseURL + user.img" class="image-profile" />
                </div>
            </div>

            <div class="content-cards">
                <div class="cards">
                    <small>Nombre de usuario</small>
                    <p class="input-p">{{ user.first_name }}</p>
                </div>

                <div class="cards">
                    <small>Apellidos</small>
                    <p class="input-p">{{ user.last_name }}</p>
                </div>

                <div class="cards">
                    <small>Rol</small>
                    <p class="input-p">{{ user.roles_id }}</p>
                </div>

            </div>

            <h3>Información de contacto</h3>

            <div class="content-cards">
                <div class="cards">
                    <small>Compañia</small>
                    <p class="input-p">{{ user.companies_id }}</p>
                </div>

                <div class="cards">
                    <small>Correo electronico</small>
                    <p class="input-p">{{ user.email }}</p>
                </div>

                <div class="cards">
                    <small>Número de contacto</small>
                    <p class="input-p">{{ user.phone_number }}</p>
                </div>

                <div class="cards">
                    <small>Fecha de registro</small>
                    <p class="input-p">{{ user.created_at }}</p>
                </div>
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
            roles: []
        }
    },
    mounted() {

        if (localStorage.token) {
            this.token = localStorage.token;
            this.get_roles()
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
                console.log(this.user)
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

        async get_roles() {
            try {
                const response = await this.axios.get("/api/roles")
                this.roles = response.data

            }

            catch (e) {
                alert('falla')
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