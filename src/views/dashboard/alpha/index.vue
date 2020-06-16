<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <!-- 여기에 서울시 자치구 월별 아파트 거래 금액 연 추이 카드 -->
        <monthly-avg-deal-chart/>
      </div>
      <div class="col-lg-6">
      </div>
    </div>
  </div>
</template>

<script>
import MonthlyAvgDealChart from '@/components/custom/analytics/MonthlyAvgDealChart'
export default {
  components: {
    MonthlyAvgDealChart,
  },
}
</script>
