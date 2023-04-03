<template>
    <h4>Board admins</h4>
    <BoardMembers />
    <button @click="generateCompletion">Generate Completion</button>

    <h4>Description</h4>
</template>

<script>
import BoardMembers from '../BoardDetails/BoardMembers.vue';
import { OpenAIApi } from 'openai';
import axios from 'axios';

export default {
    name: 'SideBarBoardDetails',
    data() {
        return {
        }
    },
    methods: {
        async generateCompletion() {
            const response = await this.openai.createCompletion({
                model: 'text-davinci-002',
                prompt: 'Hello world',
                max_tokens: 50,
                n: 1,
                stop: ['\n'],
                temperature: 0.5,
            });
            console.log(response.data.choices[0].text);
        }
    },
    computed: {
        board() {
            return this.$store.getters.watchedBoard
        },
    },
    created() {
        const openaiAxios = axios.create({
            baseURL: 'https://api.openai.com/v1/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ssk-V4USteB9w1PlsH7pGnzjT3BlbkFJoNjoybdmty8VygBuS4XW`,
            },
        });
        this.openai = new OpenAIApi(openaiAxios);
        this.generateCompletion()
    },
    components: {
        BoardMembers
    },
}
</script>

<style></style>