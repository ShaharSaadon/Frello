<template>
    <div class="main-content">
        <div class="board-nav-item abot" @click="$emit('switchDynamicCmp', 'SideBarBoardDetails')">
            <i className="icon" v-html="getSvg('trello')"></i>
            <div class="title">
                <h5>About this board</h5>
                <p>Add a description to your board</p>
            </div>
        </div>

        <div class="board-nav-item" @click="$emit('switchDynamicCmp', 'ChangeBackground')">
            <div class="board-image" :style="board.style">
            </div>
            <h5>change background</h5>
        </div>
   </div>

    <div class="activities main-content">
        <div class="board-nav-item" @click="$emit('switchDynamicCmp', 'SideBarActivities')">
            <span class="activity-icon"></span>
            <h5>Activity</h5>
        </div>
        <SideBarActivities/>
            
    </div>
</template>

<script>
import { svgService } from '../../services/svg.service'
import {utilService} from '../../services/util.service'
import SideBarActivities from './SideBarActivities.vue'
export default {
    name: 'SideBarMain',
    data() {
        return {

        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getMerlloSvg(iconName)
        },
        getTime(timeStamp){
            return utilService.daysAgo(timeStamp)
        }
    
    },
    computed: {
        board() {
            return this.$store.getters.watchedBoard
        },
        activities() {
            return this.$store.getters.watchedBoard.activities
        },
    },
    created() {

    },
    components: {
        SideBarActivities
    },
}
</script>

<style></style>