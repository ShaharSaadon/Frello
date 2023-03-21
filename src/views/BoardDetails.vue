<template>
  <section v-if="board">
    <h1>Board Details - {{ board.title }}</h1>
    <!-- <pre>{{ board }}</pre> -->
    
    <GroupList :groups="groups"/>
    <!-- group list ->groupPreview->taskList->taskPreview->taskDetails -->
    
    <!-- <h3>{{ board.boardname }} score: {{ board.score }}</h3>
    <img style="max-width: 200px;" :src="board.imgUrl" />
    <ul>
      <li v-for="review in board.givenReviews" :key="review._id">
        {{ review.txt }}
        <RouterLink :to="`/board/${review.aboutBoard._id}`">
          About {{ review.aboutBoard.fullname }}
        </RouterLink>
      </li>
    </ul>

    <details>
      <summary>Full JSON</summary>
      <pre>{{ board }}</pre>
    </details> -->
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
import GroupList from '../cmps/GroupList.vue'
export default {
  data() {
    return {
      // board: null
    }
  },
  async created() {
    // const board = await boardService.getById(id)
    // this.board = board
  },
  watch: {
    boardId: {
      handler() {
        if(this.boardId){
            this.$store.dispatch({ type: "loadAndWatchBoard", boardId: this.boardId })
        }
      },
      immediate: true,
    },
  },
  computed: {
    board() {
      return this.$store.getters.watchedBoard
    },
    boardId() {
      return this.$route.params.id
    },
    groups(){
      return this.board.groups
    }

  },components:{
    GroupList,
  }
}
</script>