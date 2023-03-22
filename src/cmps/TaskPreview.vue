<template>
    <li class="task-preview">
        <h1>task-preview</h1>
        <RouterLink :to="'/board/' + boardId + '/' + task.id">{{ task.title }}</RouterLink>
        <RouterView :task="task" />
        <button @click="remove(task.id)">x</button>
    </li>
</template>

<script>
import {eventBus} from '../services/event-bus.service.js'
export default {
    name: 'TaskPreview',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        remove(taskId) {
            eventBus.emit('removeTask',taskId)
        }
    },
    computed: {
        boardId() {
            return this.$store.getters.watchedBoardId
        }
    },
    created() {

    },
    components: {
    },
}
</script>

<style></style>