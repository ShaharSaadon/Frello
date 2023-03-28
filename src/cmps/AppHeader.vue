<template>
  <header class="app-header" :style="getStyle">
    <div class="flex align-center">
    
      <span @click="$router.push('/')" class="icon" v-html="getSvg('boxes')"></span>
      <RouterLink class="router-logo" to="/board">
        <div>
          <div class="main-header-logo"></div>
        </div>
      </RouterLink>
    </div>
    <div class="flex align-center">
      <!-- <input class="main-header-search" placeholder="search" type="text"> -->
      <RouterLink class="profile" to="/login">
        <div>
          <div :style="getImageStyle" class="profile-img"></div>
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
    },
    getImageStyle(){
      if(!this.loggedInUser) return
      return {
        backgroundImage: `url(${this.loggedInUser.imgUrl})`
      }
    },
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
  }
}
</script>