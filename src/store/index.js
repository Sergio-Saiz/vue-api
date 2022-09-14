import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    username: null,
    userId: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserId(state, payload) {
      state.userId = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      location.href='/'
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/login_check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        commit('setToken', userDB.token)
        localStorage.setItem('token', userDB.token)

        var base64Url = userDB.token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        const tokenPayload = JSON.parse(jsonPayload)
        // commit('setUser', {id: tokenPayload.id, username: tokenPayload.username})
        // localStorage.setItem('user', {id: tokenPayload.id, username: tokenPayload.username})
        commit('setUsername', tokenPayload.username)
        localStorage.setItem('username', tokenPayload.username)
        commit('setUserId', tokenPayload.id)
        localStorage.setItem('userId', tokenPayload.id)

        router.push('User');
         
      } catch (error) {
        console.log('Error: ', error)
      }
      
    },
    async register({ commit },  user ) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        router.push('Login');
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    getToken({commit}) {
      if(localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    },
    getUserId({commit}) {
      if(localStorage.getItem('userId')) {
        commit('setUserId', localStorage.getItem('userId'))
      } else {
        commit('setUserId', null)
      }
    },
    getUsername({commit}) {
      if(localStorage.getItem('username')) {
        commit('setUsername', localStorage.getItem('username'))
      } else {
        commit('setUsername', null)
      }
    },
    logout ({ commit }) {
      commit('logout')
    },


    async requestResetPassword({commit}, email ) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/request_reset_password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(email)
        })
        const userDB = await res.json()
        console.log(userDB)
        router.push('Home');
      } catch (error) {
        console.log('Error: ', error)
      }
    },

    async resendActivationEmail({commit}, email ) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/resend_activation_email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(email)
        })
        const userDB = await res.json()
        console.log(userDB)
        router.push('Home');
      } catch (error) {
        console.log('Error: ', error)
      }
    },

    async activateAccount({ commit }, user ) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/' + user.id + '/activate', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
           // 'Authorization': 'Bearer ' + this.state.token 
          },  
          body: JSON.stringify({token: user.token})
        })
        const userDB = await res.json()
        console.log(userDB)
        router.push('User');
      } catch (error) {
        console.log('Error: ', error)
      }
      
    },

    async resetPassword({ commit }, user ) {
      try {
        const res = await fetch('http://localhost:250/api/v1/users/' + user.id + '/reset_password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          //  'Authorization': 'Bearer ' + this.state.token 
          },  
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        console.log(userDB)
        router.push('User');
      } catch (error) {
        console.log('Error: ', error)
      }

    },
  
  },
  modules: {
  }
})
