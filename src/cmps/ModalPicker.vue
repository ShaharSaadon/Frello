<template>
  <section class="modal-picker">
    <header class="modal-picker-header">
      <h3>{{ title }}</h3>
      <button class="btn-modal-close" @click="$emit('closeModal')"></button>
      <!-- <button class="btn-modal-arrow icon" v-html="getSvg('arrowLeft')"></button> -->
    </header>

    <component :is="type" :info="info" @updateEntityVal="$emit('updateEntityVal', $event)" @createBoard="createBoard" />
  </section>
</template>

<script>
import LabelPicker from './ModalsPicker/LabelPicker.vue'
import MemberPicker from './ModalsPicker/MemberPicker.vue'
import CreateBoard from './ModalsPicker/CreateBoard.vue'
import { svgService } from '../services/svg.service.js'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  name: '',
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
    createBoard(data){
      this.$emit('createBoard', data)
      this.$emit('closeModal')
    }
  },
  computed: {
    info() {
      switch (this.type) {
        case 'LabelPicker':
          return {
            label: 'labels',
          }
          break
        case 'MemberPicker':
          return {
            members: this.board.members,
            title: 'Members',
          }
          break
        case 'CreateBoard':
          return {
            title: 'Create board',
          }
        default:
          break
      }
    },
    board() {
      return this.$store.getters.watchedBoard
    },
    title() {
      switch (this.type) {
        case 'LabelPicker':
          return 'Labels'
        case 'MemberPicker':
          return 'Members'
        case 'CreateBoard':
          return 'Create board'
        default:
          return 'No Title'
      }
    },
  },
  components: {
    LabelPicker,
    MemberPicker,
    CreateBoard,
  },
}
</script>
