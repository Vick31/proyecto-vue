<template>
    <div class="aside">
        <div class="body-aside">
            <span @click="remove_aside()" class="material-symbols-outlined" id="close">
                close
            </span>
            <div class="logo">
                <img src="../../img/logo.png" alt="" class="logo-aside">
            </div>
            <ul>
                <router-link class="rotes" to="/citas">
                    <li>
                        <span class="material-symbols-outlined">
                            event
                        </span>
                        <p>Citas</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <router-link class="rotes" to="/registros">
                    <li>
                        <span class="material-symbols-outlined">
                            event
                        </span>
                        <p>Registros</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <router-link class="rotes" to="/usuarios">
                    <li>
                        <span class="material-symbols-outlined">home</span>
                        <p>usuarios</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <router-link class="rotes" to="/clientes">
                    <li>
                        <span class="material-symbols-outlined">
                            groups
                        </span>
                        <p>Clientes</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <li>
                    <span class="material-symbols-outlined">
                        diversity_3
                    </span>
                    <p>Medicos</p>
                </li>
            </ul>

            <ul>
                <li>
                    <span class="material-symbols-outlined">
                        schedule
                    </span>
                    <p>horarios</p>
                </li>

            </ul>
            <ul>
                <li>
                    <span class="material-symbols-outlined">
                        group
                    </span>
                    <p>Usuarios</p>
                </li>
            </ul>
            <ul>

                <li>
                    <span class="material-symbols-outlined">
                        live_help
                    </span>
                    <p>Acerca de</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/css/styleApp.css";
</style>

<script>
export default {
    data() {
        return {
        };
    },
    mounted() {
    },

    methods: {
        remove_aside() {
            document.getElementById('aside-app').style.transform = "scale(0)"
        }

    },
};


</script>