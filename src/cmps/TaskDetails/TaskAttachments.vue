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
            <span></span>
            <!-- <span class="dot"></span>
            <span>Comment</span> -->
            <span class="dot"></span>
            <span @click="remove(attach.id)">Remove</span>
            <span class="dot"></span>
            <span @click="edit($event, attach.id)">Edit</span>
          </div>
          <span @click="toggleCover(attach.url)">Make cover</span>
        </div>
        <pre>{{ coverToEdit }}</pre>
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
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    remove(id) {
      this.$emit('removeEntityVal', { key: 'attachments', val: id })
    },
    edit(ev, id) {
      this.$emit('edit', ev, id)
    },
    toggleCover(url) {
      const newUrl = this.taskCover.url === url ? null : url
      this.$emit('saveTask', { key: 'cover', newVal: { ...this.taskCover, url: newUrl } })
    },
  },

  computed: {},
  created() {},
  components: {},
}
</script>
