<template>
<div>
  <div>
    <div class="cui__utils__heading">
      <strong><a @click="passEvent()">&nbsp;<h6>뒤로 가기</h6></a></strong>
    </div>
    <div class="card overflow-hidden">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4">
            <a
              @click="insertInterestHouse(apt.no)"
              v-on:click="toggleFavorite" :isFavorite="true"
              :class="[$style.favorite, favorite ? 'text-dark' : 'text-gray-3']"
            >
              <i class="fe fe-heart font-size-21"></i>
            </a>
            <img src="@/img/apt/apt(4).jpg" width="380px" style="height: 500px;" />

            <div class="d-flex flex-wrap mb-3">
            </div>
          </div>

          <div class="col-lg-8">
            <div class="font-weight-light text-dark mb-2">
              <h1>{{apt.aptName}}</h1>
              <div><h1 class="align-text-bottom text-blue font-weight-light">{{apt.dealAmount}}만 원<br/>{{apt.area}}m² ({{Math.floor(apt.area/3)}}평)</h1></div>
            </div>
            <div class="pb-3 mb-4 mt-6 border-bottom">
              <a href="javascript:void(0);" class="font-size-15">
                <br />아파트 매매
                <br />{{apt.dealYear}}년 {{apt.dealMonth}}월 {{apt.dealDay}}일 거래
                <br />건축년도 : {{apt.buildYear}}
                <div class="font-size-18 font-weight-light" >
                서울시 종로구 {{apt.dong}} {{apt.jibun}}번지&nbsp;{{apt.floor}}층</div>
                </a>
            </div>

              <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="더 많은 사진 보기" key="1">
          <div style="margin-top:13px;">
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/경희궁의아침.jpg" />
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/무악동현대.jpg" />
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/현대뜨레비앙.jpg" />
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/평창동갑을.jpg" />
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/평동경희궁자이(3단지).jpg"/>
          <img width="110" height="115" style="margin-right:20px;" src="@/img/apt/숭인동롯데캐슬천지인.jpg"/>
          <a @click="search()" style="float:right;margin-top:35px;font-size:30px;">→</a>
          </div>
          </a-tab-pane>
      </a-tabs>

            <div class="card-body px-0">
            </div>
          </div>
        </div>
      </div>
    </div>
     <a-divider orientation="left" style="margin-bottom:20px;">
    <ul class="font-weight-bold list-unstyled font-size-30 mb-5">
        </ul>
    </a-divider>
    <div class="cui__utils__heading">
      <h5>Recently viewed</h5>
    </div>
    <recently-visited />
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http-common.js'
import data from './data.json'
import RecentlyVisited from '@/views/houses/recentlyVisited'
export default {
  name: 'detail',
  components: {
    RecentlyVisited,
  },
  props: {
    apt: { type: Array },
    aptlist: { type: Object },
    threeapt: { type: Object },
  },
  data: function () {
    return {
      data,
      images: data.images,
      favorite: true,
      activeImgIndex: 0,
    }
  },
  methods: {
    passEvent() {
      this.$emit('pass')
    },
    toggleFavorite: function (event) {
      event.preventDefault()
      this.favorite = !this.favorite
    },
    setImage: function (index) {
      event.preventDefault()
      this.activeImgIndex = index
    },
    search() {
      event.preventDefault()
      window.open('https://www.google.com/search?q='.concat(this.apt.aptName).concat('+아파트+사진&tbm=isch'), '_blank')
    },
    insertInterestHouse(no) {
      http.post('/houses/interest/insert', { uid: this.uid, no: no })
        .then(({ data }) => {
          Vue.prototype.$notification.success({
            message: '아파트 즐겨찾기 등록 성공.',
            description: '즐겨찾기에 정상적으로 등록되었습니다.',
          })
        })
    },
  },
}
</script>
<style lang="scss" module>
@import "./style.module.scss";
</style>
