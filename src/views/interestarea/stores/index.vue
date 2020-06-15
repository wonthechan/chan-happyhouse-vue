<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="row-lg-4 mb-3">
          <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="관심 지역 주변 상권"
            :breadcrumb="{ props: { routes } }"
            sub-title="관심 지역 주변의 상권 정보를 확인할 수 있습니다."
          />
        </div>
        <div class="row-lg-4">
          <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary">
            <div class="card-header">
              <a-icon class="font-size-18 mr-2" type="search" />
              <span class="text-dark font-size-18 font-weight-bold mb-0">나의 관심 지역 선택</span>
            </div>
            <div class="card-body">
              <div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>시 / 도</th><th>군 / 구</th><th>동</th><th></th><th></th><th></th><th></th>
                    </tr>
                  </thead>
                  <tbody id="areaTbody">
                    <tr v-for="(area, index) in userAreas" :key="'item_' + index">
                      <td>{{ area.city }}</td><td>{{ area.gu }}</td><td>{{ area.dong }}</td><td></td><td></td><td></td><td><a-button shape="circle" icon="search" @click="searchStore(area.dongcode, area.dong)"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary" v-if="TOTAL_LIST_ITEM_COUNT > 0">
          <div class="card-header">
            <a-icon class="font-size-18 mr-2" type="shop" />
            <span class="text-dark font-size-18 font-weight-bold mb-0">{{ this.currentDong.dong }} 상권 정보</span>
          </div>
          <div class="card-body">
            <div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>가게이름</th>
                    <th>업종정보</th>
                    <th>가게위치</th>
                  </tr>
                </thead>
                <tbody id="areaTbody">
                  <tr style="cursor:pointer" v-for="(store, index) in stores" :key="'store' + index" @click="showDetailModal(store.no)"> <!-- 클릭 시 상세 모달 로드 -->
                    <td class="small">{{ store.shopname }}</td><td class="small">{{ store.codename4 }}</td><td class="small">{{ store.jibuaddress }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- paging -->
              <div id="paginationWrapper">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <store-detail-modal
      @close-modal-event="closeDetailModal()"
      :isVisible="visible"
      :storeNo="detailStoreNo"
    />
  </div>
</template>
<script>
import http from '@/util/http-common.js'
import StoreDetailModal from './StoreDetailModal'

export default {
  name: 'interestareaStores',
  components: {
    StoreDetailModal,
  },
  data() {
    return {
      uid: 'ssafy',
      userAreas: [],
      stores: [],
      currentDong: { dongCode: '', dong: '' },
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
          breadcrumbName: '관심 지역 주변 상권',
        },
      ],
      visible: false, // 모달 창 보이기/안보이기
      detailModalTitle: '',
      detailStoreNo: -1,
    }
  },
  created() {
    // 사용자 등록 관심 지역 받아오기 (ssafy 테스트 계정)
    this.updateUserAreas()
    // 시도코드 데이터 받아오기
    http.get('/areas/sido')
      .then(({ data }) => {
        this.sidos = data
      })
  },
  computed: {
  },
  methods: {
    // 관심 지역 받아오기
    updateUserAreas() {
      http.get(`/areas/interest/${this.uid}`)
        .then(({ data }) => {
          this.userAreas = data
        })
    },
    // 관심 지역 등록하기
    registerArea() {
      if (this.currentDong === '0') { // 지역을 선택하지 않은 경우 종료
        alert('지역을 선택해주세요!')
        return
      }
      http.post('/areas/interest', { uid: this.uid, dongcode: this.currentDong.dongCode, dong: this.currentDong.dong })
        .then(({ data }) => {
          console.log(data)
          if (data === 1) {
            alert('등록되었습니다.')
            this.updateUserAreas()
          } else {
            alert('등록 중 문제가 발생하였습니다.')
          }
        })
        .catch((data) => {
          console.log(data)
          alert('등록 중 문제가 발생하였습니다.')
        })
    },
    searchStore(dongCode, dong) {
      this.currentDong.dongCode = dongCode
      this.currentDong.dong = dong
      this.storeList()
    },
    storeList() {
      http.get(`/stores/${this.currentDong.dongCode}/${this.OFFSET}/${this.LIST_ROW_COUNT}`)
        .then(({ data }) => {
          this.stores = data
          this.storeListTotalCnt()
        })
    },
    storeListTotalCnt() {
      http.get(`/stores/count/${this.currentDong.dongCode}`)
        .then(({ data }) => {
          this.TOTAL_LIST_ITEM_COUNT = data
          this.addPagination()
        })
        .catch((data) => {
          console.log(data)
          alert('Opps!! 글 전체 갯수 조회 과정에 문제가 생겼습니다.')
        })
    },
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
      this.storeList()
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    // 상권 상세 정보 모달 보이기
    showDetailModal(no) {
      this.detailStoreNo = no
      this.visible = true
    },
    // 모달창 닫기
    closeDetailModal() {
      this.visible = false
    },
  },
}
</script>
