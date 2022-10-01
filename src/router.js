import { createWebHistory, createRouter } from "vue-router";

//Register
import RegisterClients from "./components/admin/RegisterClients.vue";
import RegisterAdmins from "./components/admin/RegisterAdmin.vue"
import AgendarCita from "./components/admin/AgendarCita.vue";
import Register from "./components/admin/Register.vue"

//Acount
import Login from "./components/views/Login.vue";
import Account from "./components/views/Account.vue";
import ForgotPassword from "./components/controllers/ForgotPassword.vue";
import ResetPassword from "./components/controllers/ResetPassword.vue";

//Inicio y componentes
import Home from "./components/views/Home.vue";
import Users from "./components/views/Users.vue";
import Clientes from "./components/views/Clients.vue";
import Citas from "./components/views/Citas.vue";
import Aside from "./components/Aside.vue";
import NavBar from "./components/NavBar.vue";

import Reports from "./components/admin/Reports.vue";
import AsideProfile from "./components/views/AsideProfile.vue";
import EditProfile from "./components/controllers/EditProfile.vue"

const routes = [
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    
    {
        path: "/Login",
        name: "Login",
        component: Login,

    },
    {
        path: "/registros/registrar-cliente",
        name: "RegisterClients",
        components: {
            default: RegisterClients,
            navbar: NavBar,
        }
    },
    {
        path: "/registros",
        name: "Register",
        components: {
            default: Register,
            navbar: NavBar,
            aside: Aside,
        }
    },
    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
            aside: Aside,
            navbar: NavBar,
        }

    },
    {
        path: "/usuarios",
        name: "Users",
        components: {
            default: Users,
            aside: Aside,
            navbar: NavBar,
        }

    },
    {
        path: "/account",
        name: "AccountProfile",
        components: {
            default: AsideProfile,
            aside: Aside,
            navbar: NavBar
        },
        children: [
            {
                path: "",
                name: "Account",
                component: Account,
            },
            {
                path: "edit",
                name: "EditProfile",
                component: EditProfile,
            },
            {
                path: "password",
                name: "ResetPassword",
                component: ResetPassword,
            },
        ]
    },
    {
        path: "/citas",
        name: "Citas",
        components: {
            default: Citas,
            aside: Aside,
            navbar: NavBar,
        }
    },
    {
        path: "/clientes",
        name: "Clients",
        components: {
            default: Clientes,
            aside: Aside,
            navbar: NavBar,
        }
    },
    {
        path: "/citas/agendar-citas",
        name: "AgendarCita",
        components: {
            default: AgendarCita,
            aside: Aside,
            navbar: NavBar,
        }
    },
    {
        path: "/account/register-admins",
        name: "RegisterAdmin",
        component: RegisterAdmins,
    },
    {
        path: "/registros/reporte",
        name: "Reports",
        components: {
            default: Reports,
            aside: Aside,
            navbar: NavBar,
        }
    },

];

const _router = createRouter({
    history: createWebHistory(),
    routes,
});

export default _router;

