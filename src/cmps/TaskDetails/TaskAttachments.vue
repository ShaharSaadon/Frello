<template>
  <article class="task-attachments">
    <h1 class="title"><span class="icon"></span> Attachments</h1>
    <div>
        <img :src="taskAttachments[0].url">
        <pre>{{taskAttachments}}</pre>
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
    return {
   
    }
  },
  methods: {
  
  },
  computed: {
   
  },
  created() {
  },
  components: {},
}
</script>
