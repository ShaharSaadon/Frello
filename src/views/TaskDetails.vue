<template>
  <section class="task-details">
    <main class="container">
      <div class="header">
        <span></span>
        <div class="title">
          <textarea data-autosize="true">asdasdasdasdasdasdasdasd</textarea>
        </div>
        <p>in list {{ task.title }} </p>
      </div>
      <div class="main-content"></div>
      <div class="sidebar flex">
        <h3>Suggested</h3>
        <button class="button-link">Join</button>
        <h3>Add to card</h3>
        <button class="button-link">Members</button>
        <button class="button-link">Labels</button>
        <button class="button-link">Checklist</button>
        <button class="button-link">Dates</button>
        <button class="button-link">Attachment</button>
        <button class="button-link">Cover</button>
        <button class="button-link">Custom Fields</button>
      </div>

    </main>
  </section>
</template>

<script>
// import {boardService} from '../services/board.service'
// import GroupList from '../cmps/GroupList.vue'
import { svgService } from "../services/svg.service.js"

export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
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
  },
  computed: {

  },
  methods: {
    // getSvg(iconName) {
    //   return svgService.getTrelloSvg(iconName)
    // },
  },
  components: {

  }
}
</script>