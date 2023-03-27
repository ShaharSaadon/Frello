<template>
  <div class="attachments-picker">
    <form @submit.prevent="handleFile"></form>
    <h3>Attach a link</h3>
    <input placeholder="Paste any link here..." v-model="this.imgUrl" @change="handleFile" type="text" >
    <button class="btn-attach">Attach</button>
  </div>
</template>

<script>
import { uploadService } from '../../services/upload.service'
import { utilService } from '../../services/util.service'

export default {
  props: {},
  name: '',
  data() {
    return {
      imgUrl: '',
      title: '',
    }
  },
  methods: {
    async handleFile(ev) {
      const file = this.imgUrl

      const { url } = await uploadService.uploadImg(file)
      this.imgUrl = url
      console.log("url: ", url);
      const val = {url, title: this.title, id: utilService.makeId()}
      this.$emit('updateEntityVal', { key: 'attachments', val })
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
