<template>
    <div class="section">
        <div class="body">
            <h4>Restablecer contraseña</h4>

            <div class="form-body">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
                        <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                        <span v-if="errors.email">{{ errors.email[0] }}</span>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
                        <span v-if="errors.password">{{ errors.password[0] }} </span>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Confirmar contraseña</label>
                        <input v-model="form.password_confirmation" type="password" class="form-control"
                            id="exampleInputPassword1">
                        <span v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}
                        </span>
                    </div>

                    <button type="button" @click="change_password">
                        Restablecer contraseña
                    </button>
                    <br />
                    <p v-if="message">{{ message }}</p>
                </form>
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
            message: '',
            form: {
                email: "",
                password: "",
                token: '',
            },
            token: '',
            user: {},
            errors: {},
        };
    },
    mounted() {

        if (this.$route.query.token)
            this.form.token = this.$route.query.token

        if (localStorage.token) {

            if (localStorage.getItem('rol') != 3) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }

            this.token = localStorage.token;
            this.get_user();
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
        async change_password() {
            try {
                const rs = await this.axios.post("/api/reset-password", this.form);

                this.$router.push({
                    name: 'Home',
                    params: { message: rs.data.message, },

                });
            }
            catch (e) {

                this.errors = {},
                    this.message = null;

                if (e.response.data.errors)
                    this.errors = e.response.data.errors;

                if (e.response.data.message)
                    this.errors = e.response.data.message;
            }

        },
    },
};
</script>