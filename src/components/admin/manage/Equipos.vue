<template>
    <router-link class="rotes" to="/equipos">
        <div class="container-body">
            <EquipoFoto @picture-taken="imageSrc = $event" />
            <!-- <img :src="imageSrc" class="vick" /> -->



        </div>
    </router-link>

</template>



<style>

</style>


<script>
import EquipoFoto from "./EquipoFoto.vue"
export default {

    components: {
        EquipoFoto
    },
    data() {
        return {
            imageSrc: null,
        };
    },
    mounted() {
        if (localStorage.token) {

            if (localStorage.getItem('rol') != 1) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }

            this.token = localStorage.token;
        }
    },

    methods: {
    },
};


</script>