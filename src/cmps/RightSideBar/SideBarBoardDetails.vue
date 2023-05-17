<template>
    <h4>Board admins</h4>
    <BoardMembers />
    <button @click="toggleMic">Record</button>
    <div class="transcript">
        <p v-if="text"> {{ text }} </p>
    </div>
    <h4>Description</h4>
</template>

<script>
import BoardMembers from '../BoardDetails/BoardMembers.vue';
import { ref } from 'vue'
export default {
    name: 'SideBarBoardDetails',
    data() {
        return {
            sr: null,
            isRecording: false,
            text: null,
            blue: {
                bgc: '#07479E',
                bgImg: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
                LeftSideBarBgc: 'hsla(215,90%,37.7%,0.9)',
            },
            red: {
                bgc: '#872013',
                bgImg: 'url(https://a.trellocdn.com/prgb/assets/aec98becb6d15a5fc95e.svg)',
                LeftSideBarBgc: 'hsla(7,75.7%,35.1%,0.9)',
            }
        }
    },

created() {


    const Recognition = window.speechRecognition || window.webkitSpeechRecognition
    this.sr = new Recognition()
    this.sr.continuous = true
    this.sr.interimResults = true
    this.sr.onstart = () => {
        this.isRecording = true
    }
    this.sr.onend = () => {
        this.isRecording = true
    }
    this.sr.onresult = (evt) => {

        const text = Array.from(evt.results).map(result => result[0]).map(result => result.transcript).join('')
        console.log('text:', text)
        this.text = text
        this.checkForCommand()
    }


},

methods: {
    toggleMic() {
        if (this.isRecording) {
            this.sr.stop()
        } else {
            this.sr.start()
        }
    },
    checkForCommand() {
        if (this.text.includes('להחליף')) {
            this.$emit('onChangeBackground', this.red)
        }
        if (this.text.includes('תחליף')) {
            this.$emit('onChangeBackground', this.red)
        }
        if (this.text.includes('רקע')) {
            this.$emit('onChangeBackground', this.red)
        }
        if (this.text.includes('רכב')) {
            this.$emit('onChangeBackground', this.red)
        }

    }
},
computed: {
    board() {
        return this.$store.getters.watchedBoard
    },
},
components: {
    BoardMembers
},
}
</script>

<style></style>