<template>

</template>
<style scoped>
@import "../../assets/css/styleHome.css";
</style>


<script>
export default {
    data() {
        return {
            token: '',
            user: {},
        };
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
        this.get_token();
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
        async get_token() {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        },
    },
};
</script>