<template>
  <div class="fond"></div>
  <img src="../../img/fondo.jpg" alt="">

  <div class="div-form">
    <form>
      <h1 class="title">Registrarse</h1>
      <div class="form-floating pb-3">
        <input type="name" class="form-control" name="name" v-model="form.name" />
        <label for="floatingInput">Nombre</label>
        <span v-if="errors.name">{{ errors.name[0] }}</span>
      </div>
      <div class="form-floating pb-3">
        <input type="text" class="form-control" name="email" v-model="form.email" />
        <label for="floatingInput">Correo electronico</label>
        <span v-if="errors.email">{{ errors.email[0] }}</span>
      </div>
      <div class="form-floating pb-3">
        <input type="password" class="form-control" name="password" v-model="form.password" />
        <label for="floatingInput">Contraseña</label>
        <span v-if="errors.password">{{ errors.password[0] }} </span>
      </div>
      <div class="form-floating pb-3">

        <input type="password" class="form-control" name=" password_confirmation"
          v-model="form.password_confirmation" />
        <label for="floatingInput">Confirmar Contraseña</label>
        <span v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}
        </span>
      </div>
      <button type="button" @click="register_user()" class="btn btn-primary save">
        Guardar
      </button>
      <br />
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>


<style scoped>
@import "../assets/css/styeRegister.css";
</style>

<script>

export default {
  data() {
    return {
      message: '',
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
    };
  },
  mounted() {
  },

  methods: {
    async register_user() {
      try {
        const rs = await this.axios.post("/api/register", this.form);

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

        console.log(e)
      }

    },
  },
};
</script>