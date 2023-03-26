<template>
    <aside class="right-side-bar" :class="counterClass">
        <div class="right-side-menu" :hidden="!isExpended">
            <div class="right-menu-header">
                <div class="menu-title">
                    <span></span>
                    <h5>Menu</h5>
                    <span @click="onCloseMenu" class="close-menu"></span>
                </div>
            </div>

            <div class="main-content">
                
                <i className="icon" v-html="getSvg('trello')"></i>
                <div class="board-nav-item">
                    <div class="div flex-column">
                        <h5>About this board</h5>
                        <p>Add a description to your board</p>
                    </div>
                </div>
                
                <div class="board-image" :style="board.style">
                </div>

                <div class="board-nav-item">
                    <h5>change background</h5>
                </div>

            </div>

        </div>
    </aside>
</template>

<script>
import { svgService } from '../../services/svg.service'
export default {
    name: 'RightSideBar',
    data() {
        return {
        }
    },
    methods: {
        onCloseMenu() {
            this.$store.commit('onToggleMenu')
        },
        getSvg(iconName) {
            return svgService.getMerlloSvg(iconName)
        }

    },
    computed: {
        counterClass() {
            return {
                isExpended: this.isExpended,
            }
        },
        isExpended() {
            return this.$store.getters.isRightSideBarOpen
        },
        
        board(){
            return this.$store.getters.watchedBoard
        }
    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>