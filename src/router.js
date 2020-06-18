import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '@/layouts/Auth'
import MainLayout from '@/layouts/Main'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  // mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: 'main',
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        // 메인
        {
          path: '/main',
          meta: {
            title: '메인',
          },
          component: () => import('./views/main/'),
        },
        // 아파트
        {
          path: '/houses/search',
          meta: {
            title: '아파트 검색',
          },
          component: () => import('./views/houses/search'),
        },
        {
          path: '/houses/interest',
          meta: {
            title: '아파트 즐겨찾기',
          },
          component: () => import('./views/houses/interestHouse'),
        },
        // 분양 정보
        {
          path: '/bunyang',
          meta: {
            title: '분양 정보',
          },
          component: () => import('./views/bunyang'),
        },
        // 관심 지역
        { // (통합)
          path: '/interest/manage',
          meta: {
            title: '관심 정보 관리',
          },
          component: () => import('./views/interest/manage'),
        },
        {
          path: '/interest/stores',
          meta: {
            title: '주변 상권',
          },
          component: () => import('./views/interest/stores'),
        },
        // 고객 지원
        {
          path: '/help/notices',
          meta: {
            title: '공지사항',
          },
          component: () => import('./views/help/notices'),
          children: [
            {
              path: '/help/notices/list',
              meta: {
                title: '공지사항 목록',
              },
              component: () => import('./views/help/notices/list'),
            },
            {
              path: '/help/notices/register',
              meta: {
                title: '공지사항 등록',
              },
              component: () => import('./views/help/notices/register'),
            },
            {
              path: '/help/notices/update/:id',
              meta: {
                title: '공지사항 수정',
              },
              component: () => import('./views/help/notices/update'),
            },
            {
              path: '/help/notices/detail/:id',
              meta: {
                title: '공지사항 상세',
              },
              component: () => import('./views/help/notices/detail'),
            },
          ],
        },
        { // QnA
          path: '/help/qnas',
          meta: {
            title: 'QnA 게시판',
          },
          component: () => import('./views/help/qnas'),
          children: [
            {
              path: '/help/qnas/list',
              meta: {
                title: 'QnA 목록',
              },
              component: () => import('./views/help/qnas/list'),
            },
            {
              path: '/help/qnas/register',
              meta: {
                title: 'QnA 등록',
              },
              component: () => import('./views/help/qnas/register'),
            },
            {
              path: '/help/qnas/update/:id',
              meta: {
                title: 'QnA 수정',
              },
              component: () => import('./views/help/qnas/update'),
            },
            {
              path: '/help/qnas/detail/:id',
              meta: {
                title: 'QnA 상세',
              },
              component: () => import('./views/help/qnas/detail'),
            },
          ],
        },
      ],
    },

    // System Pages
    {
      path: '/auth',
      component: AuthLayout,
      redirect: 'auth/login',
      children: [
        {
          path: '/auth/404',
          meta: {
            title: 'Error 404',
          },
          component: () => import('./views/auth/404'),
        },
        {
          path: '/auth/500',
          meta: {
            title: 'Error 500',
          },
          component: () => import('./views/auth/500'),
        },
        {
          path: '/auth/login',
          meta: {
            title: '로그인',
          },
          component: () => import('./views/auth/login'),
        },
        {
          path: '/auth/register',
          meta: {
            title: '회원 가입',
          },
          component: () => import('./views/auth/register'),
        },
        {
          path: '/auth/forgot-password',
          meta: {
            title: '비밀번호 찾기',
          },
          component: () => import('./views/auth/forgot-password'),
        },
        {
          path: '/auth/under-construction',
          meta: {
            title: '제작중인 페이지',
          },
          component: () => import('./views/auth/under-construction'),
        },
      ],
    },

    // Redirect to 404
    {
      path: '*', redirect: 'auth/404', hidden: true,
    },
  ],
})

// 모든 라우터이동에 대해 권한이 필요한 페이지에 접근하는 경우 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
router.beforeEach((to, from, next) => {
  console.log(from)
  console.log(to)
  if (to.matched.some(record => record.meta.authRequired)) {
    console.log(store.state.user.authorized)
    if (!store.state.user.authorized) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
