<template>
    <ul class="activities-list clean-list">
        <li v-for="activity in activities" :key="activity.id" :activity="activity" class="activity">
            <img :src="activity.byMember.imgUrl" class="member-profile">
            <div class="activity-description">
                <span>{{ activity.byMember.fullname }} </span>
                {{ activity.txt }}
                {{ getTime(activity.createdAt) }}
            </div>
        </li>
    </ul>
</template>

<script>
import { utilService } from '../../services/util.service'
export default {
    name: '',
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
