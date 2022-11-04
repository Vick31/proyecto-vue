import { createWebHistory, createRouter } from "vue-router";

//Register
import RegisterClients from "./components/admin/RegisterClients.vue";
import RegisterUser from "./components/admin/RegisterUser.vue"
import AgendarCitaUser from "./components/users/AgendarCitaUser.vue"
import AgendarCita from "./components/admin/AgendarCita.vue";
import Register from "./components/admin/Register.vue"

//Acount
import Login from "./components/views/Login.vue";
import Account from "./components/views/Account.vue";
import ForgotPassword from "./components/controllers/ForgotPassword.vue";
import ResetPassword from "./components/controllers/ResetPassword.vue";
import AccountProfileUser from "./components/users/AccountUser.vue";
import AsideUser from "./components/users/AsideUser.vue";

//Inicio y componentes
import Home from "./components/views/Home.vue";
import Users from "./components/views/Users.vue";
import Clientes from "./components/views/Clients.vue";
import Citas from "./components/views/Citas.vue";
import Aside from "./components/Aside.vue";
import NavBar from "./components/NavBar.vue";
import NavBarUser from "./components/users/NavBarUser.vue"

import Reports from "./components/admin/Reports.vue";
import AsideProfile from "./components/views/AsideProfile.vue";
import AsideProfileUser from "./components/users/AsideProfileUser.vue"
import EditProfile from "./components/controllers/EditProfile.vue"
import Equipos from "./components/admin/Equipos.vue"


const routes = [


    // -- -- ACCOUNT -- -- 

    { //admin account
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

    { //user account
        path: "/account/user/",
        name: "UserAccount",
        components: {
            default: AsideProfileUser,
            aside: AsideUser,
            navbar: NavBarUser
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

    // -- -- EVENTS -- -- 

    { //admin
        path: "/agendar/citas",
        name: "AgendarCita",
        components: {
            default: AgendarCita,
            aside: Aside,
            navbar: NavBar,
        }
    },

    { //user
        path: "/user/agendar/citas",
        name: "AgendarCitaUser",
        components: {
            default: AgendarCita,
            aside: AsideUser,
            navbar: NavBarUser
        }
    },



    // -- -- USERS CONTROLLERS -- --

    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
    },


    // -- -- ADMIN CONTROLLERS -- -- 


    // REGISTER CLIENT
    {
        path: "/registros/registrar-cliente",
        name: "RegisterClients",
        components: {
            default: RegisterClients,
            navbar: NavBar,
        }
    },

    // REGISTER REPORTS
    {
        path: "/registros/reporte",
        name: "Reports",
        components: {
            default: Reports,
            aside: Aside,
            navbar: NavBar,
        }
    },

    // REGISTER USERS
    {
        path: "/usuarios/register-user",
        name: "RegisterUser",
        components: {
            default: RegisterUser,
            aside: Aside,
            navbar: NavBar,
        }
    },

    // REGISTER CITAS 

    {
        path: "/listado/citas",
        name: "Citas",
        components: {
            default: Citas,
            aside: Aside,
            navbar: NavBar,
        }
    },

    




    // -- -- VIEWS -- -- 

    {
        path: "/",
        name: "Home",
        components: {
            default: Home,
        }

    },
    {
        path: "/Login",
        name: "Login",
        component: Login,

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
        path: "/usuarios",
        name: "Users",
        components: {
            default: Users,
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
        path: "/equipos",
        name: "Equipos",
        components: {
            default: Equipos,
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

