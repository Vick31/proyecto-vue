import { createWebHistory, createRouter } from "vue-router";

//Register
import Register from "./components/admin/RegisterClients.vue";
import RegisterAdmins from "./components/admin/RegisterAdmin.vue"

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
import AgendarCita from "./components/admin/AgendarCita.vue";
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
        component: RegisterAdmins,
    }
    
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
}); 

export default _router;

