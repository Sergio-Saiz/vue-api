<template>
  <div class="home">
    <h1>Resetear contraseña</h1>
    <form @submit.prevent="requestResetPassword(user)">
        <input type="text" placeholder="Ingrese contraseña" v-model="user.email">
        <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'RequestResetPassword',
    data() {
        return {
            user:  {
                email: '',
            }
        }
    },
      methods: {
        ...mapActions(['requestResetPassword'])
    }
}
</script>
