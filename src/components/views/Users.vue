<template>
    <div class="header">
        <h4>Lista de ususarios</h4>
        <router-link to="/usuarios/register-user">
            <button type="button" class="btn btn-primary save"> Registrar usuario </button>
        </router-link>
    </div>

    <div class="container-body">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>yo</td>
                    <td>ad@da.c</td>
                    <td>1</td>
                    <td>user</td>
                    <td>
                        <span class="material-symbols-outlined color-orange">
                            edit_square
                        </span>
                        <span class="material-symbols-outlined color-red">
                            delete
                        </span>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>


</template>