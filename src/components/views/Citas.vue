<template>


    <div class="header">
        <h4>Citas agendadas</h4>
        <router-link class="rotes" to="/agendar/citas">
            <button>
                Nueva cita
            </button>
        </router-link>
    </div>

    <div class="container-body">
        <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />

        <div class="container-table">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Date created</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in citas_list">
                        <td>{{ p.description }}</td>
                        <td>{{ p.users_id }}</td>
                        <td>{{ p.date }}</td>
                        <td>user</td>
                        <td>
                            <span class="material-symbols-outlined color-orange">
                                edit_square
                            </span>
                            <button type="button" @click="cita_destroy(p)" class="btn btn-primary"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <span class="material-symbols-outlined color-red">
                                    delete
                                </span>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h3> ¿Está seguro de eliminar? </h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="destroy()" class="btn btn-primary" data-bs-dismiss="modal"
                        id="liveToastBtn">aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Cita</strong>
                <small>Ahora</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Eliminada correctamente
            </div>
        </div>
    </div>

    <FullCalendar v-bind:options="options" />
</template>

<style scoped>
@import "../../assets/css/styleCitas.css";
</style>

<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    data() {
        return {
            citas_list: [],
            cita_delete: {},
            token: '',
            user: {},
            isLoading: true,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    mounted: async function () {

        
        if (localStorage.token) {
            
            this.token = localStorage.token;
            
            await this.index()

            this.isLoading = false

        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder con esta cuenta"
                }
            })
        }
        this.iniciador()
    },
    methods: {

        async index() {
            let response = await axios.get("http://127.0.0.1:8000/api/citas")
            this.citas_list = response.data
        },

        cita_destroy(p) {
            this.cita_delete = p
        },

        async destroy() {
            let id = this.cita_delete.id
            let response = await axios.delete("http://127.0.0.1:8000/api/citas/" + id)
            this.index()
        },
        iniciador() {
            const toastTrigger = document.getElementById('liveToastBtn')
            const toastLiveExample = document.getElementById('liveToast')
            if (toastTrigger) {
                toastTrigger.addEventListener('click', () => {
                    const toast = new bootstrap.Toast(toastLiveExample)

                    toast.show()
                })
            }
        }
    },
}



</script>
