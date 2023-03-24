<template>
  <article class="task-head-tags">
    <h3 class="title">{{ info.title }}</h3>
    <button class="notifications">Watch</button>
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
