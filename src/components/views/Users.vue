<template>
    <div class="container-body">
      <h4>Lista de ususarios</h4>
      <div class="body">
        <router-link class="rotes" to="/usuarios/register-user">
          <button type="button" id="rotes" >Registrar usuario</button>
        </router-link>
      </div>
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
              <span class="material-symbols-outlined color-red"> delete </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  @import "../../assets/css/styleUsers.css";
  </style>