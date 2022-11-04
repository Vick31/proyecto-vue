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
                <router-link class="rotes" to="/user/agendar/citas">
                    <li>
                        <span class="material-symbols-outlined">
                            event
                        </span>
                        <p>Citas</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <router-link class="rotes" to="/user/clientes">
                    <li>
                        <span class="material-symbols-outlined">
                            groups
                        </span>
                        <p>Clientes</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <router-link class="rotes" to="/user/equipos">
                    <li>
                        <span class="material-symbols-outlined">
                            schedule
                        </span>
                        <p>Equipos</p>
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