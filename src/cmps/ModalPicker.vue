<template>
    <section class="modal-picker">
        <div class="header">
            <!-- <h2>{{ modal.title }}</h2> -->
            <component :is="type" :info="info" />
            

    </div>
    </section>
</template>

<script>
import LabelPicker from './ModalsPicker/LabelPicker.vue';
export default {
    props:{
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
        info(){
            switch (this.type) {
                case 'LabelPicker':
                    return{
                        label: "labels",
                    }
                    break;
            
                default:
                    break;
            }
        }
    },
    created() {

    },
    components: {
    LabelPicker,
    },
}
</script>

<style></style>