<template>

    <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />

    <router-link to="/equipos/imagenes" >
        <button id="reg"> Registrar nuevo equipo con imagen</button> 
    </router-link>
    
    <router-link to="/equipos/captura" >
        <button id="reg"> ESTAMOS MEJORANDO PARA TI </button> 
    </router-link>

    <div class="container-section">
        <div class="section">
            <div class="card" style="width: 18rem;" v-for="p in equipment" @click="inspeccionar(p.serial)"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img :src="axios.defaults.baseURL + p.img" class="card-img-top" alt="...">
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
    </div>

    <!-- Modal -->
    <div class="modal fade width" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 id="title-modal" class="modal-title fs-5">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="body-modal-container"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Editar datos</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                </div>
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
            await this.equipments()
            this.isLoading = false

        }
    },

    methods: {
        async equipments() {
            const rs = await this.axios.get('/api/equipos');
            this.equipment = rs.data;
        },

        inspeccionar(search_serial) {
            let content = document.getElementById('body-modal-container')
            let title = document.getElementById('title-modal')
            let item = this.equipment.find(pro => pro.serial == search_serial)

            title.innerHTML = `
                <p> ${item.name}</p>
            
            `
            content.innerHTML = `
                <img src="${item.img}" class="card-img-top">
                <p><b> Serial: </b> ${item.serial}</p>
            `
        }
    },
};


</script>