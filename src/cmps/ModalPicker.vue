<template>
    <section class="modal-picker">
            <component :is="type" :info="info" />
    </section>
</template>

<script>
import LabelPicker from './ModalsPicker/LabelPicker.vue';
import MemberPicker from './ModalsPicker/MemberPicker.vue';
export default {
    props: {
        type: {
            type: String,
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
        info() {
            switch (this.type) {
                case 'LabelPicker':
                    return {
                        label: "labels",
                    }
                    break;
                case 'MemberPicker':
                    return {
                        members: this.board.members,
                        title: "Members"
                    }
                    break;

                default:
                    break;
            }
        },
        board() {
            return this.$store.getters.watchedBoard;
        },
    },
    created() {

    },
    components: {
        LabelPicker,
        MemberPicker,
    },
}
</script>

<style></style>