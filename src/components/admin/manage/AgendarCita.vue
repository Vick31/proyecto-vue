

<script>

import { ref, reactive, watch } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {

    components: {
        Loading,
        FullCalendar, // make the <FullCalendar> tag available
    },
    data() {
        return {
            clients_list: [],
            biomedics_list: [],
            form: {
                title: "",
                start: "",
                end: "",
                description: "",
                users_id: "",
                clients_id: "",
            },
            token: '',
            user: {},
            isLoading: true,
            fullPage: true,

            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
                themeSystem: 'bootstrap5',
                initialView: 'dayGridMonth',
                editable: true,
                selectable: true,
                weekends: true,
                nowIndicator: true,
                locale: esLocale,
                dayMaxEvents: true,
                // height: 'auto',

                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,timeGridDay,listDay'
                },


                select: (arg) => {

                    var check = arg.start;
                    check = check.toLocaleDateString("en-GB");
                    var today = new Date();
                    today = today.toLocaleDateString("en-GB");

                    console.log( check, today )

                    if ( today <= check) {

                        document.getElementById('modal-cita').style.display = 'flex';

                        this.form.start = arg.startStr
                        this.form.end = arg.endStr
                    }
                    // si no, mostramos una alerta de error
                    else {
                        alert("No se pueden crear eventos en el pasado!");
                    }
                },
                eventClick: function (info) {

                    var eventObj = info.event;

                    if (eventObj.title) {

                        
                        const event_modal = document.getElementById('event-modal')
                        event_modal.style.display = 'flex'

                        const cont_modal = document.getElementById('cont')
                        cont_modal.innerHTML = ''

                        const content_event_modal = document.createElement('div')
                        content_event_modal.innerHTML = ""

                        content_event_modal.className = 'event-content'

                        content_event_modal.innerHTML = `

                            <h2>${ eventObj.title }</h2>

                            <div class="content-modal">   

                                <p class="text-event"> <b> Biomedico </b>: ${ eventObj.extendedProps.user } </p>
                                <p class="text-event"> <b> Nombre del cliente: </b> ${ eventObj.extendedProps.client } </p>
                                <p class="text-event"> <b>Fecha de inicio: </b> ${ eventObj.start.toLocaleDateString("en-US") } </p>
                                <p class="text-event"> <b>Fecha de fin: </b> ${ eventObj.end.toLocaleDateString("en-US") } </p>
                                <p class="text-event"> <b>Hora inicial: </b> ${ eventObj.extendedProps.time } </p>

                            </div>
                        `   
                        cont_modal.appendChild(content_event_modal)

                    } else {
                        alert('a ocurrido un error')
                    }
                }
            }
        }
    },
    mounted: async function () {



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

            await this.index()
            this.clients()

            this.isLoading = false

        }
    },
    methods: {

        async index() {

            let response = await axios.get("http://127.0.0.1:8000/api/citas")

            this.calendarOptions.events = response.data.events_list;

        },

        async clients() {

            let response = await axios.get("http://127.0.0.1:8000/api/clientes")

            this.clients_list = response.data
        },

        async biomedics() {

            let response = await axios.get("http://127.0.0.1:8000/api/user")

            this.biomedics_list = response.data
        },

        async register_cita() {
            try {
                const rs = await this.axios.post("/api/citas", this.form);

                document.getElementById('modal-cita').style.display = "none"

                this.$router.push({
                    name: 'AgendarCita',
                    params: { message: rs.data.message, },
                });

                this.form = {}

                this.index()
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
            document.getElementById('event-modal').style.display = 'none'

        },

        datos(){

        }
    },
}
</script>

<style scoped>
@import "../../../assets/css/styleCitas.css";

</style>

<template>

    <div class="calendario">
        <Loading v-model:active="isLoading" :can-cancel="false" :is-full-page=true />

        <div class="contenedor">
            <FullCalendar :options="calendarOptions" />
        </div>
    </div>

    <div id="event-modal" class="event-modal">
        <button @click="cerrar()">X</button>
        <div id="cont"></div>
    </div>

    <div class="modal-cita" id="modal-cita">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-body">
                        <div class="header">
                            <h3>Nueva cita</h3>
                        </div>
                        <form>
                            <div class="div-row">
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Cliente</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1"
                                        v-model="form.clients_id">
                                    <select name="" id="clients"></select>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Biomedico</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" v-model="form.users_id">
                                </div>
                            </div>
                            <div class="div-row">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">nombre</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" v-model="form.title">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">hora de inicio</label>
                                    <input type="time" class="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" v-model="form.time">
                                </div>
                            </div>
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                                    style="height: 100px" v-model="form.description"></textarea>
                                <label for="floatingTextarea2">Description</label>
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">color</label>
                                <input type="color" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="form.color">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="cerrar()" type="button" class="btn btn-secondary"
                        >Close</button>
                    <button type="button" @click="register_cita()">aceptar</button>
                </div>
            </div>
        </div>
    </div>

</template>