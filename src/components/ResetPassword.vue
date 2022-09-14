<template>
  <h1>Restablecer contraseña</h1>
  <br />
  <form>
    <div class="form-floating pb-3">
      <input
        type="email"
        class="form-control"
        placeholder="name@example.com"
        name="email"
        v-model="form.email"
      />
      <label for="floatingInput">Correo electronico</label>
      <span v-if="errors.email">{{ errors.email[0] }}</span>
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="contraseña"
        name="password"
        v-model="form.password"
      />
      <span v-if="errors.password">{{ errors.password[0] }} </span>
    </div>
    <div class="mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="confirmar contraseña"
        name=" password_confirmation"
        v-model="form.password_confirmation"
      />
      <span v-if="errors.password_confirmation"
        >{{ errors.password_confirmation[0] }}
      </span>
    </div>
    <button type="button" @click="change_password" class="btn btn-primary">
      Restablecer contraseña
    </button>
    <br />
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script>

export default {
    data() {
        return {
            message: '',
            form: {
                email: "",
                password: "",
                token: '',
            },
            errors: {},
        };
    },
    mounted() {
        if (this.$route.query.token)
            this.form.token = this.$route.query.token
    },

    methods: {
        async change_password() {
            try {
                const rs = await this.axios.post("/api/reset-password", this.form);

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

                if (e.response.data.message)
                    this.errors = e.response.data.message;                    
            }

        },
    },
};
</script>