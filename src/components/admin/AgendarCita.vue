<template>
    <div class="header">
        <h3>Nueva cita</h3>
    </div>
    <div class="container-body">
        <form>
            <div class="div-row">
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Cliente</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model="form.clients_id">
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Biomedico</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.users_id">

                    <select name="" id="co">
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">fecha</label>
                <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="form.date">
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px" v-model="form.description"></textarea>
                <label for="floatingTextarea2">Description</label>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Reporte</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="form.reports_id">
            </div>
            <button type="button" class="btn btn-primary" @click="register_cita()">Submit</button>
        </form>
    </div>
</template>

<style>
.div-row {
    display: flex;
    flex-direction: row
}
</style>


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
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder con esta cuenta"
                }
            })
        }
        // this.buscar()
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
                    params: {
                        message: "No estas autorizado para acceder con esta cuenta"
                    }
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

                if (e.response.data.errors)
                    this.errors = e.response.data.errors;

                else if (e.response.data.message)
                    this.errors = e.response.data.message;

                console.log(e)
            }

        },

        buscar() {
            let con = document.getElementById("co")

            const carro = [
                {
                    id: 1,
                    nombre: 'a'
                },
                {
                    id: 2,
                    nombre: 'b'
                },
                {
                    id: 3,
                    nombre: 'c'
                }
            ]

            carro.forEach((p) => {
                let select = document.createElement("option")
                select.innerHTML = `

                    <p>${p.nombre}</p>

                    `
                con.append(select)

                var nomre = []

                select.addEventListener("click", () => {
                    console.log('si')
                    nomre.push({ id: p.id, nombre: p.nombre })

                    console.log(nomre)

                    alert('si')
                })

            })

        }
    },
}
</script>