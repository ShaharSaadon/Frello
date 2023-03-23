<template>
    <RouterLink style="text-decoration: none;" :to="'/board/' + boardId + '/' + task.id">
        <li class="task-preview">
            <h2 class="task-preview-title">{{ task.title }}</h2>
        </li>
    </RouterLink>
    <RouterView :task="task" :groupId="groupId" />

</template>



<script>
export default {
    name: 'TaskPreview',
    props: {
        task: {
            type: Object,
            required: true,
        },
        groupId: {
            type: String,
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