<template>
  <section class="section container">
    <h1 class="title is-2">Admin</h1>
    <h2 class="subtitle is-4">Products</h2>

    <a @click="addingProduct = true" class="button is-primary"><fa-icon icon="plus" /> product toevoegen</a>

    <div class="box" v-if="addingProduct">
      <form @submit.prevent="addProduct()">
        <div class="field">
          <button type="submit" class="button is-success">opslaan</button>
        </div>
        <div class="field">
          <label class="label">naam</label>
          <div class="control">
            <input class="input" type="text" v-model="newProduct.name">
          </div>
        </div>
        <div class="field">
          <label class="label">omschrijving</label>
          <div class="control">
            <input class="input" type="text" v-model="newProduct.description">
          </div>
        </div>
        <div class="field">
          <label class="label">wachtwoord</label>
          <div class="control">
            <input class="input" type="text" v-model="newProduct.image">
          </div>
        </div>
      </form>
    </div>

    <div class="box" v-for="(product, index) in products" :key="product.id">
      <h2 class="title is-5">{{ product.data.name }}
        <span class="is-pulled-right">
          <a @click="editProduct(index)" class="button is-primary"><fa-icon icon="edit" /></a>
          <a @click="deleteProduct(index)" class="button is-danger"><fa-icon icon="times" /></a>
        </span>
      </h2>
      <form @submit.prevent="saveProduct(index)" v-if="product.editing">
        <div class="field">
          <button type="submit" class="button is-success">Save</button>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="product.data.name">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input class="input" type="text" v-model="product.data.description">
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <input class="input" type="text" v-model="product.data.image">
          </div>
        </div>
      </form>
      <form @submit.prevent="addSize(index)" v-if="product.editing">
        <table class="table is-narrow">
          <caption class="title is-5">Sizes</caption>
          <thead>
            <tr>
              <th>Weight</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(size, sizeIndex) in product.data.sizes" :key="sizeIndex">
              <td><input class="input" type="text" v-model="size.weight"></td>
              <td><input class="input" type="text" v-model="size.name"></td>
              <td><input class="input" type="text" v-model="size.price"></td>
              <td><a @click="deleteSize(index, sizeIndex)" class="button is-danger"><fa-icon icon="times" /></a></td>
            </tr>

            <tr>
              <td><input class="input" type="text" v-model="newSize.weight"></td>
              <td><input class="input" type="text" v-model="newSize.name"></td>
              <td><input class="input" type="text" v-model="newSize.price"></td>
              <td><button type="submit" class="button is-success"><fa-icon icon="plus" /></button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </section>
</template>

<script>
import db from '@/library/database'

export default {
  data () {
    return {
      products: [],
      addingProduct: false,
      newProduct: {
        name: '',
        description: '',
        image: '',
        sizes: []
      },
      newSize: {
        weight: '',
        name: '',
        price: ''
      }
    }
  },
  methods: {
    //product toevoegen
    addProduct () {
      db.add_product(this.newProduct)
      .then((product) => {
        //nieuwe product bovenaan
        this.products.unshift({
          id: product.id,
          data: this.newProduct
        })
        //toevoegen start false
        this.addingProduct = false
        this.newProduct = {
          name: '',
          description: '',
          image: '',
          sizes: []
        }
         //if/else 1 of 0
        this.editProduct(0)
      })
    },
    editProduct (index) {
      this.products.forEach(p => { p.editing = false })

      //alleen 1 item per keer bewerken
      this.products[index].editing = true
    },

     //na bewaren ,niet bewerken
    saveProduct (index) {
      db.save_product(this.products[index].id, this.products[index].data)
      .then(() => {
        this.products[index].editing = false
      })
    },
    //product verwijderen
    deleteProduct (index) {
      db.delete_product(this.products[index].id)
      .then(() => {
        this.products.splice(index, 1)
      })
    },
    //size verwijderen
    deleteSize (index, sizeIndex) {
      this.products[index].data.sizes.splice(sizeIndex, 1)
    },
    // sizes toevoegen
    addSize (index) {
      this.products[index].data.sizes.push(this.newSize)

      this.newSize = {
        weight: '',
        name: '',
        price: ''
      }
    }
  },
   //ophalen info producten, dan push id, bewerkbaarheid en data
  created () {
    db.get_products()
    .then((products) => {
      products.forEach((product) => {
        this.products.push({
          id: product.id,
          editing: false,
          data: product.data()
        })
      })
    })
  }
}
</script>

<style>
</style>
