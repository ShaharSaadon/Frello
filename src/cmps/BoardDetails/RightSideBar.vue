<template>
    <aside class="right-side-bar" :class="counterClass">
        <div class="right-side-menu" :hidden="!isExpended">
            <div class="right-menu-header">
                <div class="menu-title">
                    <span>
                        <div v-if="type !== 'SideBarMain'" class="back" @click="$emit('switchDynamicCmp', 'SideBarMain')">
                            <i className="icon" v-html="getSvg('arrowLeft')"></i>

                        </div>
                    </span>
                    <h5 class="title">{{ info.title }}</h5>
                    <span @click="onCloseMenu" class="close-menu"></span>
                </div>
            </div>
            <component :is="type" @switchDynamicCmp="$emit('switchDynamicCmp', $event)"
                @onChangeBackground="$emit('onChangeBackground', $event)" class="main-content" />

        </div>
    </aside>
</template>

<script>
import SideBarMain from '../RightSideBar/SideBarMain.vue'
import SideBarBoardDetails from '../RightSideBar/SideBarBoardDetails.vue'
import ChangeBackground from '../RightSideBar/ChangeBackground.vue'
import SideBarActivities from '../RightSideBar/SideBarActivities.vue'
import { svgService } from '../../services/svg.service'
export default {
    name: 'RightSideBar',
    emits: ['switchDynamicCmp', 'onChangeBackground'],
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
        getSvg(iconName) {
            return svgService.getMerlloSvg(iconName)
        }


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