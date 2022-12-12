<template>

    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />
    <div class="section">
        <form enctype="multipart/form-data">
            <div class="body">


                <h3>Datos personales</h3>

                <div class="content-cards">
                    <div class="cards">
                        <!-- Image client exist and is not loading a new image -->
                        <img v-if="user.img && !user.url" :src="axios.defaults.baseURL + user.img" class="image-profile"
                            :id="'client' + user.id" />
                        <!-- Image client exist and uploaded a new image -->
                        <img v-if="user.url && !loading" :src="user.url" class="image-profile"
                            :id="'client' + user.id" />

                        <!-- Image client not exist and is not loading a new image -->
                        <span v-if="!user.img && !loading" :id="'client' + user.id"
                            class="material-symbols-outlined default-profile">
                            account_circle
                        </span>
                        <input type="file" name="file" @change="show_image" accept="image/*">

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
            form: {
                img: '',
                dni: '',
                first_name: '',
                last_name: '',
                roles_id: '',
                companies_id: '',
                phone_number: '',
                email: '',
                url: null,
                preview: null,
                updated: null,
            },
            loading: false,
            image_text: "Loading image...",
            client_copy: {},
            modal: null,
            toast: null,
            errors: {},
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
                // this.id = this.user.id
                // this.form.roles_id = this.user.roles_id
                // this.form.companies_id = this.user.companies_id

                this.form = this.user
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

        show_image(e) {
            if (e.target.files[0]) {
                console.log("updated!");

                this.form.img = e.target.files[0];
                // this.form.url = URL.createObjectURL(e.target.files[0]);
                console.log(this.form)
            } else {
                console.log("No se seleccionó ninguna imagen!!");
            }


        },

        async editProfile() {

            try {

                console.log(this.form)
                const id = this.form.id;
                const response = await this.axios.put("/api/users/" + id, this.form);

                this.get_user()
            }

            catch (e) {

                console.log(e.response.data.errors)
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

        edit(user) {
            this.form = user;
            this.form.preview = false;
            this.form.updated = null;
            this.form.url = this.form.img
                ? this.axios.defaults.baseURL + this.form.img
                : null;
            this.client_copy = Object.assign({}, this.form);

            this.image_text = "You profile photo";
            this.loading = false;
        },
        cancel_form() {
         Object.assign(this.form, this.client_copy);
         this.loading = false;
         this.form.updated = null;
      },

      open_browser(input_name) {
         const input = document.getElementById(input_name);
         input.click();
         this.loading = true;
         this.form.updated = null;
         this.image_text = "Loading...";
      },

      show_image(e) {
         if (e.target.files[0]) {
            console.log("updated!");
            this.form.updated = true;

            this.form.img = e.target.files[0];
            this.form.url = URL.createObjectURL(e.target.files[0]);
         } else {
            console.log("No se seleccionó ninguna imagen!!");
            this.form.url = this.client_copy.url;
         }

         this.loading = false;
      },

      clear_image(input_name) {
         this.form.img = null;
         this.form.updated = true;
         this.form.url = null;
         document.getElementById(input_name).value = null; //clear input file
      },

      stop_loading() {
         console.log("cancelaste la carga!!");
         this.form.url = this.client_copy.url;
         this.loading = false;
      },

    },

}
</script>