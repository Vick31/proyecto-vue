import { createWebHistory, createRouter } from "vue-router";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Account from "./components/Account.vue";
import Home from "./components/Home.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
import Citas from "./components/Citas.vue";
import AgendarCita from "./components/AgendarCita.vue";
import Aside from "./components/Aside.vue";
import NavBar from "./components/NavBar.vue";
import Users from "./components/Users.vue";

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
            aside: Aside,
            navbar: NavBar,
        }
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
        
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
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
        path: "/citas/agendar-citas",
        name: "AgendarCita",
        components: {
            default: AgendarCita,
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

