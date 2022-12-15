<template>

    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />
    <div class="section">
        <form>
            <div class="body">


                <h3>Datos personales</h3>

                <div class="content-cards">
                    <div class="cards">

                        <section class="photo-container">
                            <div class="photo-prev">
                                <input type="file" id="new-client-input" style="display: none" />
                                <!-- Image client exist and is not loading a new image -->
                                <div class="preview" v-if="form.url && !loading">
                                    <span class="material-symbols-outlined clear-image"
                                        @click="clear_image('new-client-input')">
                                        close
                                    </span>
                                    <img style="width: 20rem;" @click="open_browser('new-client-input')"
                                        :src="form.url" />
                                </div>
                                <!-- Image client not exist and is not loading a new image -->
                                <div style="display: flex; align-items: center; gap: 1rem; color: blue;">
                                    <img @click="open_browser('new-client-input')"
                                        :src="axios.defaults.baseURL + user.img" v-if="!form.url && !loading"
                                        class="image-profile" />

                                    <p v-if="!form.url && !loading">Click en la imagen para actualizarla</p>
                                </div>

                                <div v-if="loading" class="loading" @click="open_browser('new-client-input')"></div>
                                <!-- User can stop the image loading -->
                                <span v-if="loading" class="image_text" :class="{ stop: loading }"
                                    @click="stop_loading()" @mouseover="image_text = 'Stop loading!'"
                                    @mouseleave="image_text = 'Loading...'">{{
                                            image_text
                                    }}</span>
                                <!-- <span v-if="!loading" class="image_text">Your profile photo</span> -->
                            </div>
                            <div class="form-text" v-if="errors.img">
                                {{ errors.img[0] }}
                            </div>
                        </section>

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
                
                <button style="width: max-content;" type="button" class="btn btn-primary" @click="editProfile()">Enviar</button>
            </div>
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

            if (localStorage.rol != 3) {
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
                this.form = this.user
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
        },

        cancel_form() {
            // Object.assign(this.client, this.client_copy);
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


        async editProfile() {
            try {
                const id = this.user.id;
                console.log(this.form)
                const res = await this.axios.post(`/api/user/update/${id}`, this.form,
                    {
                        headers: {
                            Authorization: "Bearer " + this.token,
                            "Content-Type": "multipart/form-data", //Permite enviar imágenes
                        },
                    }
                );
                console.log('yes')
            } catch (e) {
                console.log(e.response.data.errors)
            }
        },
    },

}
</script>