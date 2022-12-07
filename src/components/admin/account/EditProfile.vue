<template>

    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />
    <div class="section">
        <form>
            <div class="body">


                <h3>Datos personales</h3>

                <div class="content-cards">
                    <div class="cards">
                        <figure>
                            <img class="img-card" :src="imagen" alt="">
                        </figure>
                        <input type="file" @change="obtenerImagen">

                    </div>
                </div>
                <div class="content-cards">

                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Nombre de usuario</label>
                        <input v-model="user.first_name" type="text" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Apellidos</label>
                        <input v-model="user.last_name" type="text" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Documento de identidad</label>
                        <input disabled v-model="user.dni" type="number" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Rol de usuario</label>
                        <input disabled v-model="user.roles_id" type="number" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                </div>

                <h3>Información de contacto</h3>

                <div class="content-cards">

                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Compañia perteneciente</label>
                        <input disabled v-model="user.companies_id" type="text" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>

                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Dirección de correo</label>
                        <input v-model="user.email" type="email" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>

                    <div class="cards">
                        <label for="exampleInputEmail1" class="form-label">Número de contacto</label>
                        <input v-model="user.phone_number" type="number" class="input-p" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>


                </div>
            </div>
            <button type="button" @click="editProfile()">Enviar</button>
        </form>
    </div>
</template>

<style scoped>
@import "../../../assets/css/styleAccount.css";
</style>
            


<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            token: '',
            user: '',
            isLoading: true,
            fullPage: true,
            imagenMiniatura: '',
            id: '',
            datos_user: '',
            form:{
                img: '',
                dni: '',
                first_name: '',
                last_name: '',
                roles_id: '',
                companies_id: '',
                phone_number: '',
                email: ''
            }
        }
    },
    mounted() {


        if (localStorage.token) {

            if (localStorage.getItem('rol') != 2) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }

            this.token = localStorage.token;
            this.get_user()



            this.isLoading = false


        }

    },
    methods: {

        async get_user() {

            try {
                const rs = await this.axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = rs.data.user;
                this.id = this.user.id
                this.form.roles_id = this.user.roles_id
                this.form.companies_id = this.user.companies_id
                
                this.datos_user = this.user
                
                console.log(this.form)
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

        obtenerImagen(e) {
            let file = e.target.files[0]
            this.form.imagen = file

            this.cargarImagen(file)
        },

        cargarImagen(file) {
            let reader = new FileReader()

            reader.onload = (e) => {
                this.imagenMiniatura = e.target.result
            }

            reader.readAsDataURL(file)
        },

        async editProfile() {
            try{
                let response = await this.axios.put("/api/users/" + this.id, this.datos_user);
                this.get_user()
                alert('yes')
            }

            catch(e){
            
                console.log(e)
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
        },

    },
    computed: {
        imagen() {
            return this.imagenMiniatura
        }
    },
}
</script>