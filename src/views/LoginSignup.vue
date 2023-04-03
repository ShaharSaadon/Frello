<template>
  <div class="login-signup">
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>

    <div v-else>
      <div class="logo"></div>
      <h2>Log in to continue</h2>
      <form @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.username" placeholder="Username" />
        <input type="password" v-model="loginCred.password" placeholder="Password" />
        <button>Continue</button>
      </form>
      <h2>Signup</h2>
      <form @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <input type="password" v-model="signupCred.password" placeholder="Password" />
        <!-- <ImgUploader @uploaded="onUploaded" /> -->
        <button @click.prevent="$refs.uploadFile.click()" class="btn-profile-picker">Upload an image</button>
        <button>Signup</button>
      </form>
      <input
        hidden
        @change="handleFile"
        ref="uploadFile"
        accept="image/*"
        type="file"
      />
    </div>
    <!-- <hr />
    <details>
      <summary>Admin Section</summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details> -->
  </div>
</template>

<script>
// import ImgUploader from '../cmps/ImgUploader.vue'
import { uploadService } from '../services/upload.service'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username || !this.loginCred.password) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
        this.$router.push('/board')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/board')
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
    async handleFile() {
      const { url } = await uploadService.handleFile(this.$refs.uploadFile.files[0])
      this.signupCred.imgUrl = url
    },
  },
  components: {
    // ImgUploader,
  },
}
</script>
