<template>
    <RouterLink style="text-decoration: none;" :to="'/board/' + boardId + '/' + task.id">
        <li class="task-preview">
            <h2 class="task-preview-title">{{ task.title }}</h2>
            <div class="action-badges">
                <!-- <div class="badge-watch"></div> -->
                <!-- <div class="badge-date">mar 25</div> -->
                <div v-if="task.description" class="badge-description"></div>
                <!-- <div class="badge-attachments">1</div> -->
                <!-- <div class="badge-checklist">0/1</div> -->
            </div>
        </li>
    </RouterLink>
    <!-- <RouterView :task="task" :groupId="groupId" /> -->

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