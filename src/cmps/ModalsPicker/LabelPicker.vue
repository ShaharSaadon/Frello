<template>
  <div class="label-picker">
    <h1>{{ info.label }}</h1>
    <hr />
    <input type="text" placeholder="Search Labels..." />
    <h3>Labels</h3>
    <div class="label-picker-ops" v-for="label in labels" :key="label.color">
      <span @click="toggleCheck(label)" class="check-box" :class="label.isChecked" v-html="getSvg('checkBox')"></span>
      <div class="btn-label-tag label-tag"></div>
      <button><span>e</span></button>
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
      labels: {
        green: {
          color: '',
          title: '',
          isChecked: false,
        },
        yellow: {
          color: '',
          title: '',
          isChecked: false,
        },
        orange: {
          color: '',
          title: '',
          isChecked: false,
        },
      },
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getTrelloSvg(iconName)
    },
    toggleCheck(isChecked) {
  
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>
