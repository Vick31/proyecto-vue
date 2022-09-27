<template>
  
  <div>
    <h5>¿Olvidaste tu contraseña?</h5>
    <br>
    <form id="te">
      <h1 class="n3 mb-3 fw">Confirma tu correo electrónico</h1>
      <div class="form-floating pb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="email"
          v-model="email"
        />
        <label for="floatingInput">Correo electronico</label>
        <span v-if="errors.email">{{ errors.email[0] }}</span>
      </div>
      <button type="button" @click="send_email" class="btn btn-primary">
        Reenviar correo
      </button>
       <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<style scoped>
  @import "../../assets/css/styleForgotPassword.css";
</style>


<script>

export default {
    data() {
        return {
            message: null,
            email: "",
            errors: {},
        };
    },
    mounted() {
    },

    methods: {
        async send_email() {
            try {
                
                const rs = await this.axios.post("/api/forgot-password", {email: this.email});
                this.$router.push({
                    name: 'Home',
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
            }

        },
    },
};
</script>