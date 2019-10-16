import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/components/Login'], resolve)
const City = resolve => require(['@/components/City'], resolve)
const Detail = resolve => require(['@/components/Detail'], resolve)
const MissionIntro = resolve => require(['@/components/MissionIntro'], resolve)
const Question = resolve => require(['@/components/Question'], resolve)
const Defeat = resolve => require(['@/components/Defeat'], resolve)
const Register = resolve => require(['@/components/Register'], resolve)
const History = resolve => require(['@/components/History'], resolve)
const Setting = resolve => require(['@/components/Setting'], resolve)
const Resume = resolve => require(['@/components/Resume'], resolve)

const Main = resolve => require(['@/components/main/Index'], resolve)
const Home = resolve => require(['@/components/main/Home'], resolve)
const Job = resolve => require(['@/components/main/Job'], resolve)
const Mission = resolve => require(['@/components/main/Mission'], resolve)
const Personal = resolve => require(['@/components/main/Personal'], resolve)

import store from '@/vuex/store'
import {SET_ROUTE_TRANSITION_NAME,ADD_ROUTE_CHAIN,POP_ROUTE_CHAIN} from '@/vuex/mutations_types'

Vue.use(Router)

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/main',
      component: Main,
      children:[
        {
          path: '',
          redirect:'home'
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'job',
          name: 'Job',
          component: Job,
        },
        {
          path: 'mission',
          name: 'Mission',
          component: Mission,
        },
        {
          path: 'personal',
          name: 'Personal',
          component: Personal,
        }
      ]
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/mission-intro',
      name: 'MissionIntro',
      component: MissionIntro
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/defeat',
      name: 'Defeat',
      component: Defeat
    },
    {path:'/',redirect:'/login'}
  ]
const router = new Router({
  routes,
  // mode:'history',
  scrollBehavior:()=>({y:0})
});
router.beforeEach((to, from, next) => {
  let routeLength = store.state.transition.routeChain.length;
  if (routeLength === 0) {
    store.commit(SET_ROUTE_TRANSITION_NAME, 'fade');
    if (to.path === from.path && to.path === '/') {
      //当直接打开根路由的时候
      store.commit(ADD_ROUTE_CHAIN, to);
    } else {
      //直接打开非根路由的时候其实生成了两个路径，from就是根路由
      store.commit(ADD_ROUTE_CHAIN, from);
      store.commit(ADD_ROUTE_CHAIN, to);
    }
  } else if (routeLength === 1) {
    store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-left');
    store.commit(ADD_ROUTE_CHAIN, to);
  } else {
    let lastBeforeRoute = store.state.transition.routeChain[routeLength-2];
    if (lastBeforeRoute.path === to.path) {
      store.commit(POP_ROUTE_CHAIN);
      store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-right');
    } else {
      store.commit(ADD_ROUTE_CHAIN, to);
      store.commit(SET_ROUTE_TRANSITION_NAME, 'slide-left');
    }
  }
  next();
})

export default router
