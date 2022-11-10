<template>
    <div class="div-form ">
        <form>
            <h1 class="title">Registrar cliente</h1>
            <div class="form-floating pb-3">
                <input type="number" class="form-control" name="name" v-model="form.dni" />
                <label for="floatingInput">Dni</label>
                <span v-if="errors.dni">{{ errors.dni[0] }}</span>
            </div>
            <div class="form-floating pb-3">
                <input type="name" class="form-control" name="name" v-model="form.name" />
                <label for="floatingInput">Nombre</label>
                <span v-if="errors.name">{{ errors.name[0] }}</span>
            </div>

            <div class="form-floating pb-3">
                <input type="number" class="form-control" name="name" v-model="form.phone_number" />
                <label for="floatingInput">Numero de telefono</label>
                <span v-if="errors.phone_number">{{ errors.phone_number[0] }}</span>
            </div>

            <div class="form-row">
                <div class="form-floating pb-3">
                    <input type="text" class="form-control" name="name" v-model="form.address" />
                    <label for="floatingInput">Direccion</label>
                    <span v-if="errors.addres">{{ errors.address[0] }}</span>
                </div>
            </div>
            <div class="form-floating pb-3">
                <input type="text" class="form-control" name="email" v-model="form.email" />
                <label for="floatingInput">Correo electronico</label>
                <span v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="div-row">
                <div class="form-floating pb-3">
                    <input type="text" class="form-control" name="" v-model="form.equipment_id" />
                    <label for="floatingInput">Equipo</label>
                    <span v-if="errors.equipment_id">{{ errors.equipment_id[0] }} </span>
                </div>
            </div>
            <div class="form-footer">
                <router-link class="rotes" to="/user/clientes">
                    <button class="btn btn-primary save"> Regresar </button>
                </router-link>
                <button type="button" id="rote" @click="register_user()" class="btn btn-primary save">
                    Guardar
                </button>
            </div>
            <p v-if="message">{{ message }}</p>
        </form>
    </div>
</template>


<style scoped>
@import "../../../assets/css/styleRegisterClients.css";
</style>

<script>

export default {
    data() {
        return {
            message: '',
            form: {
                dni: '',
                name: "",
                phone_number: "",
                email: "",
                equipment_id: "",
            },
            errors: {},
            token: '',
            user: {},
        };
    },
    mounted() {

        this.get_token()

        if (localStorage.token) {

            if (localStorage.getItem('rol') == 1) {
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

        async register_user() {
            try {
                const rs = await this.axios.post("/api/clientes", this.form);

                this.$router.push({
                    name: 'Clients',
                    params: { message: rs.data.message, },

                });
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