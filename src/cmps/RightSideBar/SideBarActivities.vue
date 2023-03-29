<template>
    <ul class="activities-list clean-list ">
        <li v-for="activity in activities" :key="activity.id" :activity="activity"  class="activity flex">
            <img :src="activity.byMember.imgUrl" class="member-profile">
            <div class="activity-description">
                <span class="by-member">{{ activity.byMember.fullname }} </span>
                <p class="activity-text"> {{ ' ' + activity.txt }} </p>
                <!-- <pre> {{ activity }} </pre> -->
                <span class="time-ago">{{ getTime(activity.createdAt) }} </span>
            </div>
        </li>
        <button v-if="maximum&activities.length===15" class="btn-show-more" @click="$emit('switchDynamicCmp', 'SideBarActivities')"> View all activity...</button>
    </ul>
</template>

<script>
import { utilService } from '../../services/util.service'
export default {
    name: 'SideBarActivities',
    emits: ['switchDynamicCmp'],
    props:{
        maximum: {
            type: Boolean,
            required: false,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        getTime(timeStamp) {
            return utilService.daysAgo(timeStamp)
        }
    },
    computed: {
        board() {
            return this.$store.getters.watchedBoard
        },
        activities() {
            if (this.maximum) return this.board.activities.slice(0,15)
            return this.board.activities
        },
    
    },
    created() {

    },
    components: {

    },
}
</script>
