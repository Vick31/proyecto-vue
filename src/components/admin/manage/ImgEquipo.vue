
<template>
    <div class="container-section">
        <div class="section">
            <div class="modal-body">

                <section class="photo-container">
                    <div class="photo-prev">
                        <input accept="image/*" type="file" id="new-client-input" @change="show_image" style="display: none" />
                        <!-- Image client exist and is not loading a new image -->
                        
                        <!-- Image client not exist and is not loading a new image -->
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 5rem; cursor: pointer;" v-if="!form.url && !loading" class="material-symbols-outlined"
                            @click="open_browser('new-client-input')">
                            account_circle
                        </span>

                        <div class="preview" v-if="form.url && !loading">
                            <img style="width:10rem;" @click="open_browser('new-client-input')" :src="form.url" />
                            <span style="cursor: pointer;" class="material-symbols-outlined clear-image"
                                @click="clear_image('new-client-input')">
                                close
                            </span>
                        </div>

                        <div v-if="loading" class="loading" @click="open_browser('new-client-input')"></div>
                        <!-- User can stop the image loading -->
                        <span v-if="loading" class="image_text" :class="{ stop: loading }" @click="stop_loading()"
                            @mouseover="image_text = 'Stop loading!'" @mouseleave="image_text = 'Loading...'">{{
                                    image_text
                            }}</span>
                        <span v-if="!loading" class="image_text">Your profile photo</span>
                        </div>
                    </div>
                    <div class="form-text" v-if="errors.img">
                        {{ errors.img[0] }}
                    </div>
                </section>

                <form>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">name</label>
                        <input v-model="form.name" type="text" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">serial</label>
                        <input v-model="form.serial" type="number" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">cliente</label>
                        <input v-model="form.clients_id" type="number" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                    <button @click="register_equipment()" type="button" data-bs-dismiss="modal" class="btn btn-primary"
                        id="sub">Submit</button>
                </form>

            </div>
        </div>
    </div>


    <!-- Button trigger modal -->


    <!-- Modal -->



</template>

<style scoped>
@import "../../../assets/css/styleEquipos.css";
</style>

<script>

export default {
    data() {
        return {
            video: null,
            canvas: null,
            url_img: "",
            form: {
                img: '',
                name: '',
                serial: '',
                clients_id: '',
                url: null,
                preview: null,
                updated: null, //backend action
            },
            loading: false,
            image_text: "Loading image...",
            client_copy: {},
            modal: null,
            toast: null,
            errors: {},

            defaults: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dM2rpp1m8GOXl9CEKJ5KrQEA7-2ihbmRFg&usqp=CAU'
        }
    },
    mounted() {


    },
    methods: {

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



        async register_equipment() {
            try {


                const rs = await this.axios.post("/api/equipos", this.form, {
                    headers: {
                        Authorization: "Bearer " + localStorage.token,
                        "Content-Type": "multipart/form-data", //Permite enviar imágenes
                    },
                });

                this.$router.push({
                    path: '/equipos',
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

}
</script>

<style scoped>

</style>