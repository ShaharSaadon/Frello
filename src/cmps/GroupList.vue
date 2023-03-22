<template>
  <section class="group-list">
    <ul class="clean-list">
      <GroupPreview
        v-if="groups.length"
        v-for="group in groups"
        :key="group.id"
        :group="group"
        @removed="$emit('removed', group.id)"
      />

      <li class="group-preview-wrapper">
        <button @click="addGroup">Add another list</button>
      </li>
    </ul>
  </section>
</template>
<script>
import { eventBus } from "../services/event-bus.service.js";
import { boardService } from "../services/board.service.local.js";
import GroupPreview from "../cmps/GroupPreview.vue";


export default {
  name: "GroupList",
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    addGroup(){
      const group = boardService.getEmptyGroup()
      console.log("group: ", group);
      this.$emit('addGroup', group)
    }
  },
  computed: {},
  created() {
    eventBus.on("removeTask", (taskId) => {
      console.log("heyThere", taskId);
      this.$emit("removeTask", taskId);
    });
  },
  components: {
    GroupPreview,
  },
};
</script>

<style></style>
