import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Login from './components/Login.vue'
import Room from './components/Room';


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/room',
        name: 'room',
        component: Room
      }
    ]
  })

//   router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (store.getters.isLoggedIn) {
//         next()
//         return
//       }
//       next('/login') 
//     } else {
//       next() 
//     }
//   })  
  
  router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.token;
    console.log(loggedIn)

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
  })

export default router