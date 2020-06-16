<template>
  <div>
    <div class="card">
      <div class="card-body">

        <div class="d-flex flex-wrap mb-3">
          <div class="mr-5 flex-grow-1">
            <h4>분양일정 달력</h4>
          </div>
          <div class="flex-grow-1">
            <div class="text-uppercase text-dark font-weight-bold mb-3">분양상태</div>
            <div class="d-flex flex-wrap">
              <div :class="$style.event">
                <div class="kit__utils__donut kit__utils__donut--danger" />오픈
              </div>
              <div :class="$style.event">
                <div class="kit__utils__donut kit__utils__donut--primary" />공고
              </div>
              <div :class="$style.event">
                <div class="kit__utils__donut kit__utils__donut--orange" />접수
              </div>
              <div :class="$style.event">
                <div class="kit__utils__donut kit__utils__donut--success" />발표
              </div>
               <div :class="$style.event">
                <div class="kit__utils__donut kit__utils__donut--info" />계약
              </div>
            </div>
          </div>
        </div>
        <a-calendar>
          <!-- value는 day이고, 해당 일의 listData가 존재하면 listData의 아이템들을 받아 type과 content를 달력에 표시한다 -->
          <ul class="events" slot="dateCellRender" slot-scope="value">
            <li v-for="item in getListData(value)" :key="item.bid">
             <!--<a-badge :status="item.bstate" :text="item.bname" />-->
             <div :class="$style.event" style="font-size:11px;">
                <div :class="item.bstate" />{{item.bname}}
              </div>
            </li>
          </ul>
          <template slot="monthCellRender" slot-scope="value">
            <li v-for="item in getMonthData(value)" :key="item.bid">
             <div :class="$style.event" style="font-size:11px;">
                <div :class="item.bstate" />{{item.bname}}
              </div>
            </li>
          </template>
        </a-calendar>

        <!-- 여기서부터는 최신 분양정보 5개 carousel 그려줌 -->

      <!-- 여기서부터는 분양 정보 전체 리스트 그려줌 !-->
            <table class="table table-hover" style="margin-top:70px;">
                <thead>
                  <tr class='table-primary' style="height:70px;">
                    <th></th><th>분양 단계</th><th></th><th></th><th>건물 유형</th><th></th><th></th><th>날짜</th><th></th><th></th><th>분양 지역</th><th></th><th>건물명</th><th></th>
                  </tr>
                </thead>
                <tbody id="areaTbody">
                  <tr vertical-align:middle style="cursor:pointer; height:70px;" v-for="(item, index) in pageBunyang" :key="'item_' + index" @click="searchBunyang(item.bname)">
                    <td></td>
                    <td>{{item.bstate}}</td>
                    <td></td><td></td
                    ><td>{{ item.btype }}</td>
                    <td></td><td></td>
                    <td >{{ item.bdate }}</td>
                    <td></td><td></td>
                    <td >{{item.blocation}}</td>
                    <td></td>
                    <td>{{item.bname}}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <br /><br />
              <!-- paging -->
              <div id="paginationWrapper" style="margin-bottom=100px;">
                <ul class="pagination pagination justify-content-center">
                  <!-- prev가 true인 경우 -->
                  <li class="ant-pagination-prev" v-if="prev">
                    <a class="ant-pagination-item-link" @click.prevent="movePage(startPageIndex - 1)" aria-label="Previous">
                      <a-icon type="left"/>
                    </a>
                  </li>
                  <li v-for="index in range(startPageIndex, endPageIndex)" :key="'item_' + index" :class="{'ant-pagination-item': true, '`ant-pagination-item-${index}`': true, 'ant-pagination-item-active': (index === CURRENT_PAGE_INDEX)}">
                    <a @click.prevent="movePage(index)" >{{ index }}</a>
                  </li>
                  <!-- next가 true인 경우 -->
                  <li class="ant-pagination-next" v-if="next">
                    <a class="ant-pagination-item-link" @click.prevent="movePage(endPageIndex + 1)" aria-label="Next">
                      <a-icon type="right"/>
                    </a>
                  </li>
                </ul>
              </div>

          <!-- 전체 분양정보 리스트 끝 -->

      </div>
    </div>
  </div>
