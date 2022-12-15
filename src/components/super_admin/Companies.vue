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

            <router-link class="rotes" to="/super-admin/companies/restaurar">
                <button style="margin-left: 1rem;" type="button" class="btn btn-danger">Restaurar</button>
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
                    <span class="material-symbols-outlined icon azul" data-bs-toggle="modal" data-bs-target="#editModal"
                        @click="edit(p)">
                        edit
                    </span>
                    <span class="material-symbols-outlined icon gris" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click="insertar(p.name)">
                        clarify
                    </span>
                    <span class="material-symbols-outlined icon red" data-bs-toggle="modal"
                        data-bs-target="#deleteModal" @click="delete_companie(p)"> delete </span>
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

    <!-- Modal  EDITAR-->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Editar datos de compañia</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-content">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre cliente:</label>
                            <input v-model="datos_companie.name" type="text" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Telefono:</label>
                            <input v-model="datos_companie.phone_number" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Dirección:</label>
                            <input v-model="datos_companie.address" type="text" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">E-mail:</label>
                            <input v-model="datos_companie.email" type="email" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button id="liveToastBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="update()">Save
                                changes</button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal  ELIMINAR-->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <input v-model="del_companie.name" type="text" class="form-control" id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Telefono</label>
                            <input v-model="del_companie.phone_number" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Direccion</label>
                            <input v-model="del_companie.address" type="text" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input v-model="del_companie.email" type="email" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="destroy()">ELIMINAR</button>

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
            this.copy_companies = response.data.companies_list

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
        edit(p) {
            this.datos_companie = p;
            console.log(this.datos_companie)
            // Object.assign(this.datos_client, this.clients_list)
        },
        async update() {

            this.errors = {
                name: "",
                dni: "",
                phone_number: "",
                email: "",
                companies_id: "",
                roles_id: "",

            }
            this.toas = 'Editado correctamente'
            try {
                let id = this.datos_companie.id;
                let response = await this.axios.put("/api/companies/" + id, this.datos_companie);
                this.index();
            }
            catch (e) {
                console.log(e)
                this.errors = e.response.data.errors
            }

        },

        delete_companie(p) {
            this.del_companie = p;
            console.log(p)
        },
        async destroy() {
            let id = this.del_companie.id;
            let response = await this.axios.delete("/api/companies/" + id);
            this.index()

            this.toas = 'Eliminado correctamente'

        },

    }

}

</script>