<template>
    <div class="content">
        <div class="modal-body">
            <div>
                <h1>SIGEM</h1>
                <div id="body">
                    <h3>Iniciar Sesión</h3>
                    <form id="form-login">
                        <div class="form-floating pb-3">
                            <input type="email" class="form-control" id="floatingInput" name="email"
                                v-model="form.email" />
                            <label for="floatingInput">Correo electronico</label>
                            <span class="errors-message" v-if="errors.email">{{
                                    errors.email[0]
                            }}</span>
                        </div>

                        <div class="form-floating pb-3">
                            <input type="password" class="form-control" id="floatingPassword" name="password"
                                v-model="form.password" />

                            <label for="floatingPassword">Constraseña</label>
                            <span class="errors-message" v-if="errors.password">{{ errors.password[0] }}
                            </span>


                        </div>
                        <p style="color: red;" v-if="message">{{ message }}</p>
                    </form>
                    <div class="modal-footer">
                        <button class="forgotPassword">
                            <router-link to="/forgot-password" class="contraseña">
                                ¿Olvidaste tu contraseña?
                                <span class="material-symbols-outlined"> login </span>
                            </router-link>
                        </button>

                        <button class="button-login" id="rotesss" @click="login()">
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
            message: "",
            errors: {},
            form: { email: "", password: "" },
        };
    },
    mounted() {
        if (this.$route.params.message) this.message = this.$route.params.message;
    },

    methods: {
        async login() {
            try {
                const rs = await this.axios.post("/api/login", this.form);
                localStorage.user = JSON.stringify(rs.data.user);

                switch (rs.data.user.roles_id) {

                    case 1:
                        this.$router.push({ path: "/super-admin" });
                        localStorage.rol = rs.data.user.roles_id
                        localStorage.token = rs.data.token;

                        break;

                    case 2:
                        this.$router.push({ path: "/home" });
                        localStorage.rol = rs.data.user.roles_id
                        localStorage.token = rs.data.token;

                        break;

                    case 3:
                        this.$router.push({ path: "/user" });
                        localStorage.rol = rs.data.user.roles_id
                        localStorage.token = rs.data.token;

                        break;
                    default:
                        this.$router.push({
                            name: "Login",
                            params: {
                                message: "Ups! algo salión mal, por favor intentalo de nuevo.",
                            },
                        });
                }
            } catch (e) {

                if (e.response.data.errors) {
                    this.errors = e.response.data.errors;
                }
                else if (e.response.data.message) {
                    this.message = e.response.data.message;
                }

            }


        },
    },
};
</script>

