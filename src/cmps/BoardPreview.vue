<template>
    <li class="board-preview">
        <router-link :to="'board/' + board._id ">
          {{board.title}}
        </router-link>
        <button @click="removeBoard(board._id)">x</button>
        <button @click="updateBoard(board)">Update</button>

    </li>
    
  
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