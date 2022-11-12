<template>
    <router-link to="/equipos/captura">hola </router-link>
    <div class="container-section" v-for="p in equipment">
        <div class="card" style="width: 18rem;">
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
export default {

    data() {
        return {
            equipment: []
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
            this.equipments()

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