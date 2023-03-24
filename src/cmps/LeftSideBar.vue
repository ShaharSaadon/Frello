<template>
    <div class="left-side-bar">
        <div class="left-side-header flex">
            <div class="workspace-logo flex">
                T
            </div>
            <h5>Trello Workspace</h5>
            <img class="QEaOSGiXwmOCFk" src="https://a.trellocdn.com/prgb/assets/58243262833f693f6101.svg"
                alt="Workspace navigation collapse icon">
        </div>
        <h5 class="left-side-bar-title">Your boards</h5>
        <ul>
            <li v-for="board in boards" :key="board._id" :board="board">
                {{ board.title }}
                <div class="boxer" :style="board.style">
                    a
                </div>
                <!-- <img :src="getBackgroundImage(board.style.backgroundImage)"> -->
                <pre>{{ board.style.backgroundImage }}</pre>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {
        toggleSideBar() {
            console.log('hola')
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
    },
    created() {

    },
    components: {

    },
}
</script>

