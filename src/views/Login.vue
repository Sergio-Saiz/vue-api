<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="login(user)">
        <input type="text" placeholder="Ingrese email" v-model="user.username">
        <input type="password" placeholder="Ingrese contraseña" v-model="user.password">
        <button type="submit">Acceder</button>
    </form>
    <div><router-link to="/request_reset_password">¿Has olvidado tu contraseña?</router-link></div>
    <div><router-link to="/resend_activation_email">Reenviar email de activacion</router-link></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vuex from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  
  methods: {
     ...mapActions(['login']),
  }
}
</script>
