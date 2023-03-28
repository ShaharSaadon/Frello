<template>
  <article class="task-activities">
    <h1 class="title"><span class="icon"></span> Activity</h1>
    <!-- Comments Start -->
    <ul class="task-activities-list clean-list">
      <li v-for="comment in taskComments" :key="comment.id" :comment="comment" class="activity flex-column" >
         <img :src="comment.byMember.imgUrl" class="member-profile">
        <div class="activity-description">
          <span class="by-member">{{ comment.byMember.fullname }} </span>
          <p class="activity-text"> {{ ' '+comment.txt }} </p> 
          <span class="time-ago">{{ getTime(comment.createdAt)}} </span>
        </div>
      </li>
    </ul>


    <!-- Comments End -->
    <button class="btn-toggle-activities" @click="showActivities=!showActivities">{{showActivities ? 'Show ' : 'Hide '}}Details</button>
   <div class="comment-box">
    <img :src="loggedInUser.imgUrl" class="member-profile">
    <textarea placeholder="Write a comment..." class="comment-input" v-model="newComment.txt"  @input="resize($event)"></textarea>
    <button class="btn-save-comment" @click="addComment"
>Save</button>
  </div>
    
  
  <ul class="task-activities-list clean-list">
      <li v-for="activity in taskActivities" :key="activity.id" :activity="activity" class="activity flex-column" v-if="showActivities">
        <img :src="activity.byMember.imgUrl" class="member-profile">
        <div class="activity-description">
          <span class="by-member">{{ activity.byMember.fullname }} </span>
          <p class="activity-text"> {{ ' '+activity.txt }} </p>
          <!-- <pre> {{ activity }} </pre> -->
          <span class="time-ago">{{ getTime(activity.createdAt)}} </span>
        </div>
      </li>
    </ul>


  </article>
</template>

<script>
import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service.local'

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
    taskComments: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      showActivities: true,
      newComment: boardService.getEmptyComment()
    }
  },
  methods: {
    getTime(timeStamp){
            return utilService.daysAgo(timeStamp)
        },
      resize(e) {
      e.target.style.height = 'maxcontent'
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    addComment(){
      this.$emit('updateEntityVal', { key: 'comments', val:this.newComment })
      this.newComment=boardService.getEmptyComment()    
    }
    
        
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
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    
  },
  created() {

  },
  components: {

  },
}
</script>
