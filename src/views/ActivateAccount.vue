<template>
  <div class="home">
    <h1>Activar cuenta</h1>
    <form @submit.prevent="activateAccount(user)">
        <button type="submit">Activar cuenta</button>
    </form>
  </div>
</template>

<script>
import Vuex from 'vuex'
import { mapActions } from 'vuex'

export default {
    name: 'ActivateAccount',
    mounted() {
        this.user.id = this.$route.query.uid;
        this.user.token = this.$route.query.token;
    },
    data() {
        return {
            user:  {
                id: '',
                token: '',
            }
        }
    },
      methods: {
        ...mapActions(['activateAccount'])
    }
}
</script>
