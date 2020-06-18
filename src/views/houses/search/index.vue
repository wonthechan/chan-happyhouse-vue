/* eslint-disable no-tabs */
<template>
  <div>
    <div v-if="goDetail">
    <detail
      :aptlist="aptlist"
      :threeapt="threeapt"
      :apt="apt"
      v-on:pass="fromDetail"
    />
    </div>
    <div v-else>
      <div style="margin-bottom:50px;" >
            <div class="form-inline" >
              <table class="table table-borderless">
                <tr>
                  <td align="center">

                   <my-search v-on:searchpass="getInput" />

                  </td>
                </tr>
<br />
              <div v-if="showChart">
                <div class="row">
                        <div class="col-lg-6">
                         <!-- 여기에 서울시 자치구 월별 아파트 거래 금액 연 추이 카드 -->
                          <monthly-avg-deal-chart initSelected="0"/>
                          </div>
                          <div class="col-lg-6">
                          <monthly-avg-deal-chart initSelected="1"/>
                       </div>
                      </div>
                      <div class="cui__utils__heading" style="margin-top:50px;">
                     <h5>Recently viewed</h5>
                       </div>
                      <recently-visited />
                    </div>
<div v-else>

   <b-tabs v-if="TOTAL_LIST_ITEM_COUNT!==0">
          <!-- 탭 기능  (카드 or 맵)-->
          <b-tab title="리스트 보기" active>
     <!-- 정렬 -->
      <tr>
        <td align="right">
      <a-select style="width: 150px; margin-right:150px;margin-top:10px;margin-bottom:20px;" class="form-control" v-model="order" @change="aptList(); initPageNo();">
       <a-select-option  value="">등록일순</a-select-option >
        <a-select-option  value="asc">낮은가격</a-select-option >
        <a-select-option  value="desc">높은가격</a-select-option >
       </a-select>
       </td>
      </tr>
       <!-- 정렬 end -->
        <!-- aptlist start-->
            <div class="row e-card-layout" style="margin-left:2px;">
        <div class="col-sm-4 col-sm-4 col-sm-4 col-sm-4" style="margin-bottom:50px;" v-for="(item, index) in aptlist" v-bind:key="index">

        <div class = "container">
         <a-card style="width: 370px">
           <a @click="insertInterestHouse(item.no);" slot="extra"><a-icon style="color:orange;" type="star" /></a>
              <img @click="aptView(item.no);recentlyVisited(item.no);" v-b-modal.modal-1 class="btn btn-light"
                src="@/img/apt/아남1.jpg"
                style="height: 300px"
                slot="cover"
              />

              <!--https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png -->
              <a-card-meta :description="item.aptName" style="font-size:30px;">
              </a-card-meta>
              <a-card-meta :description="item.dealAmount" style="font-size:20px;">
              </a-card-meta>
              <br>
               <h6> {{item.dong}}</h6> <h6>{{Math.floor(item.area)}}m² ({{Math.floor(item.area/3)}}평)  {{item.buildYear}}년 건축</h6>

            </a-card>
        </div>
          </div>
       </div>
       <!--aptlist end-->

         <!-- paging start -->
      <div id="paginationWrapper" style="align:center;" v-if="TOTAL_LIST_ITEM_COUNT!==0">
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
                  <li class="ant-pagination-next" v-if="next" >
                    <a class="ant-pagination-item-link" @click.prevent="movePage(endPageIndex + 1)" aria-label="Next">
                      <a-icon type="right"/>
                    </a>
                  </li>
                </ul>
              </div>
        <!---------------------->

        </b-tab>
        <!-- 맵 -->
          <b-tab title="지도 보기">
            <br><br />
     <googlemap :maplist="maplist" :key="mapComponentKey" />

          </b-tab>
          </b-tabs>
      </div>
              </table>

            </div>

          </div>
          <!--card-body end-->

        </div>
 <b-modal id="modal-1"
        :title="apt.aptName"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        hide-footer="true"
        centered>
      <div>
        <table class="table table-hover">
          <thead>
          </thead>
          <tbody id="areaTbody">
            <tr>
              <td>위치</td><td>서울시 종로구 {{apt.aptdong}} {{apt.jibun}}번지</td>
            </tr>
            <tr><td>가격</td><td>{{apt.dealAmount}}</td></tr>
            <tr><td>실평수</td><td>{{Math.floor(apt.area)}} ({{Math.floor(apt.area/3)}}평)</td></tr>
            <tr><td>층수</td><td>{{apt.floor}} 층</td></tr>
            <tr><td>거래타입</td><td>아파트 매매</td></tr>
            <tr><td>거래일자</td><td>{{apt.dealYear}}년 {{apt.dealMonth}}월 {{apt.dealDay}}일</td></tr>
            <tr><td>건축년도</td><td>{{apt.buildYear}}</td></tr>
            <tr><td>법정동코드</td><td>{{apt.code}}</td></tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http-common.js'
