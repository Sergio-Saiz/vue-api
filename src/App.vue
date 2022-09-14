<template>
  <div id="app">
    
      <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color: #ecf4f0">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Vue-API</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/" class="nav-link" aria-current="page" style="color: #4B8A7A"> 
                   Home 
                </router-link>
              </li>
            </ul>
            
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-warning bg-green-700" type="button" @click="logout" v-if="this.$store.state.token != null">
                  Logout
              </button>
              <button v-if="this.$store.state.token === null" type="button" class="btn btn-outline-warning">
                <router-link to="/login" class="nav-link active" aria-current="page"> Login </router-link>
              </button>
              <button v-if="this.$store.state.token === null" type="button" class="btn btn-outline-warning">
                <router-link to="/register" class="nav-link active" aria-current="page"> Register </router-link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    
      <div class="mx-auto mt-5" id="wrapper">
        <router-view/>
      </div>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['getToken', 'getUsername', 'getUserId', 'logout']),
  },
  created(){
    this.getToken()
    this.getUsername()
    this.getUserId()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
