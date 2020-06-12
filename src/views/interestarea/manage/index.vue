<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary">
          <div class="card-header card-header-flex">
            <div class="d-flex flex-column justify-content-center mr-auto">
              <h5 class="mb-0">관심 지역 관리</h5>
            </div>
          </div>
          <div class="card-body">
            <h3 class="text-dark font-size-18 font-weight-bold mb-3">관심 지역 등록</h3>
            <div class="form-inline">
              <table class="table table-borderless">
                <tr>
                  <td align="center">
                  <select class="form-control" id="sido" v-model="currentSidoCode" @change="getGugunList()">
                    <option value="0">선택</option>
                    <option v-for="(sido, index) in sidos" :key="'item_' + index" :value="sido.citycode">{{ sido.city }}</option>
                  </select>
                <select class="form-control" id="gugun" v-model="currentGuCode" @change="getDongList()">
                  <option value="0">선택</option>
                  <option v-for="(gugun, index) in guguns" :key="'item_' + index" :value="gugun.gucode">{{ gugun.gu }}</option>
                </select>
                <select class="form-control" id="dong" v-model="currentDong">
                    <option value="0">선택</option>
                    <option v-for="(dong, index) in dongs" :key="'item_' + index" :value="{ dongCode: dong.dongcode, dong: dong.dong }">{{ dong.dong }}</option>
                </select>
                    <button class="btn btn-primary" id="registerArea" @click="registerArea()">관심지역 등록</button>
                  </td>
                </tr>
              </table>
            </div>

            <div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>시 / 도</th><th>군 / 구</th><th>동</th><th></th><th></th><th></th><th></th>
                  </tr>
                </thead>
                <tbody id="areaTbody">
                  <tr v-for="(area, index) in userAreas" :key="'item_' + index">
                    <td>{{ area.city }}</td><td>{{ area.gu }}</td><td>{{ area.dong }}</td><td></td><td></td><td></td><td><button @click="deleteArea(area.dongcode)" type="button" class="btn btn-outline-danger btn-sm" style="text-align:right;">삭제</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'

export default {
  name: 'interestareaManage',
  components: {
  },
  data() {
    return {
      uid: 'ssafy',
      userAreas: [],
      currentSidoCode: '0',
      currentGuCode: '0',
      currentDong: '0',
      sidos: [],
      guguns: [],
      dongs: [],
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
  methods: {
    // 시도 선택 시 구군 데이터 받아오기
    getGugunList() {
      if (this.currentSidoCode === '0') return
      http.get('/areas/gugun/' + this.currentSidoCode)
        .then(({ data }) => {
          this.guguns = data
        })
      this.currentGuCode = '0'
      this.currentDong = '0'
    },
    // 구군 선택 시 동 데이터 받아오기
    getDongList() {
      if (this.currentGuCode === '0') return
      http.get('/areas/dong/' + this.currentGuCode)
        .then(({ data }) => {
          this.dongs = data
        })
      this.currentDong = '0'
    },
    // 관심 지역 삭제 요청
    deleteArea(dongCode) {
      http.delete('/areas/interest', { data: { uid: this.uid, dongcode: dongCode } })
        .then(({ data }) => {
          console.log(data)
          if (data === 1) {
            alert('삭제되었습니다.')
            this.updateUserAreas()
          } else {
            alert('삭제 중 문제가 발생하였습니다.')
          }
        })
        .catch((data) => {
          console.log(data)
          alert('삭제 중 문제가 발생하였습니다.')
        })
    },
    // 관심 지역 받아오기
    updateUserAreas() {
      http.get('/areas/interest/' + this.uid)
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
  },
}
</script>
