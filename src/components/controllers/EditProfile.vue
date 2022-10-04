<template>
    <div class="form-body">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Compania perteneciente</label>
                <input v-model="user.companies_id" type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>
            
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Rol de usuario</label>
                <input v-model="user.roles_id" type="number" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nombre de usuario</label>
                <input v-model="user.name" type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Dirección de correo</label>
                <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Número de contacto</label>
                <input v-model="user.phone_number" type="number" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp">
            </div>



            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

</template>

<style scoped>
    @import "../../assets/css/styleAccount.css";
    </style>
            


<script>
export default {

    data() {
        return {
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

        async logout() {
            try {

                const rs = await this.axios.get("/api/logout", {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                localStorage.clear();

                this.$router.push({

                    name: "Login",
                    params: {
                        message: rs.data.message,
                    },
                });
            } catch (e) {
                // console.log(e)
                this.$router.push({
                    name: "Login",
                    params: {
                        message: e.response.data.message,
                    },
                });
            }
        }
    },
}
</script>