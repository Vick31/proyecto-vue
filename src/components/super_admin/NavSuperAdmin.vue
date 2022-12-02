<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link class="nav-link active" to="">HOME</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="">ADMINS</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="">COMPANIES</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link active" to="">ROLES</router-link>
                    </li>

                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    <div>
        <router-view></router-view>
    </div>
</template>