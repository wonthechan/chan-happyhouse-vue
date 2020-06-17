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
          @click="panTo($event, map, google, marker)"
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
    for (var i = 0; i < this.maplist.length; i++) {
      var lat = Number(this.maplist[i].lat)
      var lng = Number(this.maplist[i].lng)
      this.markers.push({
        position: {
          lat, lng,
        },
      })
    }
  },
  methods: {
    addMarker (e) {
      // const { lat, lng } = e.latLng.toJSON()
      // this.markers.push({
      //   position: {
      //     lat, lng,
      //   },
      // })
    },
    panTo (e, map, google, marker) {
      map.panTo(e.latLng)
      // 원래 줌 수준에서 2 이상 확대하려는 경우 끊김,,
      // 그래서 마커를 클릭할 때마다 2만큼 확대되도록 함
      map.setZoom(map.getZoom() + 2)
      console.log(google)
      console.log(marker)
      // info window
      // var infowindow = new google.maps.InfoWindow({
      //   content: 'Latitude: ' + '123' + '<br>Longitude: ' + '32',
      // })
      // infowindow.open(map, marker)
    },
  },
}
</script>
<style>
  .googleMap {
    height:1000px
  }
</style>
