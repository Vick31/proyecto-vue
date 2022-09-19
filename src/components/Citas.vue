<template>
    <div class="header">
        <h3>Citas agendadas</h3>
        <router-link class="rotes" to="/agendar-cita">
            <button>
                Nueva cita
                <span class="material-symbols-outlined">
                    note_add
                </span>
            </button>
        </router-link>
    </div>

    <div class="container-body">
        <table class="table table-bordered">
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
                <tr>
                    <td>Vick asd assadasdasd asd asd</td>
                    <td>pruebas@gmail.com</td>
                    <td>2002/04/12</td>
                    <td>user</td>
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
    </div>
</template>



<script>
    export default {
    data() {
        return {
            token: '',
            user: {},
        }
    },
    mounted() {
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

    },
    methods: {
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
    },
}
</script>