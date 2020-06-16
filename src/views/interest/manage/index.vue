<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="관심 정보 관리"
          :breadcrumb="{ props: { routes } }"
          sub-title="관심 지역과 즐겨찾기한 매물을 관리할 수 있습니다."
        />
      </div>
      <div class="col-lg-9">
        <!-- 카드 들어갈 자리 (탭스위치 적용)-->
        <a-tabs default-active-key="1" @change="callback()" tab-position="right">
          <a-tab-pane key="1" tab="관심 지역">
            <!-- 관심 지역 관리 카드를 컴포넌트화 -->
            <interest-area-manage />
          </a-tab-pane>
          <a-tab-pane key="2" tab="관심 매물" force-render>
            <!-- 즐겨찾기 매물 관리 카드를 컴포넌트화 -->
            <interest-house-manage />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import InterestAreaManage from '../components/InterestAreaManage'
import InterestHouseManage from '../components/InterestHouseManage'

export default {
  name: 'interestManage',
  components: {
    InterestAreaManage, InterestHouseManage,
  },
  data() {
    return {
      routes: [
        {
          path: '',
          breadcrumbName: 'Home',
        },
        {
          path: '',
          breadcrumbName: '관심 지역',
        },
        {
          path: '',
          breadcrumbName: '관심 정보 관리',
        },
      ],
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    callback() {
      console.log('switched!')
    },
  },
}
</script>
