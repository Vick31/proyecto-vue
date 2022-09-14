<template>

  <div class="container-body" v-if="this.$route.path != '/register'">
    <div class="aside">
      <div class="title-aside">
        <h4>SIGEM</h4>
      </div>
      <div class="body-aside">
        <ul>
          <router-link class="rotes" to="/home">
          <li>
              <span class="material-symbols-outlined">home</span>
              <p>Home</p>
            </li>
          </router-link>
        </ul>
        <ul>
          <small>INTERFACE</small>
          <router-link class="rotes" to="/citas">
          <li>
              <span class="material-symbols-outlined">
                event
              </span>
              <p>Citas</p>
            </li>
          </router-link>
          <li>
            <span class="material-symbols-outlined">
              groups
            </span>
            <p>Clientes</p>
          </li>
        </ul>
        <ul>
          <small>OTROS</small>
          <li>
            <span class="material-symbols-outlined">
              diversity_3
            </span>
            <p>Medicos</p>
          </li>
          <li>
            <span class="material-symbols-outlined">
              medication_liquid
            </span>
            <p>Especialidades médicas</p>
          </li>
          <li>
            <span class="material-symbols-outlined">
              schedule
            </span>
            <p>horarios</p>
          </li>
          <li>
            <span class="material-symbols-outlined">
              group
            </span>
            <p>Usuarios</p>
          </li>
          <li>
            <span class="material-symbols-outlined">
              live_help
            </span>
            <p>Acerca de</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="section">
      <div id="nav">
        <nav class="navbar ">
          <div class="container-fluid">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <router-link class="rotes account-logo" to="/account">
              <span>Admin</span>
              <img src="../img/logos-cuentas/user_account_profile_admin-512.png" alt="">
            </router-link>
          </div>
        </nav>
      </div>
      <div class="container-section">
        <router-view>
        </router-view>
      </div>
    </div>
  </div>

</template>



<style scoped>
@import "../src/assets/css/styleApp.css";
@import "../src/assets/css/styleLogin.css";
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