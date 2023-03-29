<template>
    <h4>Board admins</h4>
    <BoardMembers />

    <h4>Description</h4>
</template>

<script>
import BoardMembers from '../BoardDetails/BoardMembers.vue';
export default {
    name: 'SideBarBoardDetails',
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        board() {
            return this.$store.getters.watchedBoard
        },
    },
    created() {

    },
    components: {
        BoardMembers
    },
}
</script>

<style></style>