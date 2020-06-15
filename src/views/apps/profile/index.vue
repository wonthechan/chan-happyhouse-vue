/* eslint-disable no-tabs */
<template>
  <div>
    <div v-if="goDetail">
    <detail
      :apt="apt"
      :aptList="aptlist"
      :threeapt="threeapt"
    />
    </div>
    <div v-else>
    <div class="row ">
      <div class="col-lg-12" style="margin-bottom:50px;margin-top:50px;" >
            <div class="form-inline" >
              <table class="table table-borderless">
                <tr>
                  <td align="center">
                  <a-select :value="searchField" style="width: 150px" class="form-control" v-model="searchField">
                    <a-select-option  value="선택">선택</a-select-option >
                    <a-select-option  value="aptName">아파트 이름</a-select-option >
                    <a-select-option  value="dong">동 이름</a-select-option >
                  </a-select>
                    <a-input style="width: 400px" v-model="searchText"></a-input>
                    <a-button type="primary" id="registerArea" @click="aptList(); info(); initPageNo(); initOrder(); mapList();">찾기</a-button>
                  </td>
                </tr>
    <!-- 정렬 -->
      <tr>
        <td align="right" v-if="TOTAL_LIST_ITEM_COUNT!==0">
      <a-select style="width: 150px; margin-right:150px;" class="form-control" v-model="order" @change="aptList(); initPageNo();">
       <a-select-option  value="">가격별 정렬</a-select-option >
        <a-select-option  value="asc">오름차순</a-select-option >
        <a-select-option  value="desc">내림차순</a-select-option >
       </a-select>
       </td>
      </tr><br />
       <!-- 정렬 end -->
<div class = "container">
        <!-- aptlist start-->
            <div class="row e-card-layout">
        <div class="col-sm-4 col-sm-4 col-sm-4 col-sm-4" style="margin-bottom:50px" v-for="(item, index) in aptlist" v-bind:key="index">

           <div class = "container">
         <a-card style="width: 300px">
           <a @click="insertInterestHouse(item.no)" slot="extra"><a-icon style="color:orange;" type="star" /></a>
              <img @click="aptView(item.no)" class="btn btn-light"
                alt="example"
                src="@/img/apt/건양하늘터.jpg"
                style="height: 300px"
                slot="cover"
              /><!--https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png -->
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

import http from '@/util/http-common.js'
import Detail from '@/views/ecommerce/product-details'
export default {
  name: 'houseSearch',
  components: {
    Detail,
  },
  data() {
    return {
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      order: '',
      searchField: '선택',
      searchText: '',
      url: '@/img/apt/건양하늘터.jpg',
      aptlist: [],
      apt: {},
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
    }
  },
  created() {
    this.goDetail = false
  },
  methods: {
    // 검색 결과 정보를 9개씩 불러온다.
    aptList() {
      if (this.searchField === '선택') { this.$message.info('검색 타입을 선택해주세요') } else {
        http.post('/houses/search', { order: this.order, pageNo: this.CURRENT_PAGE_INDEX - 1, searchField: this.searchField, searchText: this.searchText })
          .then(({ data }) => {
            this.aptlist = data
            this.aptListTotalCnt()
          })
      }
    },
    // 검색 결과 개수 알림
    info() {
      setTimeout(() => {
        if (this.TOTAL_LIST_ITEM_COUNT === 0 && this.searchField !== '선택') { this.$message.info('검색 결과가 없습니다.') } else if (this.searchField === '선택') {} else { this.$message.info(`총 ${this.TOTAL_LIST_ITEM_COUNT}건의 결과가 있습니다.`) }
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

    // 아파트 번호에 해당하는 정보를 모달에 띄워 보여준다
    aptView(no) {
      for (var i = 0; i < 3; i++) {
        this.threeapt.push(this.aptlist[Math.floor(Math.random() * this.TOTAL_LIST_ITEM_COUNT)])
      }
      http.get(`/houses/detail/${no}`)
        .then(({ data }) => {
          this.apt = data
        })
      this.goDetail = true
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
