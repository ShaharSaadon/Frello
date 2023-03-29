<template>
  <div class="attachments-picker">
    <input ref="mainInput" v-model="attachToEdit.title" type="text" />
    <button @click="update" class="btn-attach">Update</button>
  </div>
</template>

<script>
import { uploadService } from '../../services/upload.service'
import { utilService } from '../../services/util.service'

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  name: '',
  data() {
    return {
      attachToEdit: null,
    }
  },
  methods: {
    update() {
      this.$emit('updateEntityVal', { key: 'attachments', val: this.attachToEdit })
      this.$emit('closeModal')
    },
  },
  computed: {
    attach() {
      return { ...this.info.attachments.find((attach) => attach.id === this.info.id) }
    },
  },
  created() {
    console.log("this.info.attachments: ", this.info.attachments);
    this.attachToEdit =  this.attach
    this.$nextTick(() => this.$refs.mainInput.focus())
    this.$nextTick(() => this.$refs.mainInput.select())
  },
  components: {},
}
</script>
