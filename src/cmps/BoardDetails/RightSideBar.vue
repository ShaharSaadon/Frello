<template>
    <aside class="right-side-bar" :class="counterClass">
        <div class="right-side-toggle">
            <div class="three-dot-btn" @click="isExpended = true" v-if="!isExpended"></div>
            <div class="right-side" :hidden="!isExpended">
                <h4>Menu</h4> <span @click="isExpended = false">X</span>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            isExpended: false
        }
    },
    methods: {

    },
    computed: {
        counterClass() {
            return {
                isExpended: this.isExpended,
            }
        }
    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>