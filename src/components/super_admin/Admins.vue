<template>
    <div class="header">
        <h4>Lista de administradores</h4>

        <router-link to="/super-admin/register/admin">
            <button class="btn btn-primary">Registrar administrador</button>
        </router-link>
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
            <tr v-for="p in admins">
                <td>{{ p.first_name }}</td>
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
</template>
  
  
<style scoped>
@import "../../assets/css/styleHome.css";
</style>
  
<script>
export default {
    data() {
        return {
            admins: [],
            errors: {},
            token: '',
            user: {},
        };
    },
    mounted() {

        if (localStorage.token) {
            this.token = localStorage.token;
            this.index()
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder con esta cuenta"
                }
            })
        }
    },

    methods: {
        async index() {
            let response = await this.axios.get("api/users")
            this.admins = response.data.admins_list
        },
    },
};
</script>