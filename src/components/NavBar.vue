<template>
    <div id="nav">
        <nav class="navbar ">
            <div class="container-fluid">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <router-link class="rotes account-logo" to="/account">
                    <span>Admin</span>
                    <img src="../img/logos-cuentas/user_account_profile_admin-512.png" alt="">
                </router-link>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    @import "../assets/css/styleApp.css";
</style>