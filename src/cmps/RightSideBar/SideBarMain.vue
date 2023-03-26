<template>
    <div class="main-content">
        <div class="board-nav-item" @click="$emit('switchDynamicCmp','SideBarBoardDetails')">
            <i className="icon" v-html="getSvg('trello')"></i>
            <div class="title">
                <h5>About this board</h5>
                <p>Add a description to your board</p>
            </div>
        </div>

        <div class="board-nav-item" @click="$emit('switchDynamicCmp','ChangeBackground')">
            <div class="board-image" :style="board.style">
            </div>
            <h5>change background</h5>
        </div>

    </div>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getMerlloSvg(iconName)
        }
    },
    computed: {
        board() {
            return this.$store.getters.watchedBoard
        },
    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>