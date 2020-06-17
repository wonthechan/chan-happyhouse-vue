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
    <div class="row ">
      <div class="col-lg-12" style="margin-bottom:50px;margin-top:50px;" >
            <div class="form-inline" >
              <table class="table table-borderless">
                <tr>
                  <td align="center">
                    <div>
                    <!-- 선택옵션 -->
                  <a-select size="large" class="font-weight-bold list-unstyled mr-3" :value="searchField" style="width: 150px;font-size:20px;color:#96939c;" v-model="searchField">
                    <a-select-option  value="aptName">아파트 이름</a-select-option >
                    <a-select-option   value="dong">동 이름</a-select-option >
                  </a-select>
                    <!-- 입력창 -->
                    <a-input placeholder="원하시는 지역명, 아파트명을 입력해주세요" class="font-weight-bold list-unstyled mr-3" style="width: 700px;height:70px;font-size:20px;padding-left:16px;" enter-button="Search" v-model="searchText">

                    </a-input>
                    <!-- 버튼 클릭 -->
                    <a-button class="font-weight-bold list-unstyled" style="height:70px; font-size:20px;" type="primary" id="registerArea" @click="aptList(); msg(); initPageNo(); initOrder(); mapList();">
                      찾기
                      </a-button></div>
                  </td>
                </tr>
<br /><br /><br />
<div class = "container">

   <b-tabs v-if="TOTAL_LIST_ITEM_COUNT!==0">
          <!-- 탭 기능  (카드 or 맵)-->
          <b-tab title="리스트 보기" active>
     <!-- 정렬 -->
      <tr>
        <td align="right">
      <a-select style="width: 150px; margin-right:150px;" class="form-control" v-model="order" @change="aptList(); initPageNo();">
       <a-select-option  value="">등록일순</a-select-option >
        <a-select-option  value="asc">낮은가격</a-select-option >
        <a-select-option  value="desc">높은가격</a-select-option >
       </a-select>
       </td>
      </tr>
       <!-- 정렬 end -->
        <!-- aptlist start-->
            <div class="row e-card-layout">
        <div class="col-sm-4 col-sm-4 col-sm-4 col-sm-4" style="margin-bottom:50px" v-for="(item, index) in aptlist" v-bind:key="index">

        <div class = "container">
         <a-card style="width: 300px">
           <a @click="insertInterestHouse(item.no)" slot="extra"><a-icon style="color:orange;" type="star" /></a>
              <img @click="aptView(item.no); recentlyVisited(item.no)" class="btn btn-light"
                :src="`../../img/apt/${item.img}`"
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

    </div>
      </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http-common.js'
import Detail from '@/views/houses/detail'
import googlemap from '@/views/houses/googlemap'
export default {
  name: 'houseSearch',
  components: {
    Detail,
    googlemap,
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
    // 검색 결과 개수 알림
    msg() {
      setTimeout(() => {
        if (this.TOTAL_LIST_ITEM_COUNT === 0 && this.searchField !== '선택') {
          Vue.prototype.$notification.warn({
            message: '검색 결과가 없습니다.',
            description: '다시 입력해 주세요.',
          })
        }
      }, 1000)
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
          this.goDetail = true
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
