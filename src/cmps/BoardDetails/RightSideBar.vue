<template>
    <aside class="right-side-bar" :class="counterClass">
        <div class="right-side-menu" :hidden="!isExpended">
            <div class="right-menu-header">
                <div class="menu-title">
                    <span>
                        <div v-if="type!=='SideBarMain'" class="back" @click="$emit('switchDynamicCmp', 'SideBarMain')">
                            <p>Back</p>
                        </div>
                    </span>
                    <h5>{{ info.title }}</h5>
                    <span @click="onCloseMenu" class="close-menu"></span>
                </div>
            </div>
            <component :is="type"
            @switchDynamicCmp="$emit('switchDynamicCmp',$event)"
            @onChangeBackground="$emit('onChangeBackground',$event)" />

        </div>
    </aside>
</template>

<script>
import SideBarMain from '../RightSideBar/SideBarMain.vue'
import SideBarBoardDetails from '../RightSideBar/SideBarBoardDetails.vue'
import ChangeBackground from '../RightSideBar/ChangeBackground.vue'
import SideBarActivities from '../RightSideBar/SideBarActivities.vue'
export default {
    name: 'RightSideBar',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    methods: {
        onCloseMenu() {
            this.$store.commit('onToggleMenu')
        },


    },
    computed: {
        info() {
            switch (this.type) {
                case 'SideBarMain':
                    return {
                        title: 'Menu',
                    }
                case 'SideBarBoardDetails':
                    return {
                        title: 'About this board',
                    }
                case 'ChangeBackground':
                    return {
                        title: 'Change Background',
                    }
                case 'SideBarActivities':
                    return {
                        title: 'Activity',
                    }
                }
        },
        counterClass() {
            return {
                isExpended: this.isExpended,
            }
        },
        isExpended() {
            return this.$store.getters.isRightSideBarOpen
        },

        board() {
            return this.$store.getters.watchedBoard
        },
    },
    created() {

    },
    components: {
        SideBarMain,
        SideBarBoardDetails,
        ChangeBackground,
        SideBarActivities,        
    },
}
</script>

<style></style>