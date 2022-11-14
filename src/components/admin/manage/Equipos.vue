<template>

    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />

    <router-link to="/equipos/captura"> Registrar nuevo equipo </router-link>
    <div class="container-section">
        <div class="card" style="width: 18rem;" v-for="p in equipment">
            <img :src="p.img" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="title-body">
                    <h5 class="card-title"> {{ p.name }} </h5>
                    <span class="material-symbols-outlined icon-equipo">
                        visibility
                    </span>
                </div>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
            </div>
        </div>
    </div>



</template>



<style scoped>
@import "../../../assets/css/styleEquipos.css";
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
            equipment: [],
            isLoading: true,
            fullPage: true,
        };
    },
    mounted: async function () {
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
            await this.equipments()
            this.isLoading = false

        }
    },

    methods: {
        async equipments() {
            const rs = await this.axios.get('/api/equipos');
            this.equipment = rs.data;
        },
    },
};


</script>