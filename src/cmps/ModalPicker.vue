<template>
  <section ref="modal" class="modal-picker">
    <header class="modal-picker-header">
      <h3>{{ title }}</h3>
      <button class="btn-modal-close" @click="$emit('closeModal')"></button>
      <button
        v-if="isArrowBack"
        @click="switchDynamicCmp"
        class="btn-modal-arrow icon"
        v-html="getSvg('arrowLeft')"
      ></button>
    </header>

    <component
      :is="modal.type"
      :info="info"
      @updateEntityVal="$emit('updateEntityVal', $event)"
      @removeEntityVal="$emit('removeEntityVal', $event)"
      @createBoard="createBoard"
      @addChecklist="$emit('addChecklist', $event)"
      @saveTask="$emit('saveTask', $event)"
      @closeModal="$emit('closeModal')"
      @toLabelEditor="toLabelEditor"
      @updateLabel="$emit('updateLabel', $event)"
      @removeLabel="$emit('removeLabel', $event)"
      @switchDynamicCmp="switchDynamicCmp"
    />
  </section>
</template>

<script>
import LabelEditor from './ModalsPicker/LabelEditor.vue'
import LabelPicker from './ModalsPicker/LabelPicker.vue'
import MemberPicker from './ModalsPicker/MemberPicker.vue'
import ChecklistPicker from './ModalsPicker/ChecklistPicker.vue'
import CreateBoard from './ModalsPicker/CreateBoard.vue'
import DatePicker from './ModalsPicker/DatePicker.vue'
import AttachmentPicker from './ModalsPicker/AttachmentPicker.vue'
import CoverPicker from './ModalsPicker/CoverPicker.vue'
import { svgService } from '../services/svg.service.js'

export default {
  props: {
    modal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      labelToEdit: null,
    }
  },
  created() {
    // setTimeout(()=> {
    //   const modal = this.$refs.modal
    //   const rect = modal.getBoundingClientRect()
    //   if (rect.bottom > window.visualViewport.height) this.$emit('outOfView', { height: rect.height })
    // }, 500 )

  },
  name: '',
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    createBoard(data) {
      this.$emit('createBoard', data)
      this.$emit('closeModal')
    },
    toLabelEditor(labelId) {
      this.labelToEdit = labelId
      this.$emit('switchDynamicCmp', 'LabelEditor')
    },
    switchDynamicCmp() {
      switch (this.modal.type) {
        case 'LabelEditor':
          this.$emit('switchDynamicCmp', 'LabelPicker')
          break
      }
    },
  },
  computed: {
    info() {
      switch (this.modal.type) {
        case 'CoverPicker':
          return {
            title: 'Cover',
            cover: this.task.cover,
            attachments: this.task.attachments,
          }
        case 'AttachmentPicker':
          return {
            title: 'Attach from…',
          }
        // case 'AttachmentEditor':
        //   return {
        //     title: 'Edit attachment',

        //   }
        case 'LabelPicker':
          return {
            labels: this.task.labels,
            title: 'Labels',
          }
        case 'LabelEditor':
          return {
            labelId: this.labelToEdit,
            title: 'Edit label',
          }
          break
        case 'MemberPicker':
          return {
            members: this.board.members,
            taskMembers: this.task.members,
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
    isArrowBack() {
      return this.modal.type === 'LabelEditor'
    },
  },
  components: {
    LabelPicker,
    LabelEditor,
    MemberPicker,
    CreateBoard,
    ChecklistPicker,
    DatePicker,
    AttachmentPicker,
    CoverPicker,
  },
}
</script>
