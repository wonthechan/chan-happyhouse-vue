/* eslint-disable no-tabs */
<template>
  <div>

    <div class="row ">
      <div class="col-lg-12" style="margin-bottom:50px;margin-top:50px;" >

            <div class="form-inline" >
              <table class="table table-borderless">
                <tr>
                  <td align="center">
                  <a-select style="width: 150px" class="form-control" v-model="searchField">
                    <a-select-option  value="0">선택</a-select-option >
                    <a-select-option  value="aptName">아파트 이름</a-select-option >
                    <a-select-option  value="dong">동 이름</a-select-option >
                  </a-select>
                    <a-input style="width: 400px" v-model="searchText"></a-input>
                    <a-button type="primary" id="registerArea" @click="aptList(); info(); initPageNo(); initOrder();">찾기</a-button>
                  </td>
                </tr>

<div class = "container">
        <b-tabs v-if="TOTAL_LIST_ITEM_COUNT!==0">
          <!-- 탭 기능  (카드 or 맵)-->
          <b-tab title="Card" active>
     <!-- 정렬 -->
      <tr>
        <td align="right">
      <a-select style="width: 150px; margin-right:250px; align=right;" class="form-control" v-model="order" @change="aptList(); initPageNo();">
       <a-select-option  value="">가격별 정렬</a-select-option >
        <a-select-option  value="asc">오름차순</a-select-option >
        <a-select-option  value="desc">내림차순</a-select-option >
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
              <img @click="aptView(item.no)" v-b-modal.modal-1 class="btn btn-light"
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                slot="cover"
              />
              <a-card-meta :description="item.aptName" style="font-size:30px;">
              </a-card-meta>
              <a-card-meta :description="item.dealAmount" style="font-size:20px;">
              </a-card-meta>
              <br>
               <p> {{item.dong}}  면적 : {{item.area}}  건축 연도 : {{item.buildYear}}</p>

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
          <b-tab title="Map">
            <br>
              <google-map class="googleMap"></google-map>
          </b-tab>

        </b-tabs>
      </div>
              </table>

            </div>

          </div>
          <!--card-body end-->

        </div>

<!-- 아파트 상세정보 모달 -->
  <b-modal id="modal-1"
      :title=apt.aptName
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      hide-footer="true"
       centered>

         <img src="img/apt/건양하늘터.jpg" class="rounded" width = "300" style="float:left; margin:10px;"/>
         <div class="mb-5">
              {{apt.dong}}
    </div>
    <div>{{apt.dealAmount}}</div>
    <div>{{apt.buildYear}}</div>
    <div>
      {{apt.dealYear}}년{{apt.dealMonth}}월{{apt.dealDay}}일
    </div>
    <div>전용 면적 : {{apt.area}}</div>
    <div>{{apt.floor}}층</div>

      </b-modal>
<!---------------->

      </div>
</template>
<script>

import http from '@/util/http-common.js'
export default {
  name: 'houseSearch',
  components: {
  },
  data() {
    return {
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      order: '',
      searchField: '',
      searchText: '',
      aptlist: [],
      apt: {},
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
      locations: [{
        lat: '37.5793355',
        lng: '126.9684839',
      }],
    }
  },
  methods: {

    // 검색 결과 정보를 9개씩 불러온다.
    aptList() {
      http.post('/houses/search', { order: this.order, pageNo: this.CURRENT_PAGE_INDEX - 1, searchField: this.searchField, searchText: this.searchText })
        .then(({ data }) => {
          this.aptlist = data
          this.aptListTotalCnt()
        })
    },
    // 검색 결과 개수 알림
    info() {
      setTimeout(() => {
        if (this.TOTAL_LIST_ITEM_COUNT === 0) { this.$message.info('검색 결과가 없습니다.') } else { this.$message.info(`총 ${this.TOTAL_LIST_ITEM_COUNT}건의 결과가 있습니다.`) }
      }, 900)
    },
    // 리스트를 뷰에 뿌린 뒤, 페이징을 하기 위하여 전체 아파트 개수를 구한다.
    aptListTotalCnt() {
      http.post('/houses/count', { searchField: this.searchField, searchText: this.searchText })
        .then(({ data }) => {
          this.TOTAL_LIST_ITEM_COUNT = data
          this.addPagination()
        })
    },

    // 아파트 번호에 해당하는 정보를 모달에 띄워 보여준다
    aptView(no) {
      http.get(`/houses/detail/${no}`)
        .then(({ data }) => {
          this.apt = data
        })
    },
    // 유저 아파트 즐겨찾기 추가
    insertInterestHouse(no) {
      http.post('/houses/interest/insert', { uid: this.uid, no: no })
        .then(({ data }) => {
          this.$message.success('즐겨찾기에 등록되었습니다.')
        })
    },
    // 맵 리스트
    mapList() {
      http.post('/houses/map', { searchField: this.searchField, searchText: this.searchText })
        .then(({ data }) => {
          this.locations = data
        })
      alert(this.locations[0].lat)
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
<style>
  .googleMap {
    height: 500px
  }
</style>
