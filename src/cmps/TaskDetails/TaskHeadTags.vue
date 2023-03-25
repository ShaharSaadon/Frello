<template>
  <div class="task-head-tags">
    <!-- <pre>{{ info }}</pre> -->
    <div v-if="members?.length">
      <h3 class="title">Members</h3>
      <div class="head-members">
        <img v-for="member in members" :src="member.imgUrl" class="member-profile" />
      </div>
    </div>
    <div v-if="labels?.length">
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
    <div v-if="info?.dueDate">
      <h3 class="title">Due date</h3>
      <button class="notifications">{{getDate}}</button>
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
    },
    getDate(){
      return (new Date(this.info.dueDate)).toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    members() {
      return this.$store.getters.watchedBoard.members.filter(m =>{
        if (this.info.members?.includes(m._id)) return m
      } )
    },
  },
  created() {},
  components: {},
}
</script>
