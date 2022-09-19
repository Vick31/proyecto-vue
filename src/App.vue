<template>

  <div class="container-body">
    <router-view name="aside"></router-view>
    <div class="section">
      <router-view name="navbar"></router-view>
      <div class="container-section">
        <router-view></router-view> 
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