<template>

    <div class="container-body">
        <EquipoFoto @picture-taken="imageSrc= $event"/>
        <img :src="imageSrc" class="vick" />

      
    </div>

</template>



<style>


</style>


<script>
import EquipoFoto from "./EquipoFoto.vue"
export default {

    components:{
        EquipoFoto
    },
    data() {
        return {
            imageSrc:null,
        };
    },
    mounted() {
    },

    methods: {
    },
};


</script>