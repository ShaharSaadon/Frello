<template>
  <header class="app-header">
    <nav>
      <i className="icon" v-html="getSvg('boxes')"></i>
      <RouterLink to="/board">Trello</RouterLink>
    
      <RouterLink to="/login">Create</RouterLink>
    </nav>
    <section class="loggedin-user" v-if="loggedInUser">
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </RouterLink>
      <span>{{ loggedInUser.score.toLocaleString() }}</span>
      <img :src="loggedInUser.imgUrl" />
    </section>
  </header>
</template>
<script>
import { svgService } from "../services/svg.service.js"
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
  }
}
</script>