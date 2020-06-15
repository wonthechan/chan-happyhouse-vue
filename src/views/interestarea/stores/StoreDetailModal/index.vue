<template>
  <a-modal v-model="isThisVisble" title="상세 정보" :footer="null" width="800px">
    <a-descriptions
      size="small"
      bordered
      :column="colSize"
    >
      <a-descriptions-item label="등록 번호" :span="3">
        {{ storeInfo.no }}
      </a-descriptions-item>
      <!-- 2nd row -->
      <a-descriptions-item label="상호명" :span="2">
        <strong>{{ storeInfo.shopName }}</strong>
      </a-descriptions-item>
      <a-descriptions-item label="지점명">
        {{ storeInfo.localName }}
      </a-descriptions-item>
      <!-- 3rd row -->
      <a-descriptions-item label="대분류">
        {{ storeInfo.largeCategory }}
      </a-descriptions-item>
      <a-descriptions-item label="중분류">
        {{ storeInfo.mediumCategory }}
      </a-descriptions-item>
      <a-descriptions-item label="소분류">
        {{ storeInfo.smallCategory }}
      </a-descriptions-item>
      <!-- 4th row -->
      <a-descriptions-item label="도로명 주소" :span="3">
        {{ storeInfo.newAddress }}
      </a-descriptions-item>
      <!-- 5th row -->
      <a-descriptions-item label="지번 주소" :span="3">
        {{ storeInfo.oldAddress }}
      </a-descriptions-item>
      <!-- 6th row -->
      <a-descriptions-item label="신 우편번호">
        {{ storeInfo.newPostCode }}
      </a-descriptions-item>
      <a-descriptions-item label="구 우편번호">
        {{ storeInfo.oldPostCode }}
      </a-descriptions-item>
      <a-descriptions-item label="위경도">
        {{ storeInfo.lat }},<br>
        {{ storeInfo.lng }}
      </a-descriptions-item>
    </a-descriptions>
    <div style="padding: 10px">
      <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad">
      <naver-marker :lat="37" :lng="127" @load="onMarkerLoaded"/>
    </naver-maps>
    </div>
    <div style="padding-left: 10px">Naver Map API</div>
  </a-modal>
</template>
<script>
import http from '@/util/http-common.js'
// import naver from 'vue-naver-maps'

export default {
  name: 'storeDetailModal',
  components: {
  },
  props: [
    'isVisible',
    'storeNo',
  ],
  data() {
    return {
      colSize: 3,
      storeInfo: {},
      // map data
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
  },
  computed: {
    isThisVisble: { // 부모의 prop값을 직접 수정하지 않기 위함
      // getter
      get() {
        return this.isVisible
      },
      // setter
      set(newValue) {
        if (newValue === false) {
          // eslint-disable-next-line vue/custom-event-name-casing
          this.$emit('closeModalEvent')
        }
      },
    },
    // map
    hello() {
      return 'Hello, World!'
    },
  },
  watch: {
    storeNo: function(newVal, oldVal) { // prop 속성 watch 하기, 그리고 정보 업데이트
      if (newVal === -1) return
      this.updateDetail(newVal)
    },
  },
  methods: {
    updateDetail(no) {
      // 상점 상세 정보를 받아와야 함 (DB)
      http.get(`/stores/${no}`)
        .then(({ data }) => {
          this.storeInfo = {
            no: data.no,
            shopName: data.shopname,
            localName: data.localname,
            largeCategory: data.codename1,
            mediumCategory: data.codename2,
            smallCategory: data.codename3,
            newAddress: data.address,
            oldAddress: data.jibuaddress,
            newPostCode: data.postcode,
            oldPostCode: data.oldpostcode,
            lat: parseFloat(data.lat.replace(/"/g, '')),
            lng: parseFloat(data.lng.replace(/"/g, '')),
          }
          this.updateMapStatus()
        })
        .catch((data) => {
          console.log(data)
          this.$notification.error({
            message: '불러오기 실패',
            description:
              '상점 상세 정보를 불러오는 도중에 문제가 발생하였습니다.',
          })
          // eslint-disable-next-line vue/custom-event-name-casing
          this.$emit('closeModalEvent')
        })
    },
    // map
    onLoad(vue) {
      console.log('onLoad!!')
      console.log(this.mapOptions)
      this.map = vue
    },
    onWindowLoad(that) {
      console.log('onWindowLoad !!')
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker
      this.marker.setDraggable(false)
    },
    updateMapStatus() {
      // this.map.setOptions({ lat: this.storeInfo.lat, lng: this.storeInfo.lng })
      this.map.setCenter(this.storeInfo.lat, this.storeInfo.lng)
      this.marker.setPosition(this.storeInfo.lat, this.storeInfo.lng)
      this.map.setZoom(16, true)
      this.map.setZoom(17, true)
    },
  },
}
</script>

<style scoped>
</style>
