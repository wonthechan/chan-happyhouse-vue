<template>
  <div class="card">
    <div class="card-header">
      <div class="cui__utils__heading mb-0">
        <h4>서울 특별시 자치구 월별 아파트 평균 거래 금액 차트</h4>
      </div>
      <div class="text-muted">자치구별로 최근 1년 월별 아파트 평균 거래 금액 변동 추이를 확인할 수 있습니다.</div>
    </div>
    <div class="card-body">
      <div class="mb-1">
        <div class="text-muted" style="font-size: 11px; font-weight: bold;" align="right">국토교통부 실거래가 공개시스템 API 활용</div>
        <vue-chartist v-if="animationData.series.length > 0"
          class="chartist-animated height-300"
          type="Line"
          :data="animationData"
          :options="animatonOptions"
        />
        <div class="text-muted" style="font-size: 11px;" align="left">(만원/연월)</div>
      </div>
      <div>
        <div align="center">
          <a-select style="width: 120px" @change="handleChange()" placeholder="자치구 선택" v-model="selectedJachigu">
            <template v-for="(item, index) in guNames">
              <a-select-option :value="index" :key="'item_' + index">
                {{ item }}
              </a-select-option>
            </template>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueChartist from 'v-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import http from '@/util/http-common.js'

export default {
  name: 'monthlyAvgDealChart',
  components: {
    VueChartist,
  },
  data() {
    return {
      avgDealData: [],
      selectedJachigu: 0, // 초기 선택값 (강남구)
      animationData: {
        labels: ['`19.06', '`19.07', '`19.08', '`19.09', '`19.10', '`19.11', '`19.12', '`20.01', '`20.02', '`20.03', '`20.04', '`20.05'],
        series: [
          [179622, 182288, 183087, 186896, 187131, 183953, 171571, 154871, 161472, 194667, 181805],
        ],
      },
      animatonOptions: {
        axisX: {
          labelInterpolationFnc(value, index) {
            return index % 2 !== 0 ? !1 : value
          },
        },
        plugins: [ChartistTooltip({ anchorToPoint: false, appendToBody: true, seriesName: false })],
      },
      guNames: [
        '강남구', '강동구', '강북구', '강서구', '관악구',
        '광진구', '구로구', '금천구', '노원구', '도봉구',
        '동대문구', '동작구', '마포구', '서대문구', '서초구',
        '성동구', '성북구', '송파구', '양천구', '영등포구',
        '용산구', '은평구', '종로구', '중구', '중랑구',
      ],
    }
  },
  created() {
    // 월별 평균 거래 금액 데이터 가져오기 (DB)
    http.get('/houses/apart/montly/avg')
      .then(({ data }) => {
        data.map((item) => {
          this.avgDealData.push(item.avgDealPrice)
        })
        this.handleChange()
      })
  },
  methods: {
    handleChange() {
      console.log('handleChange() is called!')
      var temp = []
      this.animationData.series = []
      for (var i = 12 * this.selectedJachigu; i < 12 * this.selectedJachigu + 12; i++) {
        temp.push(this.avgDealData[i])
      }
      this.animationData.series.push(temp)
    },
  },
}
</script>
