import googleMapFactory from '@/js/map.js'

function install (Vue, options) {
  const { apiKey } = options

  const googleMap = googleMapFactory(apiKey)

  Vue.component('googleMap', googleMap)
}

export default install
