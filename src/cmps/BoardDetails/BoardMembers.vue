<template>
    <div class="board-members">
        <div class="member-profile-box flex align-center" v-for="(member,idx) in members" :key="member._id">
            <img :src="member.imgUrl" class="member-profile" :style="{'z-index':members.length-idx}"/>
            <img src="../assets/imgs/memberProfile.png" class="arrow">
        </div>
    </div>
</template>
  
<script>
import { svgService } from '../../services/svg.service'
export default {
    name: 'BoardMembers',
    data() {
        return {

        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getTrelloSvg(iconName)
        }
    },
    computed: {
        members() {
            return this.$store.getters.watchedBoard.members
        },
    },
    created() {

    },
    components: {

    },
}
</script>
  