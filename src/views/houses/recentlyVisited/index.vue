<template>
    <div class="row">
      <div class="col-lg-4" v-for="(item, index) in aptlist" :key="index">
        <cui-general-16
          :isFavorite="true"
          :no="item.no"
          :name="item.aptName"
          :price="item.dealAmount"
          :src='"item.img"'
          :dong="item.dong"
          :area="item.area"
        />
      </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'
import CuiGeneral16 from '@/views/houses/recentlyVisited/kit/index'

export default {
  name: 'RecentlyVisited',
  components: {
    CuiGeneral16,
  },
  props: {
    no: { type: Number },
  },
  data: function () {
    return {
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      aptlist: [],
    }
  },
  mounted() {
    http.get(`/houses/visited/${this.uid}`)
      .then(({ data }) => {
        this.aptlist = data
      })
  },
}
</script>
<style lang="scss" module>
@import "./style.module.scss";
</style>
