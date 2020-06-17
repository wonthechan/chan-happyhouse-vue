<template>
  <div>
    <div class="row">
      <a-tabs default-active-key="1" tab-position="top">
        <a-tab-pane key="1" tab="검색">
          <house-search />
        </a-tab-pane>
        <a-tab-pane key="2" tab="차트" force-render>
          <div class="row">
            <div class="col-lg-6">
              <!-- 여기에 서울시 자치구 월별 아파트 거래 금액 연 추이 카드 -->
              <monthly-avg-deal-chart initSelected="0"/>
            </div>
            <div class="col-lg-6">
              <monthly-avg-deal-chart initSelected="1"/>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>

    </div>
  </div>
</template>

<script>
import MonthlyAvgDealChart from '@/components/custom/analytics/MonthlyAvgDealChart'
import HouseSearch from '@/views/houses/search'
export default {
  components: {
    MonthlyAvgDealChart,
    HouseSearch,
  },
}
</script>
