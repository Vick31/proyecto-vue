<template>
      <div class="content">
            <div class="modal-header">
            </div>
            <div class="modal-body">
                  <h2 class="modal-title" id="staticBackdropLabel">Iniciar sesion</h2>
                  <div id="body-login">
                        <div>
                              <form id="form-login">
                                    <div class="form-floating pb-3">
                                          <input type="email" class="form-control" id="floatingInput" name="email"
                                                v-model="form.email" />
                                          <label for="floatingInput">Correo electronico</label>
                                          <span class="errors-message" v-if="errors.email">{{
                                          errors.email[0] }}</span>
                                    </div>

                                    <div class="form-floating pb-3">
                                          <input type="password" class="form-control" id="floatingPassword"
                                                name="password" v-model="form.password" />
                                          <label for="floatingPassword">Password</label>
                                          <span class="errors-message" v-if="errors.password">{{
                                          errors.password[0] }} </span>
                                    </div>


                                    <p v-if="message">{{ message }}</p>
                              </form>
                        </div>
                  </div>
                  <div class="modal-footer">
                        <button class="forgotPassword">
                              <router-link to="/forgot-password" class="contraseña">¿Olvidaste tu contraseña?
                              </router-link>
                        </button>
                        <button class="Login" @click="login()">
                              Login
                        </button>
                  </div>
            </div>
      </div>
</template>

<style scoped>
@import "../assets/css/styleLogin.css";
</style>

<script>
export default {
      data() {
            return {
                  message: null,
                  form: {
                        email: "",
                        password: "",
                  },
                  errors: {},
            };
      },
      mounted() {
            if (this.$route.params.message)
                  this.message = this.$route.params.message

      },

      methods: {
            async login() {
                  try {
                        const rs = await this.axios.post("/api/login", this.form);
                        this.$router.push({
                              name: 'Account',
                              //params: { token: rs.data.token, },                    
                        });
                        localStorage.token = rs.data.token
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