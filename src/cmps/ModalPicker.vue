<template>
  <section class="modal-picker">
    <h3>{{ title }}</h3>
    <component :is="type" :info="info" @updateEntityVal="$emit('updateEntityVal', $event)" />
  </section>
</template>

<script>
import LabelPicker from './ModalsPicker/LabelPicker.vue'
import MemberPicker from './ModalsPicker/MemberPicker.vue'
import CreateBoard from './ModalsPicker/CreateBoard.vue'
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  name: '',
  data() {
    return {}
  },
  methods: {},
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
