<template>
  <div class="home">
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword(user)">
        password: <input type="password" placeholder="Ingrese contraseña" v-model="user.password">
        <button type="submit">Cambiar contraseña</button>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'ResetPassword',
    mounted() {
        this.user.id = this.$route.query.uid;
        this.user.resetPasswordToken = this.$route.query.token;
    },
    data() {
        return {
            user:  {
                id: '',
                resetPasswordToken: '',
                password: '',
            }
        }
    },
      methods: {
        ...mapActions(['resetPassword'])
    }
}
</script>
