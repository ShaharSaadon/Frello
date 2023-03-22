<template>
    <article class="task-description">
        <h1>task-description</h1>
        <button @click="openDescription" v-if="!isDescription && !isTextareaOpen">Add more detailed description...</button>
        <textarea @keydown.enter.prevent="enter" @blur="isTextareaOpen = false" ref="textarea"
            v-model="taskDescriptionEdit"></textarea>


    </article>
</template>

<script>

export default {
    name: 'TaskPreview',
    props: {
        taskDescription: {
            type: String,
            required: true,
            default: 'lalala'
        }
    },
    data() {
        return {
            taskDescriptionEdit: '',
            isTextareaOpen: true
        }
    },
    methods: {
        openDescription() {
            this.isTextareaOpen = true
            this.$refs.textarea.focus()
            console.log("this.textareaOpen: ", this.isTextareaOpen);
        },
        enter(ev) {
            ev.preventDefault();
            ev.target.blur();
        },
    },
    computed: {
        isDescription() {
            return this.taskDescriptionEdit
        }
    },
    created() {
        this.taskDescriptionEdit = this.taskDescription
    },
    components: {
    },
}
</script>