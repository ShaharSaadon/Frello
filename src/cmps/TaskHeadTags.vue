<template>
  <article class="task-head-tags">
    <h3 class="title">{{ info.title }}</h3>
    <button @click="$emit('toggleWatch')" class="notifications"><span></span> {{ info.isWatch ? 'Watching' : 'Watch' }}</button>
  </article>
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
  computed: {},
  created() {},
  components: {},
}
</script>
