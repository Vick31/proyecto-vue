<template>
    <div class="container-body">
      <h2>Registrar</h2>
  
      <div class="body">
  
        <router-link to="/registros/reporte" class="rotes">
          <button type="button" class="toggle-btn">
            Generar reporte
          </button>
        </router-link>
  
        <br/>
  
        <router-link class="rotes" to="/registros/registrar-cliente">
          <button type="button" class="rotes  toggle-btn">
            Agregar cliente
            <span class="material-symbols-outlined"> add_reaction </span>
          </button>
        </router-link>
  
      </div>
    </div>
    
  </template>
  
  <style scoped>
  @import "../../assets/css/styeRegister.css";
  </style>