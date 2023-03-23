<template>
<div class="label-picker">
    <h1>{{ info.label }}</h1>
    <hr>
    <input type="text" placeholder="Search Labels...">
    <h3>Labels</h3>
    
    <button> Create a new label</button>
</div>

</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            required: true,
        }
    },
    name: '',
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>