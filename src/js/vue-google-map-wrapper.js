import googleMapFactory from '@/js/map.js'
import googleMapMarker from '@/js/marker'
import googleMapCustomControl from '@/js/custom-control'
function install (Vue, options) {
  const { apiKey } = options

  const googleMap = googleMapFactory(apiKey)

  const components = {
    googleMap,
    googleMapMarker,
    googleMapCustomControl,
  }

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component)
  })
}

export default install
