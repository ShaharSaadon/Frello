import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import BoardIndex from './views/BoardIndex.vue'
import BoardDetails from './views/BoardDetails.vue'
import TaskDetails from './views/TaskDetails.vue'
import ShareBoard from './cmps/BoardDetails/ShareBoard.vue'
import HomePage from './views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/board',
    name: 'BoardIndex',
    component: BoardIndex
  },
  {
    path: '/board/:id',
    name: 'BoardDetails',
    component: BoardDetails,
    children: [
      {
        path: 'share',
        name: 'ShareBoard',
        component: ShareBoard
      },
      {
        path: ':groupId/:taskId',
        name: 'TaskDetails',
        component: TaskDetails
      },
    
    ]
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: ReviewIndex
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

