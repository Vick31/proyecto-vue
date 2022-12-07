<template>
    <div class="div-form">
        <form>
            <h1 class="title">Registrar usuario</h1>

            <div class="form-floating pb-3">
                <input type="number" class="form-control" name="name" v-model="form.dni" />
                <label for="floatingInput">Dni</label>
                <span v-if="errors.dni">{{ errors.dni[0] }}</span>
            </div>
            <div class="form-floating pb-3">
                <input type="name" class="form-control" name="name" v-model="form.first_name" />
                <label for="floatingInput">Nombre</label>
                <span v-if="errors.first_name">{{ errors.first_name[0] }}</span>
            </div>
            
            <div class="form-floating pb-3">
                <input type="name" class="form-control" name="name" v-model="form.last_name" />
                <label for="floatingInput">apellido</label>
                <span v-if="errors.last_name">{{ errors.last_name[0] }}</span>
            </div>

            <div class="form-floating pb-3">
                <input type="number" class="form-control" name="name" v-model="form.phone_number" />
                <label for="floatingInput">Numero de telefono</label>
                <span v-if="errors.phone_number">{{ errors.phone_number[0] }}</span>
            </div>

            <div class="form-floating pb-3">
                <input type="text" class="form-control" name="email" v-model="form.email" />
                <label for="floatingInput">Correo electronico</label>
                <span v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="div-row">
                <div class="form-floating pb-3">
                    <input type="password" class="form-control" name="" v-model="form.password" />
                    <label for="floatingInput">Contraseña</label>
                    <span v-if="errors.password">{{ errors.password[0] }} </span>
                </div>
                <div class="form-floating pb-3">
                    <input type="password" class="form-control" name="" v-model="form.password_confirmation" />
                    <label for="floatingInput">Confirmar contraseña </label>
                    <span v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}
                    </span>
                </div>
            </div>
            <div class="form-footer">
                <router-link class="rotes" to="/usuarios">
                    <button type="button" class="btn btn-primary save">Regresar</button>
                </router-link>

                <router-link class="rotes" to="/usuarios">

                </router-link>
                <button type="button" id="rot" @click="register_admin()" class="btn btn-primary save">
                    Guardar
                </button>
            </div>
            <p v-if="message">{{ message }}</p>
        </form>
    </div>

    
</template>
  
  
<style scoped>
/* @import "../../../assets/css/styleRegisterClients.css"; */
</style>
  
<script>
export default {
    data() {
        return {
            roles_list: [],
            message: '',
            form: {
                dni: '',
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
                password: "",
                password_confirmation: "",
                companies_id: "1",
                roles_id: "2",
            },
            errors: {},
            token: '',
            user: {},
        };
    },
    mounted() {

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
        this.index()
    },

    methods: {
        async index() {
            let response = await this.axios.get("/api/roles")
            this.roles_list = response.data
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

        async register_admin() {
            try {
                const rs = await this.axios.post("/api/register-admins", this.form);
                this.form = {
                    dni: '',
                    name: "",
                    phone_number: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                }
                this.index()

            }
            catch (e) {

                this.errors = {},
                    this.message = null;

                if (e.response.data.errors)
                    this.errors = e.response.data.errors;

                else if (e.response.data.message)
                    this.errors = e.response.data.message;

                console.log(e)
            }

        },
    },
};
</script>