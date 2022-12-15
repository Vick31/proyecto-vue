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
            <router-link class="rotes" to="/usuarios/register-user">
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos de usuario</h1>
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
                            <label for="exampleInputEmail1">Apellido</label>
                            <input v-model="datos_client.last_name" type="text" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Documento Cliente</label>
                            <input v-model="datos_client.dni" type="number" class="form-control"
                                id="exampleInputEmail1">
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button id="liveToastBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="update()">Guardar cambios</button>

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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-content">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nombre cliente</label>
                            <input disabled v-model="del_client.first_name" type="text" class="form-control"
                                id="exampleInputEmail1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Apellido</label>
                            <input disabled v-model="del_client.last_name" type="text" class="form-control"
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
@import "../../../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            search: '',
            copy_users_list: [],
            users_list: [],
            datos_client: [],
            token: "",
            roles: [],
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

            if (localStorage.rol != 2) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
                this.token = null
            }
            this.index();
            this.get_roles();
            this.token = localStorage.token;
        }
    },

    methods: {
        async index() {
            let response = await this.axios.get("/api/users");
            this.copy_users_list = response.data.users_list;

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
                <p> <b>Nombre:</b> ${item.first_name + ' ' + item.last_name}</p>
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
                (pro) => (pro.first_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
                    (pro.last_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
                    (pro.dni.toString().indexOf(this.search) > -1)
            )
        },
        edit(p) {
            this.datos_client = p;
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

            this.datos_client.roles_id = 3

            try {
                let id = this.datos_client.id;
                let response = await this.axios.put("/api/users/" + id, this.datos_client);
                this.index();
                alert('Actualizado correctamente')
            }
            catch (e) {
                alert('Error al actualizar')
                this.errors = e.response.data.errors
            }

        },

        delete_users(p) {
            this.del_client = p;
        },
        async destroy() {
            try {

                let id = this.del_client.id;
                let response = await this.axios.delete("/api/users/" + id);
                this.index()

            } catch {
                alert('No se puede eliminar el usuario')
            }

        },
        async get_roles() {
            try {
                const response = await this.axios.get("/api/roles")
                this.roles = response.data
            }

            catch (e) {
                alert('falla')
            }
        },
    }
};
</script>