<template>
  <article class="task-attachments">
    <h1 class="title"><span class="icon"></span> Attachments</h1>
    <!-- <pre>{{taskAttachments}}</pre> -->
    <div class="task-attachments-preview" v-for="attch in this.taskAttachments">
      <img v-if="attch.type === 'jpg' || 'png'" :src="attch.url" />
      <!-- <div  v-if="attch.type === 'jpg' || 'png'" :style="{'background-image': `url(${attch.url})`}"></div> -->
      <div class="task-attachments-info">
        <a :href="attch.url">{{ attch.url }}</a>
        <div class="file-info">
          <h4 class="title"></h4>
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
  methods: {},
  computed: {},
  created() {},
  components: {},
}
</script>
