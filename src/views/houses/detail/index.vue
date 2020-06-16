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
            <img src="@/img/apt/건양하늘터.jpg" style="height: 500px" />

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
                <br />서울시 종로구 {{apt.dong}} {{apt.jibun}}번지&nbsp;{{apt.floor}}층
                </a>
            </div>

              <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="더 많은 사진 보기" key="1" forceRender>
          <img width="145" height="150" style="margin-right:20px;" src="@/img/apt/경희궁의아침.jpg" />
          <img width="145" height="150" style="margin-right:20px;" src="@/img/apt/무악동현대.jpg" />
          <img width="145" height="150" style="margin-right:20px;" src="@/img/apt/현대뜨레비앙.jpg" />
          <img width="145" height="150" style="margin-right:20px;" src="@/img/apt/평창동갑을.jpg" />
          <img width="145" height="150" style="margin-right:20px;" src="@/img/apt/평동경희궁자이(3단지).jpg"/>
          <a @click="search()" style="float:right;margin-top:45px;font-size:30px;">-></a>
          </a-tab-pane>
      </a-tabs>

            <div class="card-body px-0">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cui__utils__heading">
      <h5>Related Apartments</h5>
    </div>
    <div class="row">
      <div class="col-lg-4" v-for="(product, index) in data.products" :key="index">
        <cui-general-16
          :isFavorite="true"
          :name="apt.aptName"
          :price="apt.dealAmount"
        />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http-common.js'
import data from './data.json'
import CuiGeneral16 from '@/views/houses/detail/kit/index'

export default {
  name: 'detail',
  components: {
    CuiGeneral16,
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
