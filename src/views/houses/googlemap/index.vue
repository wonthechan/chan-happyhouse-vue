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
</div>
</template>

<script>
export default {
  name: 'googlemap',
  props: {
    maplist: { type: Object },
  },
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
      const { lat, lng } = e.latLng.toJSON()
      this.markers.push({
        position: {
          lat, lng,
        },
      })
    },
    panTo (e, map) {
      map.panTo(e.latLng)
    },
  },
}
</script>
<style>
  .googleMap {
    height:1000px
  }
</style>
