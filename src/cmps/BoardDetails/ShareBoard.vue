<template>
  <section class="share-board">
    <section class="share-board-modal">
      <header class="header-share">
        <h2>Share board</h2>
        <RouterLink :to="'/board/' + boardId">
          <button @click="closeModal" class="btn-exit"></button>
        </RouterLink>
      </header>
      <form class="form-share flex">
        <input class="input-share" type="text" />
        <button @click.prevent class="btn-share">Share</button>
      </form>
      <div class="board-members">
        <div v-for="member in boardMembers" class="board-member">
          <img :src="member.imgUrl" class="profile-img" />
          <p class="fullname">{{member.fullname}}</p>
          <p class="username">{{member.username}}</p>
          <button class="btn-member">Admin</button>

          <!-- <pre>{{ member }}</pre> -->
          
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  computed: {
    boardMembers() {
      return this.$store.getters.boardMembers
    },
    boardId() {
      return this.$route.params.id
    },
  },
}
</script>
