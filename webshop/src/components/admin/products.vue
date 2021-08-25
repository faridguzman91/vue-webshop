<template>
<div>
    <section class="hero is-success is-medium">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">broodjes winkel</h1>
                <h2 class="subtitle is-1">huisgemaakte broodjes voor goedkope prijzen</h2>
            </div>
        </div>
    </section>

    <section class="section container">
    <div class="columns is-multiline">
    <div class="columns is-4" v-for="(product, id) in products" :key="id">
    <div class="card">
    <div class="card-image">
    <figure class="image is-4by3">
    <router-link :to="'/product/' + id"><img :src="product.image" :alt="product.name"></router-link>
    </figure>
    </div>

    <div class="card-content">
    <p class="title is-5">{{ product.name }}</p>

    </div>
    </div>
    </div>

    </div>
    </section>
</div>
</template>

<script>
export default {

}
</script>

<style>
.hero {
background: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,0.3) ), url('../assets/brood.jpg') center;
font-family: 'Lato', sans-serif;
}

.hero .title {
font-size: 7rem;
font-weight: normal;

}

</style>
