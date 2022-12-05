<template>

    <div class="header">
        <div>
            <h2>Compañias</h2>
        </div>
        <div class="header-button">
            <div class="search">
                <input class="input-search" type="text" placeholder="Buscar" v-model="search" @keyup="filtrar">
                <span @click="limpiar()" class="material-symbols-outlined close-search">close</span>
            </div>
            <router-link class="rotes" to="/super-admin/companies/registrar">
                <button type="button" class="btn btn-primary">Registrar compania</button>
            </router-link>
        </div>
    </div>


    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">NOMBRE</th>
                <th scope="col">NÚMERO DE CELULAR</th>
                <th scope="col">CORREO ELECTRÓNICO</th>
                <th scope="col">ACCIÓN</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in companies">
                <td>{{ p.name }}</td>
                <td>{{ p.phone_number }}</td>
                <td>{{ p.email }}</td>
                <td class="action">

                    <span class="material-symbols-outlined icon red" data-bs-toggle="modal"
                        data-bs-target="#Modal" @click="restore_companie(p)"> autorenew </span>
                </td>
            </tr>
        </tbody>
    </table>


    <!-- Modal ver -->

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del cliente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-content">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal  RESTORE-->
    <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edicion cliente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-content">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre cliente</label>
                            <input v-model="datos_companie.name" type="text" class="form-control" id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Telefono</label>
                            <input v-model="datos_companie.phone_number" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Direccion</label>
                            <input v-model="datos_companie.address" type="text" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input v-model="datos_companie.email" type="email" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="restores()">Restaurar</button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>






</template>


<style scoped>
@import "../../assets/css/styleHome.css";
</style>




<script>

export default {

    data() {
        return {
            companies: [],
            copy_companies: [],
            datos_companie: [],
            del_companie: [],
        }
    },

    mounted() {

        this.index()
    },

    methods: {

        async index() {


            let response = await this.axios.get("api/companies")
            this.copy_companies = response.data.companies_delete

            this.companies = this.copy_companies
        },



        insertar(buscar) {
            let item = this.companies.find((pro) => pro.name == buscar);
            if (buscar != undefined) {
                let modal = document.getElementById('modal-content')
                modal.innerHTML = `
                <p> <b>Nombre:</b> ${item.name}</p>
                <p> <b>Número de celular:</b> ${item.phone_number}</p>
                <p> <b>Correo electrónico:</b> ${item.email}</p>
              `
            }
        },

        limpiar() {
            this.search = ''
            this.companies = this.copy_companies
        },

        filtrar() {

            this.companies = this.copy_companies.filter(
                (pro) => (pro.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
            )
        },
        restore_companie(p) {
            this.datos_companie = p;
            this.datos_companie.deleted_at = null

            console.log(this.datos_companie)

        },
        async restores() {

            try {
                let id = this.datos_companie.id;
                let response = await this.axios.delete(`/api/companies/restore/${id}`);
                this.index();

                console.log(response.data.message)
            }
            catch (e) {
                console.log(e.response.data.message)
                this.errors = e.response.data.errors
            }

        },
    }
}

</script>