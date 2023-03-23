<template>
    <router-link :to="'board/' + board._id">
    <li class="board-preview flex" :style="board.style">
            <div class="board-title"> {{ board.title }} </div>
        <!-- <button @click="$emit('removeBoard', board._id)">x</button> -->
        <!-- <button @click="$emit('updateBoard', board)">Update</button> -->
    </li>
</router-link>

</template>


<script>
export default {
    name: 'BoardPreview',
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        // boardId() {
        //     return this.$store.getters.watchedBoardId
        // }
    },
    created() {

    },
    components: {
    },
}
</script>

<style></style>