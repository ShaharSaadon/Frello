<template>
<pre> {{ board}}</pre>
</template>

<script>
export default {
name: 'SideBarBoardDetails',
data() {
return {

}
},
methods: {

},
computed: {
    board() {
            return this.$store.getters.watchedBoard
        },
},
created() {

},
components: {

},
}
</script>

<style>

</style>