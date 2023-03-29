<template>
  <div class="create-board">
    <div class="demo-board" :style="getDemoBoardStyle">
      <img src="https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg" alt="" />
    </div>

    <p>Background</p>
    <ul class="color-choices clean-list grid">
      <li v-for="bgOpt in bgOpts" :key="bgOpt.bgc">
        <button
          @click="chosenBg = bgOpt"
          :style="{ backgroundImage: bgOpt.bgImg }"
          :class="getCheckedClass(bgOpt)"
        ></button>
      </li>
    </ul>

    <form @submit.prevent="createNewBoard">
      <p>Board title<span v-if="!title" class="asterisk"> *</span></p>
      <input :class="getFormClass" type="text" v-model="title" />
      <button class="btn-create">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      chosenBg: {
        bgc: '#07479E',
        bgImg: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
      },
      title: '',
      isValid: false,
    }
  },
  methods: {
    getCheckedClass(bgOpt) {
      if (this.chosenBg.bgc === bgOpt.bgc && this.chosenBg.bgImg === bgOpt.bgImg) return 'checked'
      return ''
    },
  },
  computed: {
    getDemoBoardStyle() {
      return { backgroundImage: this.chosenBg.bgImg }
    },
    createNewBoard() {
      if (!this.title) return
      this.$emit('createBoard', { title: this.title, bg: this.chosenBg })
    },
    bgOpts() {
      return this.$store.getters.bgOpts
    },
    getFormClass() {
      return {
        'validRequired': !this.title
      }
    },
  },
  created() {},
  components: {},
}
</script>

<style></style>
