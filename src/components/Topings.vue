<template>
    <div class="Container_div">
        <div v-for="p in list_tipo" class="contenedor">
            <img :src="'../../img/comidas/' + p.img" alt="">
            <h1> {{ p.name }} </h1>
        </div>
    </div>

</template>
<style scoped>
@import "../assets/css/styleToping.css";
</style>


<script>


export default {
    data() {
        return {
            list_tipo: [],
            list_toping: [],
            article: {
                name: '',                
                type: ''
            },
            tipo_hamburger: {
                name: '',
            }
        };

    },
    created() {
        this.list_tipo = [
            {
                name: "Donde Igor",
                img: "img1.jpg"
            }
        ]
    },
    mounted() {
        // this.get_token();

        this.article.name = localStorage.getItem('name')
        this.article.type = localStorage.getItem('type')
        
        console.log(this.article.name, this.article.type)

        // this.index();
    },

    methods: {
        // async get_token() {
        //     await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie")
        // },
        // async index() {
        //     let response = await axios.get("http://127.0.0.1:8000/api/product");
        //     this.product_list = response.data;
        // },
    }
}
</script>


