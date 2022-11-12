<template>
    <div class="container-section">
        <button @click="startCapture()">Capturar imagen</button>

        <div class="section">
            <video class="video" ref="video" @canplay="initCanvas()">stream unavailable</video>
            <button id="myModal" @click="takePicture()">take</button>
            <canvas ref="canvas" style="display:none;" />
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

        },

        initCanvas() {
            this.canvas.setAttribute('width', this.video.videoWidth)
            this.canvas.setAttribute('height', this.video.videoHeight)
        }
    },

}
</script>

<style scoped>

</style>