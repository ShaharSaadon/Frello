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
        <ul class="activities-list clean-list" >
            <li v-for="activity in board.activities" :key="activity.id" :activity="activity" class="activity"> 
                <img :src="activity.byMember.imgUrl" class="member-profile">
            <div class="activity-description">
          <span>{{ activity.byMember.fullname }} </span>  
            {{ activity.txt }} 
            {{ activity.task.title }}
            </div>
            </li>
        </ul>
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