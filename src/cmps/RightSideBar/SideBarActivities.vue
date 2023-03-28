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
    </ul>
</template>

<script>
import { utilService } from '../../services/util.service'
export default {
    name: 'SideBarActivities',
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
            return this.$store.getters.watchedBoard.activities
        },
    
    },
    created() {

    },
    components: {

    },
}
</script>
