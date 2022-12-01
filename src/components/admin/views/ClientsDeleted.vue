<template>
    <div class="header">
        <div>
            <h2>Listado de clientes eliminados</h2>
        </div>
        <div class="header-button">
            <div class="search">
                <input class="input-search" type="text" placeholder="Buscar" v-model="search" @keyup="filtrar">
                <span @click="limpiar()" class="material-symbols-outlined close-search">close</span>
            </div>
        </div>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">DOCUMENTO</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">NÚMERO DE CELULAR</th>
                <th scope="col">CORREO ELECTRÓNICO</th>
                <th scope="col">ACCIÓN</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in clients_list">
                <td>C.C. {{ p.dni }}</td>
                <td>{{ p.name }}</td>
                <td>{{ p.phone_number }}</td>
                <td>{{ p.email }}</td>
                <td class="action">
                    <span class="material-symbols-outlined icon red" data-bs-toggle="modal"
                        data-bs-target="#Modal" @click="restore_client(p)"> autorenew </span>
                </td>
            </tr>
        </tbody>
    </table>



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
                            <input v-model="datos_client.name" type="text" class="form-control" id="exampleInputEmail1">
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
                            <label for="exampleInputPassword1">Direccion</label>
                            <input v-model="datos_client.address" type="text" class="form-control"
                                id="exampleInputPassword1">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input v-model="datos_client.email" type="email" class="form-control"
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
@import "../../../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            search: '',
            copy_clients_list: [],
            clients_list: [],
            datos_client: [],
            token: "",
            user: {},
            del_client: [],
            modal: {},
            errors: {}
        }
    },
    created() {

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

            this.index();
            this.token = localStorage.token;
        }
    },

    methods: {
        async index() {
            let response = await this.axios.get("/api/clientes");
            this.copy_clients_list = response.data.clients_delete;

            this.clients_list = this.copy_clients_list

        },

        insertar(buscar) {
            let item = this.clients_list.find((pro) => pro.dni == buscar);
            if (buscar != undefined) {
                // this.datos_client.push(item)
                this.datos_client.push(item);
                let modal = document.getElementById('modal-content')
                modal.innerHTML = `
                    <p> <b>Documento de identidad:</b> ${item.dni}</p>
                    <p> <b>Nombre:</b> ${item.name}</p>
                    <p> <b>Número de celular:</b> ${item.phone_number}</p>
                    <p> <b>Correo electrónico:</b> ${item.email}</p>
                    <p> <b>Dirección:</b> ${item.address}</p>
                `
            }
        },

        limpiar() {
            this.search = ''
            this.clients_list = this.copy_clients_list
        },

        filtrar() {

            this.clients_list = this.copy_clients_list.filter(
                (pro) => (pro.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
                    (pro.dni.toString().indexOf(this.search) > -1)
            )
        },
        restore_client(p) {
            this.datos_client = p;
            this.datos_client.deleted_at = null

            console.log(this.datos_client)

        },
        async restores() {

            try {
                let id = this.datos_client.id;
                let response = await this.axios.delete(`/api/clientes/restore/${id}`);
                this.index();

                console.log(response.data.message)
            }
            catch (e) {
                console.log(e.response.data.message)
                this.errors = e.response.data.errors
            }

        },
    },
};
</script>