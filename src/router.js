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

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,

    },
    {
        path: "/home",
        name: "Home",
        components: {
            defaults: Home,
            aside: Aside,
            navbar: NavBar,
        }

    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
    },
    {
        path: "/citas",
        name: "Citas",
        component: Citas,
    },
    {
        path: "/agendar-cita",
        name: "AgendarCita",
        component: AgendarCita,
    },
    
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
}); 

export default _router;