</template>
<script>
// yarn add moment
// import moment from 'moment'
import http from '@/util/http-common.js'
export default {
  data() {
    return {
      allBunyang: [], // 전체 분양정보
      pageBunyang: [], // 페이지별 분양정보
      recentlyBunyang: [],
      LIST_ROW_COUNT: 10,
      OFFSET: 0,
      PAGE_LINK_COUNT: 10, // pagination link 갯수
      TOTAL_LIST_ITEM_COUNT: 0,
      CURRENT_PAGE_INDEX: 1,
      next: false,
      pageCount: 0,
      startPageIndex: 0,
      endPageIndex: 0,
      prev: false,
    }
  },
  created() {
    this.getBunyangList()
    this.getBunyang()
    this.getRecentlyBunyang()
  },
  methods: {
    getListData(value) {
      const year = value.year()
      let month = value.month() + 1
      let day = value.date()
      if (month < 10) { month = '0' + month }
      if (day < 10) { day = '0' + day }
      const ndate = year + '-' + month + '-' + day

      const by = []
      const mb = this.allBunyang
      for (var i = 0; i < mb.length; i++) {
        if (mb[i].bdate === ndate) { by.push(mb[i]) }
      }
      return by
    },
    getMonthData(value) {
      const year = value.year()
      let month = value.month() + 1
      if (month < 10) { month = '0' + month }
      const ndate = year + '-' + month

      const by = []
      const mb = this.allBunyang
      for (var i = 0; i < mb.length; i++) {
        if (mb[i].bdate.substring(0, 7) === ndate) { by.push(mb[i]) }
      }
      return by
    },
    getBunyang() {
      http.get('/bunyang/all')
        .then(({ data }) => {
          this.allBunyang = data
        })
    },
    getRecentlyBunyang() {
      http.get('/bunyang/recently')
        .then(({ data }) => {
          this.recentlyBunyang = data
        })
    },
    // 아래부터는 전체 분양 데이터 리스트 만들기 위한 함수들
    // 전체 분양 데이터 LIST_ROW_COUNT개수만큼 받아오기
    getBunyangList() {
      http.get(`/bunyang/all/${this.OFFSET}/${this.LIST_ROW_COUNT}`)
        .then(({ data }) => {
          this.pageBunyang = data
          this.getTotalBunyangCount()
        })
    },
    // 전체 분양 데이터 개수 가져오기
    getTotalBunyangCount() {
      http.get('/bunyang/count')
        .then(({ data }) => {
          this.TOTAL_LIST_ITEM_COUNT = data
          this.addPagination()
        })
    },
    // 페이징
    addPagination() {
      this.pageCount = Math.ceil(this.TOTAL_LIST_ITEM_COUNT / this.LIST_ROW_COUNT)
      // set startPageIndex
      this.startPageIndex = 0
      if ((this.CURRENT_PAGE_INDEX % this.PAGE_LINK_COUNT) === 0) { // 10, 20...맨마지막
        this.startPageIndex = ((this.CURRENT_PAGE_INDEX / this.PAGE_LINK_COUNT) - 1) * this.PAGE_LINK_COUNT + 1
      } else {
        this.startPageIndex = Math.floor(this.CURRENT_PAGE_INDEX / this.PAGE_LINK_COUNT) * this.PAGE_LINK_COUNT + 1
      }
      // set endPageIndex
      this.endPageIndex = 0
      if ((this.CURRENT_PAGE_INDEX % this.PAGE_LINK_COUNT) === 0) { // 10, 20...맨마지막
        this.endPageIndex = ((this.CURRENT_PAGE_INDEX / this.PAGE_LINK_COUNT) - 1) * this.PAGE_LINK_COUNT + this.PAGE_LINK_COUNT
      } else {
        this.endPageIndex = Math.floor(this.CURRENT_PAGE_INDEX / this.PAGE_LINK_COUNT) * this.PAGE_LINK_COUNT + this.PAGE_LINK_COUNT
      }
      // set prev
      this.prev = (this.CURRENT_PAGE_INDEX > this.PAGE_LINK_COUNT)
      // set next
      if (this.endPageIndex > this.pageCount) {
        this.endPageIndex = this.pageCount
        this.next = false
      } else {
        this.next = true
      }
    },
    movePage(pageIndex) {
      this.OFFSET = (pageIndex - 1) * this.LIST_ROW_COUNT
      this.CURRENT_PAGE_INDEX = pageIndex
      this.getBunyangList()
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    // 테이블의 행 클릭시 해당 분양정보의 네이버 검색 결과로 이동
    searchBunyang(bname) {
      event.preventDefault()
      window.open('https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query='.concat(bname), '_blank')
    },
    work() {
      alert('hi')
    },
  },
}
</script>
<style lang="scss" module>
@import "./style.module.scss";
</style>
