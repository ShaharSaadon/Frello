<template>
  <ul class="color-choices clean-list grid">
    <li v-for="bgOpt in bgOpts" :key="bgOpt.bgc">
      <button :style="{ backgroundImage: bgOpt.bgImg }" @click="$emit('onChangeBackground', bgOpt)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ChangeBackground',
  data() {
    return {}
  },
  methods: {},
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    bgOpts() {
      return this.$store.getters.bgOpts
    },
  },
  created() {},
  components: {},
}
</script>

<style></style>
