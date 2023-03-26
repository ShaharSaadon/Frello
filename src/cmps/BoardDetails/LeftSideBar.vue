<template>
    <aside class="left-side-bar" :class="counterClass" @click="isExpended = true" :style="{ backgroundColor: board.LeftSideBarBgc }">
        <div class="toggle-menu" :hidden="!isExpended">
            <div class="left-side-header flex">
                <div class="workspace-logo flex">
                    M
                </div>
                <h5>Merllo Workspace</h5>
                <img class="close-menu" src="https://a.trellocdn.com/prgb/assets/58243262833f693f6101.svg"
                    alt="Workspace navigation collapse icon" @click.stop="isExpended = false">
            </div>
            <h5 class="left-side-bar-title">Your boards</h5>
            <ul class="board-list-side-bar clean-list">
                <li v-for="board in boards" :key="board._id" :board="board">
                    <router-link :to="board._id" class="board-select">
                        <div class="board-title flex">
                        <div class="board-image" :style="board.style">
                        </div>
                        {{ board.title }}
                    </div>
                    <button class="star-icon" :class="{starred:board.isStarred}" @click="$emit('onToggleStarred',board)"> </button>
                </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import { svgService } from '../../services/svg.service'
export default {
    name: 'LeftSideBar',
    data() {
        return {
            isExpended: false
        }
    },
    methods: {
        toggleSideBar() {
            console.log('hola')
        },
        getSvg(iconName) {
            return svgService.getMerlloSvg(iconName)
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        board() {
            return this.$store.getters.watchedBoard
        },
        counterClass() {
            return {
                isExpended: this.isExpended,
            }
        }
    },
    created() {

    },
    components: {

    },
}
</script>

