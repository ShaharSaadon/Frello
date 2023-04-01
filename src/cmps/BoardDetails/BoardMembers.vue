<template>
  <div class="board-members">
    <Draggable
      v-model="memberList"
      class="board-members-draggable flex"
      ghost-class="ghost-member"
      item-key="id"
      drag-class="drag-member"
      @start="drag = true"
      @end="drag = false"
      :clone="cloneDog"
      :group="{ name: 'members', pull: 'clone', put: false }"
    >
      <template #item="{ element }">
        <div class="member-profile-box flex align-center">
          <img :src="element.imgUrl" class="member-profile" />
          <img src="../../assets/imgs/memberProfile.png" class="arrow" />
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script>
import { svgService } from '../../services/svg.service'
import Draggable from 'vuedraggable'

export default {
  name: 'BoardMembers',
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMerlloSvg(iconName)
    },
    cloneDog(member) {
      return member._id
    },
  },
  computed: {
    members() {
      return this.$store.getters.watchedBoard.members
    },
    memberList: {
      get() {
        return this.members
      },
      set(members) {
        console.log('members: ', members)

        // this.$emit('updateTasks', {tasks, groupId:this.groupId})
      },
    },
  },
  created() {},
  components: {
    Draggable,
  },
}
</script>
