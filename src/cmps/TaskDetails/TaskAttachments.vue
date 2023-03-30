<template>
  <article class="task-attachments">
    <h1 class="title"><span class="icon"></span> Attachments</h1>
    <!-- <pre>{{taskAttachments}}</pre> -->
    <div :key="attach.id" class="task-attachments-preview" v-for="attach in taskAttachments">
      <div v-if="attach.type === 'jpg' || 'png'" :style="{ backgroundColor: attach.bgc }" class="img-container">
        <img :src="attach.url" />
      </div>
      <div class="task-attachments-info">
        <a class="title-link" target="_blank" :href="attach.url">{{ attach.title || attach.url }}</a>
        <div class="file-info">
          <div class="tool-bar">
            <!-- <span class="dot"></span>
            <span>Comment</span> -->
            <span class="attach-link">Added {{ getTime(attach.uploadAt) }} </span>
            <span class="attach-link dot"></span>
            <span class="attach-link" @click="remove(attach.id)">Remove</span>
            <span class="attach-link dot"></span>
            <span class="attach-link" @click="edit($event, attach.id)">Edit</span>
          </div>
          <div class="flex align-center">
            <span class="btn-make-cover"></span>
            <span class="attach-link" @click="toggleCover(attach.url, attach.bgc)">
              {{ attach.url === taskCover?.url ? 'Remove cover' : 'Make cover' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { utilService } from '../../services/util.service'

export default {
  name: '',
  props: {
    taskAttachments: {
      type: Object,
      required: true,
    },
    taskCover: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {
    remove(id) {
      this.$emit('removeEntityVal', { key: 'attachments', val: id })
      this.$nextTick(this.removeCover)
    },
    edit(ev, id) {
      this.$emit('edit', ev, id)
    },
    removeCover() {
      const url = null
      const color = null
      this.$emit('saveTask', { key: 'cover', newVal: { isFull: false, color, url } })
    },
    toggleCover(url, color) {
      if (url === this.taskCover?.url) {
        url = null
        color = null
      }
      this.$emit('saveTask', { key: 'cover', newVal: { isFull: false, color, url } })
    },
    getTime(timeStamp) {
      return utilService.daysAgo(timeStamp)
    },
  },

  computed: {},
  created() {},
  components: {},
}
</script>
