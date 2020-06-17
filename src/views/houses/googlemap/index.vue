<template>
<div>
<google-map class="googleMap" @click="addMarker">
      <div slot-scope="{ google, map }">
        <google-map-marker
          v-for="(marker, index) in markers"
          :google="google"
          :map="map"
          :key="index"
          :position="marker.position"
          :info="marker.info"
          @click="panTo($event, map)"
        >
        </google-map-marker>
      </div>
    </google-map>
</div>
</template>

<script>
export default {
  name: 'googlemap',
  props: [
    'maplist',
  ],
  data () {
    return {
      markers: [],
      center: {},
    }
  },
  created() {
    console.log(this.maplist)
    for (var i = 0; i < this.maplist.length; i++) {
      var lat = Number(this.maplist[i].lat)
      var lng = Number(this.maplist[i].lng)
      this.markers.push({
        position: {
          lat, lng,
        },
        info: this.maplist[i], // 매물정보도 함께 넘겨줌 (인포윈도우에서 쓸 정보)
      })
    }
  },
  methods: {
    addMarker (e) {
    },
    panTo (e, map) {
      map.panTo(e.latLng)
      // 원래 줌 수준에서 2 이상 확대하려는 경우 끊김,,
      // 그래서 마커를 클릭할 때마다 2만큼 확대되도록 함
      map.setZoom(map.getZoom() + 2)
    },
  },
}
</script>
<style>
  .googleMap {
    height:1000px
  }
</style>
