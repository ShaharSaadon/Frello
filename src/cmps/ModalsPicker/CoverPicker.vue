<template>
  <div class="cover-picker">
    <h3>Size</h3>
    <div class="cover-preview-container">
      <div
        @click="toggleIsFull(false)"
        :style="this.url ? imgPreview : isGray"
        :class="[this.isFull ? '' : 'active', this.color]"
        class="cover-preview"
      >
        <div class="cover-preview-info">
          <div class="content-preview long"></div>
          <div class="content-preview medium"></div>
        </div>
      </div>
      <div
        @click="toggleIsFull(true)"
        :style="this.url ? imgPreview : isGray"
        :class="[this.color, this.isFull ? 'active' : '']"
        class="cover-preview"
      >
        <div class="cover-preview-info-full">
          <div class="content-preview long"></div>
          <div class="content-preview medium"></div>
        </div>
      </div>
    </div>
    <button @click="switchColor(null)" class="btn-cover-picker">Remove cover</button>
    <h3>Colors</h3>
    <div class="color-table">
      <div
        @click="switchColor(color)"
        class="preview"
        :class="color"
        :key="color"
        color
        v-for="color in colorOne"
      ></div>
      <div
        @click="switchColor(color)"
        class="preview"
        :class="color"
        :key="color"
        color
        v-for="color in colorTwo"
      ></div>
    </div>
    <h3>Attachments</h3>
    <div class="img-table">
      <div
        @click="setToImg(attach)"
        :key="attach.id"
        v-for="attach in info.attachments"
        :style="{ backgroundImage: `url(${attach.url})` }"
        class="preview"
      ></div>
    </div>
    <!-- <button @click="addChecklist" class="btn-cover-picker">Add</button> -->
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
  },
  name: '',
  data() {
    return {
      color: this.info.cover?.color || null,
      isFull: this.info.cover?.isFull || false,
      url: this.info.cover?.url || null,
      colorOne: ['dark-green', 'dark-yellow', 'dark-orange', 'dark-red', 'dark-purple'],
      colorTwo: ['dark-blue', 'dark-sky', 'dark-lime', 'dark-pink', 'dark-black'],
    }
  },
  methods: {
    switchColor(color) {
      if (this.color === color) return
      this.color = color
      this.url = null
      this.$emit('saveTask', { key: 'cover', newVal: { color: this.color, isFull: this.isFull, url: null } })
    },
    setToImg(attach) {
      if (this.url === attach.url) return
      this.color = attach.bgc
      this.url = attach.url
      this.$emit('saveTask', { key: 'cover', newVal: { color: this.color, isFull: this.isFull, url: this.url } })
    },
    toggleIsFull(isFull) {
      this.isFull = isFull
      console.log('isFull: ', isFull)
      this.$emit('saveTask', { key: 'cover', newVal: { color: this.color, isFull: this.isFull, url: null } })
    },
    attachments() {
      return info.attachments.filter((attach) => attach.type === 'png' || 'jpg')
    },
  },
  computed: {
    isGray() {
      return !this.color ? { backgroundColor: '#091e4240' } : ''
    },
    imgPreview() {
      return { backgroundImage: `url(${this.url})`, backgroundColor: this.color }
    },
  },
  created() {},
  components: {},
}
</script>
