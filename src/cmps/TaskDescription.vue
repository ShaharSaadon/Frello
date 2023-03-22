<template>
    <article class="task-description">

        <h1 class="title"><span class="icon"></span> Description</h1>
        <button class="btn-add-description" @click="openEdit" v-if="!isDescription && !isEdit">
            Add more detailed description...</button>

        <div v-else-if="isEdit" class="description-editor">
            <textarea @blur="saveDescription" ref="textarea" v-model="taskDescriptionEdit"
                placeholder="Add some description"></textarea>
            <div class="save-cancel flex">
                <button @click="saveDescription" class="btn-save">Save</button>
                <button class="btn-cancel">Cancel</button>
            </div>
        </div>
        
        <pre :style="preStyle" v-else @click="openEdit">{{ taskDescriptionEdit }}</pre>
    </article>
</template>

<script>

export default {
    name: 'TaskPreview',
    props: {
        taskDescription: {
            type: String,
            required: true,
            default: ''
        }
    },
    data() {
        return {
            taskDescriptionEdit: '',
            isEdit: false,

        }
    },
    methods: {
        openEdit() {
            this.isEdit = true
            setTimeout(() => this.$refs.textarea.focus(), 10)
        },
        saveDescription() {
            this.isEdit = false
            this.$emit('saveDescription', { description: this.taskDescriptionEdit })
        }
    },
    computed: {
        isDescription() {
            return this.taskDescriptionEdit
        },
        preStyle() {
            return {
                "font-family": 'Segoe UI',
                "font-size": '14px',
                'font-weight': '400',
            }
        }
    },
    created() {
        this.taskDescriptionEdit = this.taskDescription
    },
    components: {
    },
}
</script>