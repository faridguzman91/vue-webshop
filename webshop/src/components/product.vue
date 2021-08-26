<template>
<section class="section container">
    <div class="columns box">
        <div class="column is-8">
            <img :src="product.image" :alt="product.name">
            <p>{{ product.description }}</p>
        </div>

        <div class="column is-4">
            <h1 class="title">{{ product.name }}</h1>

            <form @submit.prevent="addToCart">
                <table class="table is-borderless is-hoverable is-compact">
                    <thead>
                        <tr>
                            <th>grootte</th>
                            <th>gewicht</th>
                            <th>prijs</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                    <tr v-for="(size, i) in product.sizes" :key="i">
                    <td><input type="radio" name="size" :value="i" v-model="pickedSize" ></td>
                    <td>{{ size.name }}</td>
                    <td>{{ size.weight }}</td>
                    <td>{{ size.price | price }}</td>
                    </tr>
                    </tbody>
                </table>

                <div class="field">
                <label>Quantity</label>
                <input type="number" v-model="quantity">
                </div>
                <div class="field">
                <label>Total</label>
                <p>{{ total | price }}</p>
                </div>
            </form>
        </div>
    </div>
</section>
</template>

<script>
import database from '@/library/database'
export default {
  data () {
    return {
      product: {},
      quantity: 1,
      pickedSize: 0
    }
  },
  computed: {
    product () {
      return this.$store.getters.getProduct(this.$route.params.id)
    },
    total () {
      //als sizes niet geload zijn return 0
      if (this.product.sizes === undefined) return 0

      return this.product.sizes[this.pickedSize].price * this.quantity
    }
  },
  methods: {
    addToCart () {}
  },
}
</script>

<style scoped>
img {
  margin: -32px;
  margin-bottom: 1.5em;
}

p {
  font-size: 1.1rem;
}

</style>
