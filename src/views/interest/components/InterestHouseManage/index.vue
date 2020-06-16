<template>
  <div>
    <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary">
      <div class="card-header">
          <a-icon class="font-size-18 mr-2" type="star" />
          <span class="text-dark font-size-18 font-weight-bold mb-0">즐겨찾기</span>
      </div>
      <div class="card-body">
        <div class="mb-5">
        </div>
        <div class="row e-card-layout">
          <div class="col-sm-4 col-sm-4 col-sm-4 col-sm-4" style="margin-bottom:50px" v-for="(item, index) in aptlist" :key="'item_' + index">
            <div class = "container">
              <a-card style="width: 300px">
                <a @click="deleteInterestHouse(item.no)" slot="extra"><a-icon style="color:red;" type="close-circle" /></a>
                <img @click="aptView(item.no)" v-b-modal.modal-1 class="btn btn-light"
                  alt="example"
                  src="@/img/apt/건양하늘터.jpg"
                  style="height: 300px"
                  slot="cover"
                />
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
        <div class="form-inline">
        </div>
      </div>
    </div>
    <!-- 아파트 상세정보 모달 -->
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
import http from '@/util/http-common.js'
import Vue from 'vue'

export default {
  name: 'interestHouseManage',
  components: {
  },
  data() {
    return {
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      aptlist: [],
      apt: {},
      url: '',
      routes: [
        {
          path: '',
          breadcrumbName: 'Home',
        },
        {
          path: '',
          breadcrumbName: '아파트/주택',
        },
        {
          path: '',
          breadcrumbName: '즐겨찾기 한 매물',
        },
      ],
    }
  },
  created() {
    this.findAllInterestHouse()
  },
  methods: {
    deleteInterestHouse(no) {
      http.delete(`/houses/interest/delete/${this.uid}/${no}`)
        .then(({ data }) => {
          if (data === 'success') {
            this.findAllInterestHouse()
            Vue.prototype.$notification.success({
              message: '아파트 즐겨찾기 삭제완료.',
              description: '즐겨찾기에서 정상적으로 삭제되었습니다.',
            })
          } else {
            Vue.prototype.$notification.error({
              message: '아파트 즐겨찾기 삭제실패.',
              description: '즐겨찾기 삭제중 오류가 발생했습니다.',
            })
          }
        })
    },
    findAllInterestHouse() {
      http.get(`/houses/interest/${this.uid}`)
        .then(({ data }) => {
          this.aptlist = data
        })
    }, // 아파트 번호에 해당하는 정보를 모달에 띄워 보여준다
    aptView(no) {
      http.get(`/houses/detail/${no}`)
        .then(({ data }) => {
          this.url = '@/img/apt/'.concat(data.aptName)
          this.apt = data
        })
    },

  },
}
</script>
