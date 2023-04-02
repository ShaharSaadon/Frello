<template>
  <section class="main-app">
    <AppHeader v-if="isHomePage" />
    <RouterView @toggleHeader="isHomePage = !isHomePage" />
    <UserMsg />
  </section>
</template>

<script>
import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import UserMsg from './cmps/UserMsg.vue'

export default {
  created() {
    const user = userService.getLoggedinUser()
    if (user) {
      store.commit({ type: 'setLoggedinUser', user })
      const memberId = this.$store.getters.loggedinUser._id
      this.$store.commit({ type: 'setFilterBy', filterBy: { memberId: memberId } })
    }
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
    window.addEventListener('resize', this.appHeight)
    this.appHeight()
  },
  methods: {
    appHeight() {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight - 0.01}px`)
    },
  },
  components: {
    AppHeader,
    UserMsg,
  },
  data() {
    return {
      isHomePage: true,
    }
  },
}
</script>
