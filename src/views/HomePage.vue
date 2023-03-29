<template>
  <header class="home-page-header flex space-between">
    <div class="left-nav flex">
      <img src="../assets/imgs/merlloHomePage.png" class="logo" alt="" />
      <nav class="clean-list flex">
        <!-- <a class="nav-link flex">Features <i className="icon" v-html="getSvg('arrowDown')"></i></a> -->
      </nav>
    </div>
    <div class="right-nav flex clean-list">
      <RouterLink class="nav-link" to="/login">Log in</RouterLink>
      <RouterLink class="nav-link-signup nav-link" to="/board">Try Our Demo!</RouterLink>
    </div>
  </header>

  <main class="home-page-main-container">
    <div class="left-box">
      <h1>Merllo brings all your tasks, teammates, and tools together</h1>
      <p>Keep everything in the same place-even if your team isn’t.</p>
      <RouterLink to="/board"> <button class="btn-demo">Try Our Demo!</button> </RouterLink>
    </div>
    <div class="right-box">
      <img src="../assets/imgs/TrelloUICollage_4x.webp" />
    </div>
  </main>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
  name: 'HomePage',
  emits:['toggleHeader'], 
  data() {
    return {}
  },
  created() {
    this.$emit('toggleHeader')
  },
  unmounted() {
    this.$emit('toggleHeader')
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
  },
  computed: {},

  components: {},
}
</script>

<style></style>
