<template>
    <div>
        <video ref="video" @canplay="initCanvas()">stream unavailable</video>
        <button @click="takePicture()">take</button>
        <canvas ref="canvas" style="display:none;" />



    </div>

</template>
<script>
export default {

    mounted() {
        this.canvas = this.$refs.canvas
        this.video = this.$refs.video
        this.startCapture()
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
    data() {
        return {
            video: null,
            canvas: null,
            url_img: ""
        }
    },
}
</script>

<style scoped>

</style>