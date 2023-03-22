<template>
  <section class="main-app">
    <AppHeader v-if="!isHomePage"/>
    <RouterView @showHeader="showHeader"/>
    <UserMsg/>
  </section>
</template>

<script>


import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import UserMsg from './cmps/UserMsg.vue'


export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user)  store.commit({type: 'setLoggedinUser', user})
    this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {
    showHeader(){
      console.log('hye')
      this.isHomePage=false
    }
  },
  components: {
    AppHeader,
    UserMsg
  },
  data() {
    return {
      isHomePage: true
    }
  },
}
</script>