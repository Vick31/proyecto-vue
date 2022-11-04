<template>
  <div class="header">
    <div>
      <h4>Lista de clientes</h4>
    </div>
    <div class="header-button">
      <button class="color-button">
        Generar reporte
        <span class="material-symbols-outlined"> summarize </span>
      </button>
      <router-link class="rotes" to="/user/registrar/cliente">
        <button type="button" id="rotess" class="toggle-btn">
          Agregar cliente
          <span class="material-symbols-outlined"> add_reaction </span>
        </button>
      </router-link>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Documento</th>
          <th scope="col">name</th>
          <th scope="col">Telefono</th>
          <th scope="col">equipo</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in clients_list">
          <td>{{ p.dni }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.phone_number }}</td>
          <td>{{ p.equipment_id }}</td>
          <td>
            <span class="material-symbols-outlined color-orange">
              edit_square
            </span>
            <span class="material-symbols-outlined color-red"> delete </span>
            <span
              class="material-symbols-outlined"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="insertar(p.dni)"
            >
              clarify
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" v-for="p in datos_client">
            <p>{{ p.name }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/styleHome.css";
</style>


<script>
export default {
  data() {
    return {
      clients_list: [],
      datos_client: [],
      token: "",
      user: {},
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;

      this.index();
    } else {
      this.$router.push({
        name: "Login",
        params: {
          message: "No estas autorizado para acceder con esta cuenta",
        },
      });
    }
  },

  methods: {
    async index() {
      let response = await axios.get("http://127.0.0.1:8000/api/clientes");
      this.clients_list = response.data;
    },

    insertar(buscar) {
      let item = this.clients_list.find((pro) => pro.dni == buscar);
      if (buscar != undefined) {
        // this.datos_client.push(item)
        this.datos_client.push(item);
        console.log(item);
      }
    },
  },
};
</script>