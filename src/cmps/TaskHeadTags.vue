<template>
  <div class="task-head-tags">
    <div>
      <h3 class="title">Labels</h3>
      <div class="head-labels">
        <div v-for="label in labels" class="label-tag" :class="label.color">{{ label.title }}</div>
      </div>
    </div>
    <div>
      <h3 class="title">Notifications</h3>
      <button @click="$emit('toggleWatch')" class="notifications">
        <span></span> {{ info.isWatch ? 'Watching' : 'Watch' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskHeadTags',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    labels(){
      return this.info.labels
    }
  },
  created() {},
  components: {},
}
</script>
