<script setup>

import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

const id = ref(0)
let title = 'hola'
const options = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    weekends: true,
    select: (arg) => {

        // document.getElementById('modal-cita').style.display = "flex"
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        id.value = id.value + 1

        const cal = arg.view.calendar
        cal.unselect()
        cal.addEvent({
            id: `${id.value}`,
            title: `${title}`,
            start: arg.start,
            end: arg.end,
            allDay: true,
            color: color,
        })
    },
    eventClick: (arg) => {
        // console.log('editar')
    },



})

</script>

<script>
export default {
    data() {
        return {
            form: {
                date: "",
                description: "",
                users_id: "",
                clients_id: "",
                reports_id: "",
            },
            token: '',
            user: {},
        }
    },
    mounted() {
        this.get_token()
        if (localStorage.token) {
            this.token = localStorage.token;
            this.get_user();
        }
        else {
            this.$router.push({
                name: "Login",
                params: { message: "No estas autorizado para acceder con esta cuenta" }
            })
        }
    },
    methods: {

        async get_token() {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        },
        async get_user() {
            try {
                const rs = await this.axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = rs.data.user;
            }
            catch (e) {
                this.$router.push({
                    name: "Login",
                    params: { message: "No estas autorizado para acceder con esta cuenta" }
                })
            }
        },
        async register_cita() {
            try {
                const rs = await this.axios.post("/api/citas", this.form);
                this.$router.push({
                    name: 'Citas',
                    params: { message: rs.data.message, },
                });
            }
            catch (e) {
                this.errors = {},
                    this.message = null;
                if (e.response.data.errors) this.errors = e.response.data.errors;
                else if (e.response.data.message) this.errors = e.response.data.message;
                console.log(e)
            }
        },
        cerrar() {
            document.getElementById('modal-cita').style.display = "none"
        }
    },
}
</script>


<style>
#modal-cita {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: none;

    background-color: rgb(165, 162, 162);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
</style>




<template>

    <FullCalendar v-bind:options="options" />

    <div class="modal-cita" id="modal-cita">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="header">
                        <h3>Nueva cita</h3>
                    </div>
                    <div class="container-body">
                        <form>
                            <div class="div-row">
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Cliente</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1"
                                        v-model="form.clients_id">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Biomedico</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" v-model="form.users_id">

                                    <select name="" id="co">
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">fecha</label>
                                <input type="date" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="form.date">
                            </div>
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                    style="height: 100px" v-model="form.description"></textarea>
                                <label for="floatingTextarea2">Description</label>
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Reporte</label>
                                <input type="text" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="form.reports_id">
                            </div>
                            <button type="button" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="cerrar()" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="destroy()" class="btn btn-primary" data-bs-dismiss="modal"
                        id="liveToastBtn">aceptar</button>
                </div>
            </div>
        </div>
    </div>

</template>