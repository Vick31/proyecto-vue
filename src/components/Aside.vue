<template>
    <div class="aside">
        <div class="title-aside">
            <router-link class="rotes" to="/">
                <h4>SIGEM</h4>
            </router-link>
        </div>
        <div class="body-aside">
            <ul>
                <router-link class="rotes" to="/usuarios">
                    <li>
                        <span class="material-symbols-outlined">home</span>
                        <p>usuarios</p>
                    </li>
                </router-link>
            </ul>
            <ul>
                <small>INTERFACE</small>
                <router-link class="rotes" to="/citas">
                    <li>
                        <span class="material-symbols-outlined">
                            event
                        </span>
                        <p>Citas</p>
                    </li>
                </router-link>
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
                <small>OTROS</small>
                <li>
                    <span class="material-symbols-outlined">
                        diversity_3
                    </span>
                    <p>Medicos</p>
                </li>
                <li>
                    <span class="material-symbols-outlined">
                        medication_liquid
                    </span>
                    <p>Especialidades médicas</p>
                </li>
                <li>
                    <span class="material-symbols-outlined">
                        schedule
                    </span>
                    <p>horarios</p>
                </li>
                <li>
                    <span class="material-symbols-outlined">
                        group
                    </span>
                    <p>Usuarios</p>
                </li>
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