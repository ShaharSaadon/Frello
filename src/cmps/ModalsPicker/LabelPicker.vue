<template>
  <div class="label-picker">
    <input class="search-input" type="text" placeholder="Search Labels..." />
    <h3>Labels</h3>
    <div class="label-picker-ops" v-for="(label, idx) in labels" :key="idx">
      <span @click="toggleCheck(idx)" class="check-box" :class="label.isChecked ? 'checked' : ''"></span>
      <div :class="label.color" @click="toggleCheck(idx)" class="btn-label-tag label-tag"></div>
      <button class="btn-marker-edit" v-html="getSvg('marker')"></button>
    </div>
    <button>Create a new label</button>
  </div>
</template>

<script>
import { svgService } from '../../services/svg.service.js'
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
      labels: [
        {
          color: 'light-green',
          title: '',
          isChecked: false,
        },
        {
          color: 'light-blue',
          title: '',
          isChecked: false,
        },
        {
          color: 'light-orange',
          title: '',
          isChecked: false,
        },
        {
          color: 'light-red',
          title: '',
          isChecked: false,
        },
        {
          color: 'light-purple',
          title: '',
          isChecked: false,
        },
        {
          color: 'light-sky',
          title: '',
          isChecked: false,
        },
      ],
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
    toggleCheck(idx) {
      this.labels[idx].isChecked = !this.labels[idx].isChecked

      const { color, title } = this.labels[idx]
      this.$emit('updateEntityVal', { key: 'labels', val: { color, title } })
    },
  },
  computed: {},
  created() {
    this.labels.forEach((label) => {
      if (this.info.labels.find((l) => l.color === label.color)) label.isChecked = true
    })
  },
  components: {},
}
</script>

<style></style>
