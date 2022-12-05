<template>
    <div class="div-form">
        <form>
            <h1 class="title">Registrar compania</h1>

            <div class="form-floating pb-3">
                <input type="text" class="form-control" name="name" v-model="form.name" />
                <label for="floatingInput">Nombre</label>
                <span v-if="errors.name">{{ errors.name[0] }}</span>
            </div>

            <div class="form-floating pb-3">
                <input type="number" class="form-control" name="name" v-model="form.phone_number" />
                <label for="floatingInput">Numero de telefono</label>
                <span v-if="errors.phone_number">{{ errors.phone_number[0] }}</span>
            </div>
            <div class="form-floating pb-3">
                <input type="text" class="form-control" name="name" v-model="form.address" />
                <label for="floatingInput">Dirección</label>
                <span v-if="errors.address">{{ errors.address[0] }}</span>
            </div>
            <div class="form-floating pb-3">
                <input type="email" class="form-control" name="email" v-model="form.email" />
                <label for="floatingInput">Correo electronico</label>
                <span v-if="errors.email">{{ errors.email[0] }}</span>
            </div>


            <div class="form-footer">
                <router-link class="rotes" to="/super-admin/companies">
                    <button type="button" class="btn btn-primary save">Regresar</button>
                </router-link>

                <button type="button" id="rot" @click="register_companie()" class="btn btn-primary save">
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
            message: '',
            form: {
                name: "",
                phone_number: "",
                email: "",
                address: ""
            },
            errors: {},
            token: '',
            user: {},
        };
    },
    mounted() {

        if (localStorage.token) {
            this.token = localStorage.token;
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

        async register_companie() {
            try {
                const rs = await this.axios.post("/api/companies", this.form);
                
                this.$router.push({
                    path: '/super-admin/companies',
                    params: { message: rs.data.message, },

                });

                this.form = {
                    name: "",
                    phone_number: "",
                    address: "",
                    email: "",
                }
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