import Detail from '@/views/houses/detail'
import MySearch from '@/views/houses/searchinput'
import googlemap from '@/views/houses/googlemap'
import MonthlyAvgDealChart from '@/components/custom/analytics/MonthlyAvgDealChart'
import RecentlyVisited from '@/views/houses/recentlyVisited'
export default {
  components: {
    Detail,
    googlemap,
    MySearch,
    MonthlyAvgDealChart,
    RecentlyVisited,
  },
  data() {
    return {
      mapComponentKey: 0,
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      order: '',
      searchField: '선택',
      searchText: '',
      aptlist: [],
      apt: {},
      maplist: [],
      threeapt: [],
      aptdescription: '',
      LIST_ROW_COUNT: 12,
      OFFSET: 0,
      PAGE_LINK_COUNT: 10, // pagination link 갯수
      TOTAL_LIST_ITEM_COUNT: 0,
      CURRENT_PAGE_INDEX: 1,
      next: false,
      pageCount: 0,
      startPageIndex: 0,
      endPageIndex: 0,
      prev: false,
      goDetail: false,
      showChart: true,
      // map data
      markers: [],
      width: 730,
      height: 400,
      info: false,
      marker: null,
      map: null,
      mapOptions: {
        lat: 37,
        lng: 127,
        zoom: 15,
        zoomControl: false,
        mapTypeControl: true,
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT'],
    }
  },
  created() {
    this.goDetail = false
  },
  methods: {
    getInput: function(payload) {
      if (payload === 'chart') {
        this.showChart = true
      } else {
        this.searchField = payload.searchField
        this.searchText = payload.searchText
        this.aptList()
        this.initPageNo()
        this.initOrder()
        this.mapList()
        this.showResult = true
        this.showChart = false
      }
    },
    // 검색 결과 정보를 9개씩 불러온다.
    aptList() {
      if (this.searchField === '선택') {
        Vue.prototype.$notification.warn({
          message: '검색 타입을 선택해주세요',
        })
      } else {
        http.post('/houses/search', { order: this.order, pageNo: this.CURRENT_PAGE_INDEX - 1, searchField: this.searchField, searchText: this.searchText })
          .then(({ data }) => {
            this.aptlist = data
            this.aptListTotalCnt()
          })
      }
    },
    // 리스트를 뷰에 뿌린 뒤, 페이징을 하기 위하여 전체 아파트 개수를 구한다.
    aptListTotalCnt() {
      http.post('/houses/count', { searchField: this.searchField, searchText: this.searchText })
        .then(({ data }) => {
          this.TOTAL_LIST_ITEM_COUNT = data
          this.addPagination()
        })
    },

    // 아파트 번호에 해당하는 정보 상세페이지를 보여준다.
    aptView(no) {
      for (var i = 0; i < 3; i++) {
        this.threeapt.push(this.aptlist[Math.floor(Math.random() * this.TOTAL_LIST_ITEM_COUNT)])
      }
      http.get(`/houses/detail/${no}`)
        .then(({ data }) => {
          this.apt = data
        })
    },
    fromDetail() {
      this.goDetail = false
    },
    // 유저 아파트 즐겨찾기 추가
    insertInterestHouse(no) {
      http.post('/houses/interest/insert', { uid: this.uid, no: no })
        .then(({ data }) => {
          Vue.prototype.$notification.success({
            message: '아파트 즐겨찾기 등록 성공.',
            description: '즐겨찾기에 정상적으로 등록되었습니다.',
          })
        })
    },
    // 유저가 방문한 기록 추가
    recentlyVisited(no) {
      http.post(`/houses/visited/${this.uid}/${no}`)
        .then(({ data }) => {
        })
    },
    // 맵에 좌표 찍어올 distinct 아파트 리스트 받아오기
    mapList() {
      http.post('/houses/map', { searchField: this.searchField, searchText: this.searchText })
        .then(({ data }) => {
          this.maplist = data
          this.refreshMapComponent() // 리스트를 다 받아오면 그 때 리프레쉬 하자! (then 안에 넣기)
        })
    },
    // 맵 컴포넌트를 리프레쉬
    refreshMapComponent() {
      this.mapComponentKey += 1
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
      this.aptList()
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    initPageNo() {
      this.CURRENT_PAGE_INDEX = 1
    },
    initOrder() {
      this.order = ''
    },
  },
}
</script>
