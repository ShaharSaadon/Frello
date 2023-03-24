<template>
  <div class="member-picker">
    <p class="picker-title">{{ info.title }}</p>
    <hr />
    <input type="text" placeholder="Search Labels..." class="search-members" />
    <p>Board members</p>
    <ul class="clean-list members flex column">
      <li
        v-for="member in info.members"
        :key="member._id"
        :member="member"
        class="member-select flex"
        @click="$emit('updateEntityVal', { key: 'members', val: member._id })"
      >
        <img :src="member.imgUrl" class="member-profile" />
        <p>{{ member.fullname }}({{ member.username }})</p>
      </li>
    </ul>

    <button>Create a new label</button>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  name: '',
  data() {
    return {}
  },
  methods: {
    addMember(member) {
      this.$emit('addMember', member)
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>
