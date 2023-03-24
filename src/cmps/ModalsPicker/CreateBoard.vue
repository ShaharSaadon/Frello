<template>
  <div class="create-board">
    <div class="demo-board" :style="getDemoBoardStyle">
      <img src="https://a.trellocdn.com/prgb/assets/14cda5dc635d1f13bc48.svg" alt="" />
    </div>

    <p>Backround</p>
    <ul class="color-choices clean-list grid">
      <li v-for="bgImg in bgImgs" :key="bgImg">
        <button 
        @click="chosenBg = bgImg" 
        :style="{ backgroundImage: bgImg }"
        :class="getCheckedClass(bgImg)"
        >
        </button>
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
  name: "",
  data() {
    return {
      bgImgs: [
        "url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)",
        "url(https://a.trellocdn.com/prgb/assets/d106776cb297f000b1f4.svg)",
        "url(https://a.trellocdn.com/prgb/assets/8ab3b35f3a786bb6cdac.svg)",
        "url(https://a.trellocdn.com/prgb/assets/a7c521b94eb153008f2d.svg)",
        "url(https://a.trellocdn.com/prgb/assets/aec98becb6d15a5fc95e.svg)",
        "url(https://a.trellocdn.com/prgb/assets/b75536d1afb40980ca57.svg)",
        "url(https://a.trellocdn.com/prgb/assets/92e67a71aaaa98dea5ad.svg)",
        "url(https://a.trellocdn.com/prgb/assets/941e9fef7b1b1129b904.svg)",
        "url(https://a.trellocdn.com/prgb/assets/1cbae06b1a428ad6234a.svg)",
      ],
      chosenBg: "url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)",
      title: "",
    };
  },
  methods: {
    getCheckedClass(bgImg){
      return this.chosenBg === bgImg ? 'checked' : ''
    }
  },
  computed: {
    getDemoBoardStyle() {
      return { backgroundImage: this.chosenBg };
    },
    createNewBoard() {
      this.$emit('createBoard', {title: this.title, bg:this.chosenBg})
    },
  },
  created() {},
  components: {},
};
</script>

<style></style>
