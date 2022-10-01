<template>
    <div class="container-body">
        <h2>Registros </h2>

        <div class="body">
            <router-link to="/registros/reporte">
                <button>generar reporte</button>
            </router-link>
            <router-link class="rotes" to="/registros/registrar-cliente">
                <button class="color-button-one">
                    Agregar cliente
                    <span class="material-symbols-outlined">
                        add_reaction
                    </span>
                </button>
            </router-link>
            <button>registrar usuarios</button>
        </div>
    </div>
</template>

<style scoped>
@import "../../assets/css/styeRegister.css";
</style>