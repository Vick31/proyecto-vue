<template>
    <div class="header">
        <div>
            <h6>Lista de usuarios</h6>
        </div>
        <div class="header-button">
            <router-link class="rotes" to="/users/register">
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
</template>
<style scoped>
@import "../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            articles_list: [],
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
            let response = await axios.get("http://127.0.0.1:8000/api/articles");
            this.articles_list = response.data.articles;
        },
        insertar(buscar) {
            let item = this.articles_list.find((pro) => pro.name == buscar);
            if (buscar != undefined) {
                console.log(item.name);

                localStorage.setItem("name", item.name);
            }
        },
    },
};
</script>