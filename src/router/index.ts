import Vue from 'vue'
import VueRouter from 'vue-router'
import vue from '../main';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import("../views/Index.vue"),
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import("../views/Home.vue")
    }, {
      path: '/audios',
      name: 'audios',
      component: () => import("../views/Audios.vue"),
      children: [
        {
          path: '/detail/:id',
          name: 'audios/detail',
          component: () => import("../views/audios/Detail.vue")
        }
      ]
    }, {
      path: '/group',
      name: 'group',
      component: () => import("../views/Group.vue")
    }, {
      path: '/fair',
      name: 'fair',
      component: () => import("../views/Fair.vue")
    }, {
      path: '/mine',
      name: 'mine',
      component: () => import("../views/Mine.vue")
    }]
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    component: () => import("../views/Cinemas.vue")
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  let isHome = false,
    searchWrapArr = ['home', 'audios', 'fail'],
    tabbarArr = ['home', 'audios', 'fair', 'group', 'mine'];
  if (searchWrapArr.includes((to.name as any))) {
    vue.$store.state.showSearchWrap = true
  } else {
    vue.$store.state.showSearchWrap = false
  }
  if (tabbarArr.includes((to.name as any))) {
    vue.$store.state.showTabbar = true
  } else {
    vue.$store.state.showTabbar = false
  }
  if (to.name == 'home') {
    isHome = true;
  }
  vue.$store.dispatch('setIsHome', isHome)
  next()
})

export default router
