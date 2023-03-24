<template>
  <div class="create-board">
    <div class="demo-board" :style="getDemoBoardStyle">
      <img src="https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg" alt="" />
    </div>

    <p>Background</p>
    <ul class="color-choices clean-list grid">
      <li v-for="bgOpt in bgOpts" :key="bgOpt.bgc">
        <button @click="chosenBg=bgOpt" :style="{ backgroundImage: bgOpt.bgImg }" :class="getCheckedClass(bgOpt)"></button>
      </li>
    </ul>

    <form @submit.prevent="createNewBoard">
      <p>Board title</p>
      <input type="text" v-model="title" />
      <button class="btn-create">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      bgOpts: [
        {
          bgc: '#07479E',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
          LeftSideBarBgc: ''
        },
        {
          bgc: '#2F1C0A',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/1cbae06b1a428ad6234a.svg)',
        },
        {
          bgc: '#07479E',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/d106776cb297f000b1f4.svg)',
        },
        {
          bgc: '#082854',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/8ab3b35f3a786bb6cdac.svg)',
        },
        {
          bgc: '#463699',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/a7c521b94eb153008f2d.svg)',
        },
        {
          bgc: '#872013',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/aec98becb6d15a5fc95e.svg)',
        },
        {
          bgc: '#821659',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/b75536d1afb40980ca57.svg)',
        },
        {
          bgc: '#14553A',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/92e67a71aaaa98dea5ad.svg)',
        },
        {
          bgc: '#45536A',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/941e9fef7b1b1129b904.svg)',
        },
      ],
      chosenBg: {
          bgc: '#07479E',
          bgImg: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
      },
      title: '',
    }
  },
  methods: {
    getCheckedClass(bgOpt) {
      if(this.chosenBg.bgc === bgOpt.bgc && this.chosenBg.bgImg === bgOpt.bgImg) return 'checked'
      return ''
    },
  },
  computed: {
    getDemoBoardStyle() {
      return { backgroundImage: this.chosenBg.bgImg }
    },
    createNewBoard() {
      this.$emit('createBoard', { title: this.title, bg: this.chosenBg })
    },
  },
  created() {},
  components: {},
}
</script>

<style></style>
