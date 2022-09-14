<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mt-5">Usuario</h1>
      <form class="mt-5" @submit.prevent="updateUser(user), logout()">
          Nombre: <input type="text" placeholder="Ingrese Username" v-model="user.name">
          <button type="submit">Actualizar</button>
      </form>
      <p></p>
      <p>Correo: {{user.email}}</p>
      
      <h4 class="mt-5">Cambiar contraseña</h4>
      <form @submit.prevent="updatePassword(user)">
          Contraseña: <input style="border: 0" type="text" placeholder="oldPassword" v-model="oldPassword">
          Nueva contraseña: <input style="border: 0" type="text" placeholder="newPassword" v-model="newPassword">
          <button type="submit">Cambiar contraseña</button>
      </form>
      <form class="mt-5" @submit.prevent="deleteUser()">
          ¿Quieres eliminar al usuario? <button type="submit">Eliminar usuario</button>
      </form>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios';
import VueRouter from 'vue-router'
export default {
  mounted () {
    axios.get('http://localhost:250/api/v1/users/' + this.userId, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then((res) => {
      this.user = res.data
    })
    .catch((error) => {
      console.error(error)
    })

  },
  created(){
  //  this.dashboard(this.token)
  },
  computed: {
    ...mapState(['token', 'username', 'userId'])
  },
  data() {
    return {
        user: {},
        userCategories: {},
        oldPassword: null,
        newPassword: null,
    }
  },
  methods: {
   // ...mapActions(['dashboard'])
    updateUser(user) {
      axios({
        method: 'put',
        url: 'http://localhost:250/api/v1/users/' + this.userId,
        headers: {
                'Authorization': `Bearer ${this.token}`
                },
        data: {
          name: this.user.name,
        }
      })
      .then((res) => {
        console.log(res.data)
        this.user = res.data
      })
      .catch((error) => {
        console.error(error)
      })
    },

    updatePassword(oldPassword, newPassword) {
      axios({
        method: 'put',
        url: 'http://localhost:250/api/v1/users/' + this.userId + '/change_password',
        headers: {
                'Authorization': `Bearer ${this.token}`
                },
        data: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }
      })
      .then((res) => {
        console.log(res.data)
        this.oldPassword = null
        this.newPassword = null
      })
      .catch((error) => {
        console.error(error)
      })
    },

    deleteUser() {
      axios({
        method: 'delete',
        url: 'http://localhost:250/api/v1/users/' + this.userId,
        headers: {
                'Authorization': `Bearer ${this.token}`
                }
      })
      .then((res) => {
        this.$store.dispatch('logout')
      })
      .catch((error) => {
        console.error(error)
      })
      

    },

  }
}
</script>