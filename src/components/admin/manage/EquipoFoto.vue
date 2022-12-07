<template>
    <div class="container-section">
        <button @click="startCapture()" id="cap">Capturar imagen</button>

        <div class="section">
            <video class="video" ref="video" @canplay="initCanvas()">stream unavailable</video>
            
            <button @click="takePicture()" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Capturar
            </button>

            <canvas ref="canvas" style="display:none;" />
        </div>
    </div>


    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form>
                        <div class="mb-3" id="img-modal">
                            <input v-model="form.img" type="text" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp">

                        </div>
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
                        <button @click="register_equipment()" type="button" data-bs-dismiss="modal"
                            class="btn btn-primary" id="sub">Submit</button>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="clos">Close</button>
                    <button type="button" class="btn btn-primary" id="save">Save changes</button>
                </div>
            </div>
        </div>
    </div>

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
                clients_id: ''
            },

            defaults: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dM2rpp1m8GOXl9CEKJ5KrQEA7-2ihbmRFg&usqp=CAU'
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas
        this.video = this.$refs.video
        this.url_img = ""
    },
    methods: {



        startCapture() {

            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
                this.video.srcObject = stream
                this.video.play()
            }).catch(error => {
                console.log(error)
            })




        },
        takePicture() {

            let context = this.canvas.getContext('2d')
            context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight)
            this.$emit('picture-taken', this.canvas.toDataURL('image/png'))

            this.url_img = this.canvas.toDataURL('image/png')

            this.video.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
            this.video.srcObject = null;

            console.log(this.url_img)

            let img = document.getElementById('img-modal')

            img.innerHTML = `
            <img class="card-img-top" src="${this.url_img}" alt="">

            `

            this.form.img = this.url_img

        },

        initCanvas() {
            this.canvas.setAttribute('width', this.video.videoWidth)
            this.canvas.setAttribute('height', this.video.videoHeight)
        },


        async register_equipment() {
            // if(this.form.img = '') {
            //         this.form.img = this.defaults
            // }

            try {


                const rs = await this.axios.post("/api/equipos", this.form);

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