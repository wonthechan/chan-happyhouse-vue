<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary">
          <div class="card-header card-header-flex">
            <div class="d-flex flex-column justify-content-center mr-auto">
              <h3 class="text-dark font-size-18 font-weight-bold mb-0">관심 지역 관리</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="form-inline">
              <table class="table table-borderless">
                <tr>
                  <td align="center">
                  <a-select style="width: 150px" class="form-control" id="sido" v-model="currentSidoCode" @change="getGugunList()">
                    <a-select-option  value="0">선택</a-select-option >
                    <a-select-option  v-for="(sido, index) in sidos" :key="'item_' + index" :value="sido.citycode">{{ sido.city }}</a-select-option >
                  </a-select>
                <a-select style="width: 150px" class="form-control" id="gugun" v-model="currentGuCode" @change="getDongList()">
                  <a-select-option value="0">선택</a-select-option>
                  <a-select-option v-for="(gugun, index) in guguns" :key="'item_' + index" :value="gugun.gucode">{{ gugun.gu }}</a-select-option>
                </a-select>
                <a-select style="width: 150px" class="form-control" id="dong" v-model="currentDong">
                    <a-select-option value="0">선택</a-select-option>
                    <a-select-option v-for="(dong, index) in dongs" :key="'item_' + index" :value="`${dong.dongcode}/${dong.dong}`">{{ dong.dong }}</a-select-option>
                </a-select>
                    <a-button type="primary" id="registerArea" @click="registerArea()">등록</a-button>
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
                    <td>{{ area.city }}</td><td>{{ area.gu }}</td><td>{{ area.dong }}</td><td></td><td></td><td></td><td><a-button type="danger" @click="deleteArea(area.dongcode)">삭제</a-button></td>
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
  computed: {
    currentDongCode() {
      return this.currentDong.split('/')[0]
    },
    currentDongName() {
      return this.currentDong.split('/')[1]
    },
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
            this.$notification.success({
              message: '삭제 성공!',
              description:
                '선택 하신 관심 지역이 정상적으로 삭제되었습니다.',
            })
            this.updateUserAreas()
          } else {
            this.$notification.error({
              message: '삭제 실패',
              description:
                '삭제 도중에 문제가 발생하였습니다.',
            })
          }
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '삭제 실패',
            description:
              '삭제 도중에 문제가 발생하였습니다.',
          })
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
      if (this.currentDongCode === '0') { // 지역을 선택하지 않은 경우 종료
        alert('지역을 선택해주세요!')
        return
      }
      http.post('/areas/interest', { uid: this.uid, dongcode: this.currentDongCode, dong: this.currentDongName })
        .then(({ data }) => {
          console.log(data)
          if (data === 1) {
            this.$notification.success({
              message: '등록 성공!',
              description:
                '선택 하신 관심 지역이 정상적으로 등록되었습니다.',
            })
            this.updateUserAreas()
          } else {
            this.$notification.error({
              message: '등록 실패',
              description:
                '등록 도중에 문제가 발생하였습니다.',
            })
          }
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '등록 실패',
            description:
              '등록 도중에 문제가 발생하였습니다.',
          })
        })
    },
  },
}
</script>
