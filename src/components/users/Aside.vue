<template>
    <div class="aside">
        <div class="body-aside">
            <span @click="remove_aside()" class="material-symbols-outlined" id="close">
                close
            </span>
            <ul>
                <router-link class="rotes" to="/user">
                    <li class="logo">
                        <span class="material-symbols-outlined">
                            home
                        </span>
                        <small>Inicio</small>
                    </li>
                </router-link>
            </ul>
            <div>
                <ul>
                    <router-link class="rotes" to="/user/agendar/citas">
                        <li>
                            <span class="material-symbols-outlined">
                                event
                            </span>
                            <small> Citas</small>
                        </li>
                    </router-link>
                </ul>
                <ul>
                    <router-link class="rotes" to="/user/clientes">
                        <li>
                            <span class="material-symbols-outlined">
                                groups
                            </span>
                            <small>Clientes</small>
                        </li>
                    </router-link>
                </ul>
                <ul>
                    <router-link class="rotes" to="/user/equipos">
                        <li>
                            <span class="material-symbols-outlined">
                                dvr
                            </span>
                            <small>Equipos</small>
                        </li>
                    </router-link>

                </ul>
            </div>

            <ul>
                <router-link class="rotes" to="/account/user">
                    <li>
                        <span class="material-symbols-outlined">
                            settings
                        </span>
                        <small>Ajustes</small>
                    </li>
                </router-link>

            </ul>

        </div>
    </div>
</template>

<style scoped>
@import "../../assets/css/styleApp.css";
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