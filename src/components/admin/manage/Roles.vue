<template>
    <div class="cont-roles">
        <form class="form">
            <h2>Crear nuevo rol</h2>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nombre del rol</label>
                <input v-model="form.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">¿Es admin?</label>
                <input v-model="form.is_admin" type="number" class="form-control" id="exampleInputPassword1">
                <div id="emailHelp" class="form-text">Si es admin 1, sino es admin 0 (solo se puede asignar uno de los dos números)</div>
            </div>

            <button @click="register_rol()" type="button" class="btn btn-primary">Crear</button>
        </form>

        <div>
            <h2>Roles creados</h2>
            <div class="roles">
                <p><b>id</b></p>
                <p><b>Nombre</b></p>
            </div>
            <div class="roles" v-for="p in roles_list">
                <p> {{ p.id }} </p>
                <p> {{ p.name }} </p>
            </div>
        </div>
    </div>

</template>


<style >
    .cont-roles {
        display: flex;
        justify-content: space-around;
    }

    .form{
        width: 500px;
    }
    .roles{
        display: flex;
        justify-content: space-between;
    }
    h2 {
        margin-bottom: 2rem;
    }
</style>


<script>
export default {
    data() {
        return {
            roles_list: [],
            form:{
                name: '',
                is_admin: '',
            }
        };
    },
    mounted() {
        this.roles()
    },

    methods: {

        async roles() {
            const rs = await this.axios.get('/api/roles');
            this.roles_list = rs.data;
        },

        async register_rol() {
            try {
                const rs = await this.axios.post("/api/roles", this.form);

                // this.$router.push({
                //     name: 'Clients',
                //     params: { message: rs.data.message, },

                // });

                this.form = ''
                this.roles()
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
    },
};


</script>