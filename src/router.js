import { createWebHistory, createRouter } from "vue-router";
import Register from "./components/RegisterClients.vue";
import Admins from "./components/RegisterAdmin.vue"
import Login from "./components/Login.vue";
import Account from "./components/Account.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Home from "./components/Home.vue";
import Users from "./components/Users.vue";
import Clientes from "./components/Clients.vue";
import Citas from "./components/Citas.vue";
import AgendarCita from "./components/AgendarCita.vue";
import Aside from "./components/Aside.vue";
import NavBar from "./components/NavBar.vue";

const routes = [
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/account/reset-password",
        name: "ResetPassword",
        components: {
            default: ResetPassword,
        }
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
        
    },
    {
        path: "/clientes/register",
        name: "Register",
        components: {
            default: Register,
            navbar: NavBar,
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
        name: "Account",
        components: {
            default: Account,
            aside: Aside,
            navbar: NavBar,
        }
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
        component: Admins,
    }
    
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
}); 

export default _router;

