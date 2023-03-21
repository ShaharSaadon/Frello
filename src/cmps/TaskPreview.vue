<template>
    <li class="task-preview">
        <h1>task-preview</h1>
        <RouterLink :to="'/board/' + boardId + '/' + task.id">{{ task.title }}</RouterLink>
        <RouterView :task="task"/>
    </li>
</template>

<script>

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