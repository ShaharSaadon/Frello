<template>
  <div class="label-picker">
    <input class="search-input" type="text" placeholder="Search Labels..." />
    <h3>Labels</h3>
    <div class="label-picker-ops" v-for="(label, idx) in labels" :key="idx">
      <span @click="toggleCheck(idx)" class="check-box" :class="label.isChecked ? 'checked' : ''"></span>
      <div :class="label.color" @click="toggleCheck(idx)" class="btn-label-tag label-tag">{{ label.title }}</div>
      <button
        @click="$emit('toLabelEditor', { id: label.id, color: label.color, title: label.title })"
        class="btn-marker-edit"
        v-html="getSvg('marker')"
      ></button>
    </div>
    <!-- <button>Create a new label</button> -->
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
      labels: [
        {
          id: 'l200',
          color: 'light-green',
          title: '',
          isChecked: false,
        },
        {
          id: 'l201',
          color: 'light-blue',
          title: '',
          isChecked: false,
        },
        {
          id: 'l202',
          color: 'light-orange',
          title: '',
          isChecked: false,
        },
        {
          id: 'l203',
          color: 'light-red',
          title: '',
          isChecked: false,
        },
        {
          id: 'l204',
          color: 'light-purple',
          title: '',
          isChecked: false,
        },
        {
          id: 'l205',
          color: 'light-sky',
          title: '',
          isChecked: false,
        },
      ],
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    toggleCheck(idx) {
      const type = this.labels[idx].isChecked ? 'removeEntityVal' : 'updateEntityVal'
      this.labels[idx].isChecked = !this.labels[idx].isChecked

      const { color, title, id } = this.labels[idx]
      this.$emit(type, { key: 'labels', val: { color, title, id } })
    },
  },
  computed: {},
  created() {
    this.labels.forEach((label) => {
      if (this.info.labels.find((l) => l.id === label.id)) label.isChecked = true
    })
  },
  components: {},
}
</script>

<style></style>
