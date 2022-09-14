<template>
  <div class="home">
    <h1>Enviar enlace de activacion</h1>
    <form @submit.prevent="resendActivationEmail(user)">
        <input type="text" placeholder="Ingrese Email" v-model="user.email">
        <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'ResendActivationEmail',
    data() {
        return {
            user:  {
                email: '',
            }
        }
    },
      methods: {
        ...mapActions(['resendActivationEmail'])
    }
}
</script>
