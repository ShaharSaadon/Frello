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
import {ref} from 'vue'
export default {
    name: 'SideBarBoardDetails',
    data() {
        return {
            sr: null,
            isRecording: false,
            text: null,
        }

    },
created() {


    const Recognition = window.speechRecognition || window.webkitSpeechRecognition  
    this.sr = new Recognition () 

    this.sr.continuous = true
    this.sr.interimResults = true
    
    this.sr.onstart = () =>{
    console.log('SR started')
    this.isRecording=true
    }

    this.sr.onend = () =>{
        console.log('SR stopped')
        this.isRecording=true
    }

    this.sr.onresult = (evt) =>{

        const text = Array.from(evt.results).map(result => result[0]).map(result =>result.transcript).join('')
        console.log('text:', text)
        this.text=text
       }

},

methods: {
    toggleMic(){
        console.log('this.isRecording:', this.isRecording)
        if(this.isRecording){
            this.sr.stop()
        } else {
            this.sr.start()
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