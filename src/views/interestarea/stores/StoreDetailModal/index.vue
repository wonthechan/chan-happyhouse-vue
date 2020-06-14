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
        {{ storeInfo.shopName }}
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
  </a-modal>
</template>
<script>
import http from '@/util/http-common.js'

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
      // width: 600,
      // height: 600,
      // info: false,
      // marker: null,
      // count: 1,
      // map: null,
      // isCTT: false,
      // mapOptions: {
      //   lat: 0,
      //   lng: 0,
      //   zoom: 10,
      //   zoomControl: true,
      //   zoomControlOptions: { position: 'TOP_RIGHT' },
      //   mapTypeControl: true,
      // },
      // initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],
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
          this.$emit('closeModalEvent')
        }
      },
    },
  },
  watch: {
    storeNo: function(newVal, oldVal) { // prop 속성 watch 하기, 그리고 정보 업데이트
      if (newVal === -1) return
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
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
            oldAddress: data.jibunaddress,
            newPostCode: data.postcode,
            oldPostCode: data.oldpostcode,
            lat: data.lat.replace(/"/g, ''),
            lng: data.lng.replace(/"/g, ''),
          }
        })
        .catch((data) => {
          console.log(data)
          alert('Opps!! 상점 상세 정보 조회 과정에 문제가 생겼습니다.')
        })
    },
  },
}
</script>
