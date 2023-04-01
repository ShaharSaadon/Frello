<template>
  <div class="task-members">
    <!-- <Draggable 
        class="dragArea list-group" 
        :list="list2" group="people" 
        @change="log" 
        item-key="name">
      <template #item="{ element }">
        <div class="list-group-item">
          {{ element.name }}
        </div>
      </template>
    </Draggable> -->

    <div class="flex align-center" v-for="(member, idx) in taskMembers" :key="member._id">
      <img :src="member.imgUrl" class="member-profile" />
    </div>
  </div>
</template>

<script>
import { svgService } from '../services/svg.service'
import Draggable from 'vuedraggable'

export default {
  name: 'BoardMembers',
  props: {
    members: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
  },
  computed: {
    taskMembers() {
      return this.$store.getters.watchedBoard.members.filter((m) => {
        if (this.members?.includes(m._id)) return m
      })
    },
  },
  created() {},
  components: {
    Draggable,
  },
}
</script>
