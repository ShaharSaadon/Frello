<template>
  <header class="app-header" :style="getStyle">
    <div class="flex align-center">
      <span class="icon" v-html="getSvg('boxes')"></span>
      <RouterLink class="router-logo" to="/board">
        <div>
          <div class="main-header-logo"></div>
        </div>
      </RouterLink>
    </div>
    <div class="flex align-center">
      <input class="main-header-search" placeholder="search" type="text">
      <RouterLink class="profile" to="/board">
        <div>
          <div class="profile-img"></div>
        </div>
      </RouterLink>
    </div>
  </header>
</template>
<script>
import { svgService } from "../services/svg.service.js"
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    getStyle(){
      return {'backgroundColor': this.$store.getters.appHeaderBgc}
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
  }
}
</script>