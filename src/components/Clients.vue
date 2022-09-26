<template>
    <div class="header">
        <div>
            <h6>Lista de clientes</h6>
        </div>
        <div class="header-button">
            <router-link class="rotes" to="/clientes/register">
                <button class="color-button-one">
                    Agregar usuario
                    <span class="material-symbols-outlined">
                        add_reaction
                    </span>
                </button>
            </router-link>

            <button class="color-button">
                Generar reporte
                <span class="material-symbols-outlined">
                    summarize
                </span>
            </button>
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Documento</th>
                <th scope="col">name</th>
                <th scope="col">Telefono</th>
                <th scope="col">equipo</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in clients_list">
                <td>{{p.dni}}</td>
                <td>{{p.name}}</td>
                <td>{{p.phone_number}}</td>
                <td>{{p.equipment_id}}</td>
                <td>
                    <span class="material-symbols-outlined color-orange">
                        edit_square
                    </span>
                    <span class="material-symbols-outlined color-red">
                        delete
                    </span>
                </td>
            </tr>

        </tbody>
    </table>
</template>
<style scoped>
@import "../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            clients_list: [],
            token: '',
            user: {},
        };
    },
    mounted() {
        // this.get_token();
        if (localStorage.token) {
            this.token = localStorage.token;
            this.get_user();
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder con esta cuenta"
                }
            })
        }
        this.index();
    },

    methods: {
        // async get_token() {
        //     await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        // },

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
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
                })
            }
        },
        async index() {
            let response = await axios.get("http://127.0.0.1:8000/api/clientes")
            this.clients_list = response.data
        },
    },
};
</script>