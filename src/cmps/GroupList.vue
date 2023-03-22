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
        <button v-if="!isOnAdd" @click="isOnAdd = true">Add another list</button>

        <div v-if="isOnAdd" class="group-preview-content add-new-group">
          <form @submit.prevent="addGroup">
            <textarea v-model="groupToAdd.title" @blur="isOnAdd = false" placeHolder="Enter list title..." rows="1"></textarea>
            <button>Add list</button>
            <button @click.prevent>x</button>
          </form>

          <!-- <footer class="flex">
          </footer> -->
        </div>
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
    return {
      groupToAdd: boardService.getEmptyGroup(),
      isOnAdd: false,
    };
  },
  methods: {
    addGroup() {
      this.$emit("addGroup", this.groupToAdd);
      this.groupToAdd = boardService.getEmptyGroup();
      this.isOnAdd = false;
    },
    toggleIsOnAdd() {
      this.isOnAdd = !this.isOnAdd;
    },
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
