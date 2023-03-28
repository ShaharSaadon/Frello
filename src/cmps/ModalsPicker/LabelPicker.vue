<template>
  <div class="label-picker">
    <input class="search-input" type="text" v-model="filterBy" placeholder="Search Labels..." />
    <h3>Labels</h3>
    <div class="label-picker-ops" v-for="(label, idx) in filteredLabels" :key="idx">
      <span @click="toggleCheck(idx)" class="check-box" :class="label.isChecked ? 'checked' : ''"></span>

      <div :class="label.color" @click="toggleCheck(idx)" class="btn-label-tag label-tag">{{ label.title }}</div>
      <button @click="$emit('toLabelEditor', label.id)" class="btn-marker-edit" v-html="getSvg('marker')"></button>
    </div>
    <button @click="$emit('toLabelEditor', null)" class="btn-create">Create a new label</button>
  </div>
</template>

<script>
import { svgService } from '../../services/svg.service.js'
import { utilService } from '../../services/util.service.js'
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  name: '',
  data() {
    return {
      labelsToEdit: [],
      filterBy: '',
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    toggleCheck(idx) {
      const type = this.labelsToEdit[idx].isChecked ? 'removeEntityVal' : 'updateEntityVal'
      this.labelsToEdit[idx].isChecked = !this.labelsToEdit[idx].isChecked

      const { id } = this.labelsToEdit[idx]
      this.$emit(type, { key: 'labels', val: id })
    },
  },
  computed: {
    labels() {
      return JSON.parse(JSON.stringify(this.$store.getters.labels))
    },
    filteredLabels() {
      const regex = new RegExp(this.filterBy, 'i')
      return this.labelsToEdit.filter((label) => regex.test(label.title))
    },
  },
  created() {
    this.labelsToEdit = this.labels
    this.labelsToEdit.forEach((label) => {
      if (this.info.labels.find((id) => id === label.id)) label.isChecked = true
    })
  },
  components: {},
}
</script>
