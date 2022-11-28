<template>
    <div class="body">
        <div class="body-inicio">
            <div class="header-inicio">
                <h1>BIENVENIDO</h1>
            </div>

            <div class="section-inicio">
                <router-link class="rotes-inicio" to="/Login">
                    <button type="button" class="btn btn-inicio btn-primary">Sing In</button>
                </router-link>
                <p>Lorem ipsum dolor sit amet.</p>

                <div class="footer-inicio">
                    <button type="button" class="btn btn-inicio"><small>ACERCA DE</small></button>
                    <button type="button" class="btn btn-inicio"><small>CONTACTO</small></button>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.body-inicio {
    box-sizing: border-box;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
}

.btn-inicio {
    border-radius: 20px;
    padding: 0.6rem 4rem;

    font-weight: bold;
}

.header-inicio {
    background-image: linear-gradient(rgba(0, 0, 225, .3), rgba(0, 0, 225, 0.1)), url(../../../img/hombre-dibujos-animados-hablando-mujer-doctor-portatil-casa-elementos-medicos-sobre-fondo-azul_1302-22988.jpg);
    background-size: cover;
    background-position: center;
    color: #fff;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, .9);

    text-align: center;

    padding-top: 1rem;
    height: 60vh;
}

.section-inicio {
    height: 40vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 2rem 1.3rem;
}

.footer-inicio {
    display: flex;

    gap: 2rem;
}

.footer-inicio>.btn {
    padding: 0.2rem 1.5rem !important;
    font-weight: 400;
    border: 0.4px solid blue;
}

.rotes-inicio {
    text-decoration: none;
    color: #000;
}

.rotes-inicio>p {
    margin-top: 1.5rem;
}
</style>