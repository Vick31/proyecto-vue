<template>
    <div class="header">
        <div>
            <h2>Listado de clientes</h2>
        </div>
        <div class="header-button">
            <div class="search">
                <input class="input-search" type="text" placeholder="Buscar" v-model="search" @keyup="filtrar">
                <span @click="limpiar()" class="material-symbols-outlined close-search">close</span>
            </div>
            <router-link class="rotes" to="/user/registrar/cliente">
                <button type="button" class="btn btn-primary">Registrar cliente</button>
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
                    <span class="material-symbols-outlined icon gris" data-bs-toggle="modal"
                        data-bs-target="#exampleModal" @click="insertar(p.dni)">
                        clarify
                    </span>

                </td>
            </tr>
        </tbody>
    </table>



    <!-- Modal  VER-->
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        @click="cancel_modal()">Close</button>
                    <button type="button" class="btn btn-primary" @click="update()">Save changes</button>
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
            copy_clients_list: [],
            clients_list: [],
            datos_client: [],
            token: "",
            user: {},
            del_client: {},
            modal: {},
            errors: {}

        };
    },
    created() {

    },
    mounted() {
        if (localStorage.token) {

            if (localStorage.getItem('rol') == 1) {
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

        this.errors = {
            name: "",
            dni: "",
            phone_number: "",
            address: "",
            email: "",
        }
    },

    methods: {
        async index() {
            let response = await this.axios.get("/api/clientes");
            this.copy_clients_list = response.data;

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




    },
};
</script>