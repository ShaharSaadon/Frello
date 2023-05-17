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
import { socketService, SOCKET_EVENT_LOAD_BOARDS } from './services/socket.service'

export default {
  created() {
    const user = userService.getLoggedinUser()
    this.drawWine()
    if (user) {
      store.commit({ type: 'setLoggedinUser', user })
      const memberId = this.$store.getters.loggedinUser._id
      this.$store.commit({ type: 'setFilterBy', filterBy: { memberId: memberId } })
    }
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
    window.addEventListener('resize', this.appHeight)
    this.appHeight()
    socketService.on(SOCKET_EVENT_LOAD_BOARDS, this.loadBoards)
  },
  methods: {
    appHeight() {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight - 0.01}px`)
      const elBoardHeader = document.querySelector('.board-header')
      if (elBoardHeader) {
        doc.style.setProperty('--board-header-height', `${elBoardHeader.clientHeight + 8}px`)
      }
    },
    loadBoards() {
      this.$store.dispatch({ type: 'loadBoards' })
    },
    drawWine() {
      console.log('🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log(' 🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('   🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('     🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('      🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷') 
      console.log('       🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('         🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('           🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('             🍷🍷🍷🍷🍷🍷')
      console.log('                🍷🍷🍷🍷')
      console.log('                  🍷🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('                   🍷🍷')
      console.log('             🍷🍷🍷🍷🍷🍷🍷')
      console.log('           🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('        🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷')
      console.log('Hey we are Merllo team, if you like what you see feel free to contact us!')
      console.log('LinkedIn: Tomer Huberman, Shahar Saadon and Ido Peri')
    },
  },
  components: {
    AppHeader,
    UserMsg,
  },
  mounted() {},
  data() {
    return {
      isHomePage: true,
    }
  },
}
</script>
