<template>
    <div class="header">
        <div>
            <h2>Personal de la compañia</h2>
        </div>
        <div class="header-button">
            <div class="search">
                <input class="input-search" type="text" placeholder="Buscar" v-model="search" @keyup="filtrar">
                <span @click="limpiar()" class="material-symbols-outlined close-search">close</span>
            </div>
            <router-link class="rotes" to="/super-admin/register/admin">
                <button type="button" class="btn btn-primary">Registrar usuario</button>
            </router-link>
        </div>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">DOCUMENTO</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">NÚMERO DE CELULAR</th>
                <th scope="col">CORREO ELECTRÓNICO</th>
                <th scope="col">ROL</th>
                <th scope="col">ACCIÓN</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in users_list">
                <td>C.C. {{ p.dni }}</td>
                <td>{{ p.first_name + ' ' + p.last_name }}</td>
                <td>{{ p.phone_number }}</td>
                <td>{{ p.email }}</td>
                <td>{{ p.rol }}</td>
                <td class="action">
                    <span class="material-symbols-outlined icon azul" data-bs-toggle="modal" data-bs-target="#editModal"
                        @click="edit(p)">
                        edit
                    </span>
                    <span class="material-symbols-outlined icon gris" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click="insertar(p.dni)">
                        clarify
                    </span>
                    <span class="material-symbols-outlined icon red" data-bs-toggle="modal"
                        data-bs-target="#deleteModal" @click="delete_users(p)"> delete </span>
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
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal  EDITAR-->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <input v-model="datos_client.first_name" type="text" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Documento Cliente</label>
                            <input v-model="datos_client.dni" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>

                        <div class="form-group" style="position: relative;">
                            <label for="exampleInputEmail1">Documento Cliente</label>
                            <input v-model="searchU" @keyup="filtrarUser" type="text" class="form-control"
                                id="exampleInputEmail1">

                            <div id="capa" style="transition: 300ms all; transform: scale(0); padding: 0.5rem; border-radius: 10px; width: 15rem; height: 7rem; position: absolute; right: 0rem; z-index: 100; background-color: white;">
                                <div v-for="i in roles">
                                    <span style="cursor: pointer; width: 100%;" @click="enviar(i.name)">{{i.name}}</span>
                                </div>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="exampleInputEmail1">Telefono</label>
                            <input v-model="datos_client.phone_number" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input v-model="datos_client.email" type="email" class="form-control"
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
                            <input disabled v-model="del_client.name" type="text" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Documento Cliente</label>
                            <input disabled v-model="del_client.dni" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Telefono</label>
                            <input disabled v-model="del_client.phone_number" type="number" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Direccion</label>
                            <input disabled v-model="del_client.address" type="text" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input disabled v-model="del_client.email" type="email" class="form-control"
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
            search: '',
            searchU: '',
            copy_users_list: [],
            users_list: [],
            datos_client: [],
            token: "",
            roles: [],
            copy_roles: '',
            user: {},
            del_client: [],
            modal: {},
            errors: {},
            toas: ''
        };
    },
    created() {

    },
    mounted() {
        if (localStorage.token) {

            if (localStorage.rol != 1) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }
            this.token = localStorage.token;
            this.get_roles();
            this.index();
        }
        console.log(this.roles)
    },

    methods: {
        async index() {
            let response = await this.axios.get("/api/users");
            this.copy_users_list = response.data.admins_list;

            this.users_list = this.copy_users_list

        },

        insertar(buscar) {
            let item = this.users_list.find((pro) => pro.dni == buscar);
            if (buscar != undefined) {

                this.datos_client.push(item);
                let modal = document.getElementById('modal-content')
                modal.innerHTML = `
                <p> <b>Rol:</b> ${item.rol}</p>
                <p> <b>Documento de identidad:</b> ${item.dni}</p>
                <p> <b>Nombre:</b> ${item.name}</p>
                <p> <b>Número de celular:</b> ${item.phone_number}</p>
                <p> <b>Correo electrónico:</b> ${item.email}</p>
              `
            }
        },

        limpiar() {
            this.search = ''
            this.users_list = this.copy_users_list
        },

        filtrar() {

            this.users_list = this.copy_users_list.filter(
                (pro) => (pro.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
                    (pro.dni.toString().indexOf(this.search) > -1)
            )
        },
        edit(p) {
            this.datos_client = p;
            this.searchU = this.datos_client.rol
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

            

            try {
                let id = this.datos_client.id;
                let response = await this.axios.put("/api/users/" + id, this.datos_client);
                this.index();
                alert('Actualizado correctamente')
            }
            catch (e) {
                console.log(e)
                alert('Error al actualizar')
                this.errors = e.response.data.errors
            }

        },

        delete_users(p) {
            this.del_client = p;
            console.log(p)
        },
        async destroy() {
            let id = this.del_client.id;
            let response = await this.axios.delete("/api/users/" + id);
            this.index()

            this.toas = 'Eliminado correctamente'

        },
        async get_roles() {
            try {
                const response = await this.axios.get("/api/roles")
                this.copy_roles = response.data
                this.roles = this.copy_roles
            }

            catch (e) {
                alert('falla')
            }
        },

        enviar(buscar) {
            let item = this.roles.find((pro) => pro.name == buscar)
            this.searchU = item.name
            let capa = document.getElementById('capa')
            capa.style.transform = 'scale(0)'
            this.datos_client.roles_id = item.id
            console.log(item)

        },

        filtrarUser() {
            let capa = document.getElementById('capa')
            capa.style.transform = 'scale(1)'
            this.roles = this.copy_roles.filter(
                (pro) => (pro.name.toLowerCase().indexOf(this.searchU.toLowerCase()) > -1) |
                    (pro.id.toString().indexOf(this.searchU) > -1)
            )
        },
    }
};
</script>