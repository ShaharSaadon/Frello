<template>
  <article class="task-activities">
    <h1 class="title"><span class="icon"></span> Activities</h1>
    <ul class="task-activities-list clean-list">
      <li v-for="activity in taskActivities" :key="activity.id" :activity="activity" class="activity flex">
        <img :src="activity.byMember.imgUrl" class="member-profile">
        <div class="activity-description">
          <span>{{ activity.byMember.fullname }} </span>
          {{ activity.txt }}
        </div>
      </li>
    </ul>


  </article>
</template>

<script>
import { utilService } from '../../services/util.service'

export default {
  name: 'TaskActivities',
  props: {
    taskId: {
      type: Number,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    taskActivities() {
      const activities = this.board.activities.filter(activity => activity.taskId === this.taskId)
      let modifiedActivities = activities.map(activity => {
        return { ...activity, txt: activity.txt.replace(`${this.taskTitle}`, 'this card') };
      });
      return modifiedActivities
    }
  },
  created() {

  },
  components: {

  },
}
</script>
