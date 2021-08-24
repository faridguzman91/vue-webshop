<template>
<form @submit.prevent="login" class="container">
    <div class="field">
        <label class="label"> e-mail </label>
        <div class="control">
            <input class="input" v-model="email" type="email">
        </div>
    </div>

    <div class="field">
        <label class="label"> wachtwoord </label>
        <div class="control">
            <input class="input" v-model="email" type="password">
        </div>
    </div>

    <p v-if="error"> {{ error }}</p>
    <div class="control">
        <button class="button is-primary" type="submit">opslaan</button>
    </div>

</form>
</template>

<script>

import 'firebase/auth'
import { FirebaseApp } from '@/library/database'

let auth = FirebaseApp.auth()

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    login () {
      // https://firebase.google.com/docs/auth/web/password-auth
    auth.signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      this.error = error.message
    })

    // oproep als autenticatie proces klaar is, redirect naar producten pagina

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/admin/product')
      }
    })
  }
  }

}
</script>

<style>

</style>
