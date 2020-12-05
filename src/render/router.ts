import { createRouter, createWebHistory } from 'vue-router'
import Index from './views/Index.vue'
import Create from './views/Create.vue'
import About from './views/About.vue'

const router:any = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
        path: '/',
        name: 'index',
        component: Index as any,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/create',
        name: 'create',
        component: Create as any,
        meta: {
            title: '创建'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About as any,
        meta: {
            title: '关于'
        }
    }
  ]
})

export default router
