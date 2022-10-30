<template>
    <div class="content">
        <div class="modal-body">
            <div>

                <h1>SIGEM</h1>
                <div id="body">
                    <h3>Welcome to login system</h3>
                    <form id="form-login">
                        <div class="form-floating pb-3">
                            <input type="email" class="form-control" id="floatingInput" name="email"
                                v-model="form.email" />
                            <label for="floatingInput">Correo electronico</label>
                            <span class="errors-message" v-if="errors.email">{{
                            errors.email[0] }}</span>
                        </div>

                        <div class="form-floating pb-3">
                            <input type="password" class="form-control" id="floatingPassword" name="password"
                                v-model="form.password" />
                            <label for="floatingPassword">Password</label>
                            <span class="errors-message" v-if="errors.password">{{
                            errors.password[0] }} </span>
                        </div>


                        <p v-if="message">{{ message }}</p>
                    </form>
                    <div class="modal-footer">
                        <button class="forgotPassword">
                            <router-link to="/forgot-password" class="contraseña">
                                <span class="material-symbols-outlined">
                                    login
                                </span>
                                ¿Olvidaste tu contraseña?
                            </router-link>
                        </button>
                        <button class="button-login" @click="login()">
                            Login
                        </button>
                    </div>
                </div>
                <div class="footer-text">
                    RESERVED FOR THE BEST BIOMEDICS IN THE COUNTRY.
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import "../../assets/css/styleLogin.css";
</style>

<script>
export default {
    data() {
        return {
            message: '',
            errors: {},
            form: { email: "",  password: "" },
        };
    },
    mounted() {
        if (this.$route.params.message)
            this.message = this.$route.params.message

    },

    methods: {
        async login() {
            try {
                const rs = await this.axios.post("/api/login", this.form);
                localStorage.token = rs.data.token
                switch (rs.data.user.roles_id) {
                    case 1:
                        this.$router.push({ name: "Citas" });
                        break;

                    case 2:
                        this.$router.push({ name: "Account", });
                        break;

                    default:
                        this.$router.push({
                            name: "Login",
                            params: { message: "Ups! algo salión mal, por favor intentalo de nuevo." },
                        });
                }

            }
            catch (e) {

                this.errors = {},
                    this.message = null;

                if (e.response.data.errors)
                    this.errors = e.response.data.errors;

                else if (e.response.data.message)
                    this.errors = e.response.data.message;

            }

        },
    },
};

</script>