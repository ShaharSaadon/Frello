<template>
  <article class="task-attachments">
    <h1 class="title"><span class="icon"></span> Attachments</h1>
    <!-- <pre>{{taskAttachments}}</pre> -->
    <div class="task-attachments-preview" v-for="attch in this.taskAttachments">
      <div v-if="attch.type === 'jpg' || 'png'" :style="{ backgroundColor: attch.bgc}" class="img-container">
        <img :src="attch.url" />
      </div>
      <!-- <div  v-if="attch.type === 'jpg' || 'png'" :style="{'background-image': `url(${attch.url})`}"></div> -->
      <div class="task-attachments-info">
        <a class="title-link" target="_blank" :href="attch.url">{{ attch.title || attch.url }}</a>
        <div class="file-info">
          <div class="tool-bar">
            <span></span>
            <span class="dot"></span>
            <span>Comment</span>
            <span class="dot"></span>
            <span>Remove</span>
            <span class="dot"></span>
            <span>Edit</span>
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
  },
  data() {
    return {}
  },
  methods: {
  },
  computed: {},
  created() {},
  components: {},
}
</script>
