<template>
    <header class="home-page-header ">
        <div class="left-nav flex">
            <div class="logo">Trello</div>
            <nav class="clean-list flex">
                <a class="nav-link flex">Features <i className="icon" v-html="getSvg('arrowDown')"></i></a>
                <a class="nav-link">Solutions <i className="icon" v-html="getSvg('arrowDown')"></i></a>
                <a class="nav-link">Plans <i className="icon" v-html="getSvg('arrowDown')"></i></a>
                <a class="nav-link">Pricing <i className="icon" v-html="getSvg('arrowDown')"></i></a>
                <a class="nav-link">Resources <i className="icon" v-html="getSvg('arrowDown')"></i></a>
            </nav>
        </div>
        <div class="right-nav flex clean-list">
            <li class="nav-link">Login</li>
            <li class="nav-link-signup nav-link"><RouterLink to="/board">Get Trello for free</RouterLink></li>
            

        </div>
    </header>

    <main class="home-page-main-container">
        <div class="left-box">
            <h1>Trello brings all your tasks, teammates, and tools together</h1>
            <p>Keep everything in the same place-even if your team isn’t.</p>
            <form @submit.prevent="sendMsg" class="signup-form">
                <input type="text" placeholder="Email" class="email-signup">
                <button>Sign up - it's free!</button> 
            </form>

            <p>Watch video <i className="icon" v-html="getSvg('playVideo')"></i></p>
        </div>
        <div class="right-box">
            <img src="../assets/imgs/TrelloUICollage_4x.webp">
        </div>
    </main>
</template>

<script>
import { svgService } from "../services/svg.service.js"
export default {

    name: '',
    data() {
        return {

        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getTrelloSvg(iconName)
        }

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