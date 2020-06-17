<template>
  <div id="app">
    <localization></localization>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Localization from '@/localization'

export default {
  name: 'app',
  components: { Localization },
  computed: {
    ...mapState(['settings']),
    ...mapState('user', ['authorized']),
    nextRoute() {
      return this.$route.query.redirect || '/'
    },
    currentRoute() {
      return this.$route.path
    },
  },
  mounted() {
    this.$store.dispatch('user/LOAD_CURRENT_ACCOUNT') // 현재 사용자의 계정 정보 불러와서 store의 state에 저장
    this.$store.commit('SET_PRIMARY_COLOR', { color: this.settings.primaryColor })
    this.$store.commit('SET_THEME', { theme: this.settings.theme })
  },
  watch: {
    '$store.state.settings.theme'(theme) { // 필요 없음
      this.$store.commit('SET_THEME', { theme })
    },
    authorized(authorized) {
      if (authorized && this.currentRoute === '/auth/login') {
        this.$router.replace(this.nextRoute)
      }
    },
    '$route'(to, from) {
      const query = Object.assign({}, to.query)
      this.$store.commit('SETUP_URL_SETTINGS', query)
    },
  },
}
</script>
