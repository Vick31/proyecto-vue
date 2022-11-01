<template>
    <div>
        <video ref="video">stream unavailable</video>
        <button @click="takePicture">take</button>
        <canvas ref="canvas" style="display:none;" />
        <img :src="imageSrc" />
        <!-- <Equipos @picture-taken="imageSrc= $event"/> -->

    </div>
    
</template>
<script>
export default {
    name: "Equipos",
    mounted() {
        this.canvas = this.$refs.canvas
        this.video = this.$refs.video
        this.startCapture()

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

        },

        initCanvas() {
            this.canvas.setAttribute('width', this.videoWidth)
            this.canvas.setAttribute('height', this.videoHeight)
        }
    },
    data() {
        return {
            video: null,
            canvas: null,
            imageSrc:null

        }
    },
}
</script>

<style scoped>

</style>