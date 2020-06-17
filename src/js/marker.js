export default {
  props: {
    google: { type: Object, required: true },
    map: { type: Object, required: true },
    position: { type: Object, required: true },
    info: { type: Object, required: true },
  },
  render (h) {
    return h()
  },
  mounted () {
    this.drawMarker()
  },
  destroyed () {
    this.clearMarker()
  },
  data () {
    return {
      marker: null,
      infoWindow: null,
    }
  },
  created() { // 맵의 다른 영역을 클릭했을 시 인포윈도우가 사라지게 함
    this.map.addListener('click', (e) => {
      if (this.infoWindow != null) {
        this.infoWindow.close()
        this.infoWindow = null
      }
    })
  },
  methods: {
    drawMarker () {
      const marker = new this.google.maps.Marker({
        map: this.map,
        position: this.position,
      })
      marker.addListener('click', (e) => {
        if (this.infoWindow == null) { // 인포윈도우 토글이 가능하도록
          this.infoWindow = new this.google.maps.InfoWindow({
            content: `<div class="card" style="width:200px">
                <div class="card-body">
                <h4 class="card-title">${this.info.aptName}</h4>
                <p class="card-text">${this.info.dong}</p>
                </div>
                </div>`,
          })
          this.infoWindow.open(this.map, this.marker)
        } else {
          this.infoWindow.close()
          this.infoWindow = null
        }
        // Zoom 이벤트 실행
        this.$emit('click', e)
      })
      this.marker = marker
    },
    clearMarker () {
      this.marker.setMap(null)
    },
  },
}
