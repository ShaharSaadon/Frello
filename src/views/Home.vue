<template>
  <section class="container home text-center">
    <h1>Home Page</h1>
    <h5 class="text-center">
      Powered up Frontend
      tomer
       <div className="icon" v-html="getSvg('filter')"></div>
      Peri
    </h5>
    <img alt="Vue logo" src="../assets/imgs/bgc-basic/light-blue.svg">
  </section>
</template>

<script>
import { svgService } from "../services/svg.service.js"
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
  }

}
</script>
