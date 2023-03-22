<template>
  <section class="group-list">
      <ul v-if="groups.length" class="clean-list">
        <GroupPreview
          v-for="group in groups"
          :key="group.id"
          :group="group"
          @removed="$emit('removed', group.id)"
        />
      </ul>
  </section>
</template>
<script>
import {eventBus} from '../services/event-bus.service.js'
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
  methods: {},
  computed: {},
  created() {
      eventBus.on('removeTask', taskId =>{
        console.log('heyThere',taskId)
        this.$emit('removeTask',taskId,)
      })
  
  },
  components: {
    GroupPreview,
  },
};
</script>

<style></style>
