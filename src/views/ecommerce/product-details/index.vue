<template>
<div>
  <div>
    <div class="cui__utils__heading">
      <strong> <a @click="insertInterestHouse(apt.no)" slot="extra"><a-icon style="color:orange;" type="star" /></a></strong>
    </div>
    <div class="card overflow-hidden">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4">
            <a
              href="#"
              v-on:click="toggleFavorite"
              :class="[$style.favorite, favorite ? 'text-dark' : 'text-gray-3']"
            >
              <i class="fe fe-heart font-size-21"></i>
            </a>
 <google-map class="googleMap" @click="addMarker">
      <div slot-scope="{ google, map }">
        <google-map-marker
          v-for="(marker, index) in markers"
          :google="google"
          :map="map"
          :key="index"
          :position="marker.position"
          @click="panTo($event, map)"
        >
        </google-map-marker>
        <google-map-custom-control
          :google="google"
          :map="map"
          position="BOTTOM_CENTER">
          <input type="text">
        </google-map-custom-control>
      </div>
    </google-map>
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
                <br />
                서울시 종로구 {{apt.dong}}
                <br />{{apt.jibun}}번지&nbsp;{{apt.floor}}층
                <br />건축년도 : {{apt.buildYear}}
                <br />거래일 : {{apt.dealYear}}.{{apt.dealMonth}}.{{apt.dealDay}}
                </a>
            </div>
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="더 많은 사진 보기" key="1" />
              <a-tab-pane tab="상세 설명" key="2" />
            </a-tabs>
            <div class="card-body px-0">
              <p>
                <a @click="search">사진 검색하기</a>
              </p>
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
import http from '@/util/http-common.js'
import data from './data.json'
import CuiGeneral16 from '@/components/kit/widgets/General/16/index'

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
          this.$message.success('즐겨찾기에 등록되었습니다.')
        })
    },
  },
}
</script>
<style lang="scss" module>
@import "./style.module.scss";
</style>
