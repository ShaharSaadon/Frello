<template>
  <section class="modal-picker">
    <header class="modal-picker-header">
      <h3>{{ title }}</h3>
      <button class="btn-modal-close" @click="$emit('closeModal')"></button>
      <!-- <button class="btn-modal-arrow icon" v-html="getSvg('arrowLeft')"></button> -->
    </header>

    <component
      :is="type"
      :info="info"
      @updateEntityVal="$emit('updateEntityVal', $event)"
      @createBoard="createBoard"
      @addChecklist="$emit('addChecklist', $event)"
      @saveTask="$emit('saveTask', $event)"
      @closeModal="$emit('closeModal')"
    />
  </section>
</template>

<script>
import LabelPicker from './ModalsPicker/LabelPicker.vue'
import MemberPicker from './ModalsPicker/MemberPicker.vue'
import ChecklistPicker from './ModalsPicker/ChecklistPicker.vue'
import CreateBoard from './ModalsPicker/CreateBoard.vue'
import DatePicker from './ModalsPicker/DatePicker.vue'
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
    createBoard(data) {
      this.$emit('createBoard', data)
      this.$emit('closeModal')
    },
  },
  computed: {
    info() {
      switch (this.type) {
        case 'LabelPicker':
          return {
            labels: this.task.labels,
            title: 'Labels',
          }
          break
        case 'MemberPicker':
          return {
            members: this.board.members,
            title: 'Members',
          }
          break
        case 'DatePicker':
          return {
            dueDate: this.task.dueDate,
            title: 'Dates',
          }
          break
        case 'CreateBoard':
          return {
            title: 'Create board',
          }
        case 'ChecklistPicker':
          return {
            title: 'Check list',
          }
        // case 'itemActions':
        //   return {
        //     title: 'Item actions',
        //   }

        default:
          break
      }
    },
    board() {
      return this.$store.getters.watchedBoard
    },
    task() {
      return this.$store.getters.currTask
    },
    title() {
      return this.info?.title
    },
  },
  components: {
    LabelPicker,
    MemberPicker,
    CreateBoard,
    ChecklistPicker,
    DatePicker,
  },
}
</script>
