<template>
  <div class="attachments-picker">
    <form @submit.prevent="handleFile"></form>
    <h3>Attach a link</h3>
    <input placeholder="Paste any link here..." v-model="this.imgUrl" @change="handleFile" type="text" />
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
      const urlSplit = url.split('.')
      const type = urlSplit[urlSplit.length - 1]
      

      const val = { url, title: this.title, id: utilService.makeId(), type}
      this.$emit('updateEntityVal', { key: 'attachments', val })
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>
