import { createWebHistory, createRouter } from "vue-router";

//Register
import RegisterClients from "./components/admin/manage/RegisterClients.vue";
import RegisterClientsUser from "./components/users/manage/RegisterClients.vue";
import RegisterUser from "./components/admin/manage/RegisterUser.vue";
import AgendarCita from "./components/admin/manage/AgendarCita.vue";
import AgendarCitaUser from "./components/users/manage/AgendarCita.vue";

//Acount
import Login from "./components/views/Login.vue";
import Account from "./components/admin/account/Account.vue";
import ForgotPassword from "./components/controllers/ForgotPassword.vue";
import ResetPassword from "./components/admin/account/ResetPassword.vue";
import ResetPasswordUser from "./components/users/account/ResetPassword.vue";
import AccountProfileUser from "./components/users/account/Account.vue";
import AsideUser from "./components/users/Aside.vue";

//Inicio y componentes
import Home from "./components/admin/Home.vue";
import HomeUser from "./components/users/Home.vue"
import Users from "./components/admin/views/Users.vue";
import Clientes from "./components/admin/views/Clients.vue";
import ClientesUser from "./components/users/Clients.vue";
import Citas from "./components/views/Citas.vue";
import Aside from "./components/admin/Aside.vue";
import NavBar from "./components/admin/NavBar.vue";
import NavBarUser from "./components/users/NavBar.vue";

import Reports from "./components/admin/manage/Reports.vue";
import AsideProfile from "./components/admin/account/AsideProfile.vue";
import AsideProfileUser from "./components/users/account/AsideProfile.vue";
import EditProfile from "./components/admin/account/EditProfile.vue";
import EditProfileUser from "./components/users/account/EditProfile.vue";
import EquipoFoto from "./components/admin/manage/EquipoFoto.vue";
import Equipos from "./components/admin/manage/Equipos.vue";
import EquiposUser from "./components/users/manage/Equipos.vue";

import Inicio from "./components/views/Inicio.vue"
const routes = [
    // -- -- ACCOUNT -- --

    {
        //admin account
        path: "/account/admin/",
        name: "AccountProfile",
        components: {
            default: AsideProfile,
            aside: Aside,
            navbar: NavBar,
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
        ],
    },

    {
        //user account
        path: "/account/user/",
        name: "UserAccount",
        components: {
            default: AsideProfileUser,
            aside: AsideUser,
            navbar: NavBarUser,
        },
        children: [
            {
                path: "",
                name: "AccountUser",
                component: AccountProfileUser,
            },
            {
                path: "edit",
                name: "EditProfileUser",
                component: EditProfileUser,
            },
            {
                path: "password",
                name: "ResetPasswordUser",
                component: ResetPasswordUser,
            },
        ],
    },

    // -- -- EVENTS -- --

    {
        //admin
        path: "/agendar/citas",
        name: "AgendarCita",
        components: {
            default: AgendarCita,
            aside: Aside,
            navbar: NavBar,
        },
    },

    {
        //user
        path: "/user/agendar/citas",
        name: "AgendarCitaUser",
        components: {
            default: AgendarCitaUser,
            aside: AsideUser,
            navbar: NavBarUser,
        },
    },

    {
        path: "/clientes",
        name: "Clients",
        components: {
            default: Clientes,
            aside: Aside,
            navbar: NavBar,
        },
    },
    {
        path: "/user/clientes",
        name: "ClientsUser",
        components: {
            default: ClientesUser,
            aside: AsideUser,
            navbar: NavBarUser,
        },
    },

    {
        path: "/equipos",
        name: "Equipos",
        components: {
            default: Equipos,
            aside: Aside,
            navbar: NavBar,
        },
    },
    {
        path: "/equipos/captura",
        name: "EquipoFoto",
        components: {
            default: EquipoFoto,
            aside: Aside,
            navbar: NavBar,
        },
    },
    {
        path: "/user/equipos",
        name: "EquiposUser",
        components: {
            default: EquiposUser,
            aside: AsideUser,
            navbar: NavBarUser,
        },
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
        path: "/registrar/cliente",
        name: "RegisterClients",
        components: {
            default: RegisterClients,
            aside: Aside,
            navbar: NavBar,
        },
    },
    {
        path: "/user/registrar/cliente",
        name: "RegisterClientsUser",
        components: {
            default: RegisterClientsUser,
            aside: AsideUser,
            navbar: NavBarUser,
        },
    },

    // REGISTER REPORTS
    {
        path: "/registros/reporte",
        name: "Reports",
        components: {
            default: Reports,
            aside: Aside,
            navbar: NavBar,
        },
    },

    // REGISTER USERS
    {
        path: "/usuarios/register-user",
        name: "RegisterUser",
        components: {
            default: RegisterUser,
            aside: Aside,
            navbar: NavBar,
        },
    },

    // REGISTER CITAS

    {
        path: "/listado/citas",
        name: "Citas",
        components: {
            default: Citas,
            aside: Aside,
            navbar: NavBar,
        },
    },

    // -- -- VIEWS -- --
    {
        path: "/home",
        name: "Home",
        components: {
            default: Home,
        },
    },

    {
        path: "/",
        name: "inicio",
        components: {
            default: Inicio,
        },
    },
    {
        path: "/user",
        name: "HomeUser",
        components: {
            default: HomeUser,
        },
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },

    {
        path: "/usuarios",
        name: "Users",
        components: {
            default: Users,
            aside: Aside,
            navbar: NavBar,
        },
    },
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
});

export default _router;
