<template>
    <div id="nav">
        <nav class="navbar">
            <div class="container-fluid">
                <span @click="show_aside()" class="icon-nav material-symbols-outlined" id="btn-menu">
                    menu
                </span>

                <h4>SIGEM</h4>
                <div>
                    <span class="material-symbols-outlined icon-nav">
                        notifications
                    </span>
                    <router-link class="rotes account-logo" to="/account/user">
                        <span class="material-symbols-outlined icon-nav">
                            person
                        </span>
                    </router-link>
                </div>
            </div>
        </nav>
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
    async mounted() {
    },

    methods: {
        show_aside() {
            document.getElementById('aside-app').style.transform = "scale(1)"
        },
    },
};


</script>