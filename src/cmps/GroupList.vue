<template>
  <section class="group-list">
    <div class="draggable-group-list">
      <Draggable
        v-if="groups.length"
        v-model="groupList"
        class="list-group"
        ghost-class="ghost"
        item-key="name"
        drag-class="drag"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element }">
          <div>
            <GroupPreview
              :key="element.id"
              :group="element"
              @removed="$emit('removed', element.id)"
              @saveTask="$emit('saveTask', $event)"
              @updateGroup="$emit('updateGroup', $event)"
            />
          </div>
        </template>
      </Draggable>
      <li class="group-preview-wrapper container">
        <transition>
          <div
            class="btn-add-another-list flex align-center"
            v-if="!isOnAdd"
            @click="isOnAdd = true"
          >
            <span class="plus-icon"></span>
            <span>Add another list</span>
          </div>
        </transition>

        <transition>
          <div v-if="isOnAdd" class="group-preview-content add-new-group">
            <form @submit.prevent="addGroup" class="flex">
              <input v-model="groupToAdd.title" placeHolder="Enter list title..." />
              <div class="flex align-center">
                <button>Add list</button>
                <span @click.prevent="isOnAdd = false"></span>
              </div>
            </form>
          </div>
        </transition>
      </li>
    </div>
  </section>
</template>
<script>
import { eventBus } from "../services/event-bus.service.js";
import { boardService } from "../services/board.service.local.js";
import GroupPreview from "../cmps/GroupPreview.vue";
import Draggable from "vuedraggable";

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
      drag: false,
    };
  },
  methods: {
    addGroup() {
      if (!this.groupToAdd.title) return;
      this.$emit("addGroup", this.groupToAdd);
      this.groupToAdd = boardService.getEmptyGroup();
      this.isOnAdd = false;
    },
    toggleIsOnAdd() {
      this.isOnAdd = !this.isOnAdd;
    },
  },
  computed: {
    groupList: {
      get() {
        return this.groups;
      },
      set(groups) {
        this.$emit("updateGroups", groups);
      },
    },
  },
  created() {},
  components: {
    GroupPreview,
    Draggable,
  },
};
</script>
