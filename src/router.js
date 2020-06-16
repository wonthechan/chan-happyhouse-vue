import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '@/layouts/Auth'
import MainLayout from '@/layouts/Main'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: 'dashboard/alpha',
      component: MainLayout,
      meta: {
        authRequired: true,
        hidden: true,
      },
      children: [
        // Dashboards
        {
          path: '/dashboard/alpha',
          meta: {
            title: 'Dashboard Alpha',
          },
          component: () => import('./views/dashboard/alpha'),
        },
        {
          path: '/dashboard/beta',
          meta: {
            title: 'Dashboard Beta',
          },
          component: () => import('./views/dashboard/beta'),
        },
        {
          path: '/dashboard/crypto',
          meta: {
            title: 'Dashboard Crypto',
          },
          component: () => import('./views/dashboard/crypto'),
        },
        {
          path: '/dashboard/gamma',
          meta: {
            title: 'Dashboard Gamma',
          },
          component: () => import('./views/dashboard/gamma'),
        },
        // Ecommerce
        {
          path: '/ecommerce/dashboard',
          meta: {
            title: 'Ecommerce Dashboard',
          },
          component: () => import('./views/ecommerce/dashboard'),
        },
        {
          path: '/ecommerce/orders',
          meta: {
            title: 'Ecommerce Orders',
          },
          component: () => import('./views/ecommerce/orders'),
        },
        {
          path: '/ecommerce/product-catalog',
          meta: {
            title: 'Ecommerce Product Catalog',
          },
          component: () => import('./views/ecommerce/product-catalog'),
        },
        {
          path: '/ecommerce/product-details',
          meta: {
            title: 'Ecommerce Product Details',
          },
          component: () => import('./views/ecommerce/product-details'),
        },
        {
          path: '/ecommerce/cart',
          meta: {
            title: 'Ecommerce Cart',
          },
          component: () => import('./views/ecommerce/cart'),
        },
        // Widgets
        {
          path: '/widgets/general',
          meta: {
            title: 'Widgets / General',
          },
          component: () => import('./views/widgets/general'),
        },
        {
          path: '/widgets/lists',
          meta: {
            title: 'Widgets / Lists',
          },
          component: () => import('./views/widgets/lists'),
        },
        {
          path: '/widgets/tables',
          meta: {
            title: 'Widgets / Tables',
          },
          component: () => import('./views/widgets/tables'),
        },
        {
          path: '/widgets/charts',
          meta: {
            title: 'Widgets / Charts',
          },
          component: () => import('./views/widgets/charts'),
        },
        // Apps
        {
          path: '/apps/calendar',
          meta: {
            title: 'Apps / Calendar',
          },
          component: () => import('./views/apps/calendar'),
        },
        {
          path: '/apps/digitalocean-create',
          meta: {
            title: 'Apps / DigitalOcean Create',
          },
          component: () => import('./views/apps/digitalocean-create'),
        },
        {
          path: '/apps/digitalocean-droplets',
          meta: {
            title: 'Apps / DigitalOcean Droplets',
          },
          component: () => import('./views/apps/digitalocean-droplets'),
        },
        {
          path: '/apps/gallery',
          meta: {
            title: 'Apps / Gallery',
          },
          component: () => import('./views/apps/gallery'),
        },
        {
          path: '/apps/github-discuss',
          meta: {
            title: 'Apps / GitHub Discuss',
          },
          component: () => import('./views/apps/github-discuss'),
        },
        {
          path: '/apps/github-explore',
          meta: {
            title: 'Apps / GitHub Explore',
          },
          component: () => import('./views/auth/under-construction'),
        },
        {
          path: '/apps/google-analytics',
          meta: {
            title: 'Apps / Google Analytics',
          },
          component: () => import('./views/apps/google-analytics'),
        },
        {
          path: '/apps/helpdesk-dashboard',
          meta: {
            title: 'Apps / Helpdesk Dashboard',
          },
          component: () => import('./views/apps/helpdesk-dashboard'),
        },
        {
          path: '/apps/jira-agile-board',
          meta: {
            title: 'Apps / Jira Agile Board',
          },
          component: () => import('./views/apps/jira-agile-board'),
        },
        {
          path: '/apps/jira-dashboard',
          meta: {
            title: 'Apps / Jira Dashboard',
          },
          component: () => import('./views/apps/jira-dashboard'),
        },
        {
          path: '/apps/mail',
          meta: {
            title: 'Apps / Mail',
          },
          component: () => import('./views/apps/mail'),
        },
        {
          path: '/apps/messaging',
          meta: {
            title: 'Apps / Mesagging',
          },
          component: () => import('./views/apps/messaging'),
        },
        {
          path: '/apps/profile',
          meta: {
            title: 'Apps / Profile',
          },
          component: () => import('./views/apps/profile'),
        },
        {
          path: '/apps/todoist-list',
          meta: {
            title: 'Apps / Todoist List',
          },
          component: () => import('./views/apps/todoist-list'),
        },
        {
          path: '/apps/wordpress-add',
          meta: {
            title: 'Apps / Wordpress Add',
          },
          component: () => import('./views/apps/wordpress-add'),
        },
        {
          path: '/apps/wordpress-post',
          meta: {
            title: 'Apps / Wordpress Post',
          },
          component: () => import('./views/apps/wordpress-post'),
        },
        {
          path: '/apps/wordpress-posts',
          meta: {
            title: 'Apps / Wordpress Posts',
          },
          component: () => import('./views/apps/wordpress-posts'),
        },
        // Cards
        {
          path: '/cards/basic-cards',
          meta: {
            title: 'Cards / Basic',
          },
          component: () => import('./views/cards/basic-cards'),
        },
        {
          path: '/cards/tabbed-cards',
          meta: {
            title: 'Cards / Tabbed',
          },
          component: () => import('./views/cards/tabbed-cards'),
        },
        // UI Kits
        {
          path: '/ui-kits/bootstrap',
          meta: {
            title: 'UI Kit / Bootstrap',
          },
          component: () => import('./views/ui-kits/bootstrap'),
        },
        {
          path: '/ui-kits/antd',
          meta: {
            title: 'UI Kit / Ant Design',
          },
          component: () => import('./views/ui-kits/antd'),
        },
        // Tables
        {
          path: '/tables/bootstrap',
          meta: {
            title: 'Tables / Bootstrap',
          },
          component: () => import('./views/tables/bootstrap'),
        },
        {
          path: '/tables/antd',
          meta: {
            title: 'Tables / Ant Design',
          },
          component: () => import('./views/tables/antd'),
        },
        // Charts
        {
          path: '/charts/chartistjs',
          meta: {
            title: 'Charts / Chartist.js',
          },
          component: () => import('./views/charts/chartistjs'),
        },
        {
          path: '/charts/chartjs',
          meta: {
            title: 'Charts / Chart.js',
          },
          component: () => import('./views/charts/chartjs'),
        },
        {
          path: '/charts/c3',
          meta: {
            title: 'Charts / C3 Charts',
          },
          component: () => import('./views/charts/c3'),
        },
        // Icons
        {
          path: '/icons/feather-icons',
          meta: {
            title: 'Icons / Feather',
          },
          component: () => import('./views/icons/feather-icons'),
        },
        {
          path: '/icons/fontawesome',
          meta: {
            title: 'Icons / Fontawesome',
          },
          component: () => import('./views/icons/fontawesome'),
        },
        {
          path: '/icons/linearicons-free',
          meta: {
            title: 'Icons / Linearicons Free',
          },
          component: () => import('./views/icons/linearicons-free'),
        },
        {
          path: '/icons/icomoon-free',
          meta: {
            title: 'Icons / Icomoon Free',
          },
          component: () => import('./views/icons/icomoon-free'),
        },
        // Advanced
        {
          path: '/advanced/form-examples',
          meta: {
            title: 'Advanced / Form Examples',
          },
          component: () => import('./views/advanced/form-examples'),
        },
        {
          path: '/advanced/email-templates',
          meta: {
            title: 'Advanced / Email Templates',
          },
          component: () => import('./views/advanced/email-templates'),
        },
        {
          path: '/advanced/utilities',
          meta: {
            title: 'Advanced / Utilities',
          },
          component: () => import('./views/advanced/utilities'),
        },
        {
          path: '/advanced/grid',
          meta: {
            title: 'Advanced / Grid',
          },
          component: () => import('./views/advanced/grid'),
        },
        {
          path: '/advanced/typography',
          meta: {
            title: 'Advanced / Typography',
          },
          component: () => import('./views/advanced/typography'),
        },
        {
          path: '/advanced/pricing-tables',
          meta: {
            title: 'Advanced / Pricing Tables',
          },
          component: () => import('./views/advanced/pricing-tables'),
        },
        {
          path: '/advanced/invoice',
          meta: {
            title: 'Advanced / Invoice',
          },
          component: () => import('./views/advanced/invoice'),
        },
        {
          path: '/advanced/colors',
          meta: {
            title: 'Advanced / Colors',
          },
          component: () => import('./views/advanced/colors'),
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
        {
          path: '/interestarea/manage',
          meta: {
            title: '관심 지역 관리',
          },
          component: () => import('./views/interestarea/manage'),
        },
        {
          path: '/interestarea/stores',
          meta: {
            title: '주변 상권',
          },
          component: () => import('./views/interestarea/stores'),
        },
        {
          path: '/interestarea/etc',
          meta: {
            title: '주변 기타 정보',
          },
          component: () => import('./views/auth/under-construction'),
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
        {
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
            title: 'Sign In',
          },
          component: () => import('./views/auth/login'),
        },
        {
          path: '/auth/register',
          meta: {
            title: 'Sign Up',
          },
          component: () => import('./views/auth/register'),
        },
        {
          path: '/auth/forgot-password',
          meta: {
            title: 'Forgot Password',
          },
          component: () => import('./views/auth/forgot-password'),
        },
        {
          path: '/auth/lockscreen',
          meta: {
            title: 'Lockscreen',
          },
          component: () => import('./views/auth/lockscreen'),
        },
        {
          path: '/auth/under-construction',
          meta: {
            title: 'UnderConstruction',
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
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
