<template>
  <div class="date-picker">
    <div class="block">
      <el-date-picker
        v-model="date"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </div>
    <VDatePicker locale="en" v-model="date" mode="dateTime" transparent borderless expanded />
    <button @click="saveDate" class="btn-save-date">save</button>
    <button @click="removeDate" class="btn-remove-date">remove</button>

  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value3: 0,
      date: this.info.dueDate,
    }
  },
  methods: {
    saveDate() {
      this.$emit('saveTask', { key: 'dueDate', newVal: this.date })
      this.$emit('closeModal')
    },
    removeDate() {
      this.date = 0
      this.saveDate()
    },
  },
}
</script>
