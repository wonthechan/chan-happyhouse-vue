<template>
  <a-dropdown class="ml-4" :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-badge>
        <a-avatar shape="square" icon="user" size="large" :class="$style.avatar" />
      </a-badge>
    </div>
    <a-menu slot="overlay">
      <a-menu-item>
        <div>
          <strong>{{ $t('topBar.profileMenu.hello') }}, {{ user.name || 'Anonymous' }}</strong>
        </div>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);">
          <i class="fe fe-user mr-2"></i>
          정보 수정
        </a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);" @click="logout">
          <i class="fe fe-log-out mr-2"></i>
          로그 아웃
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      count: 7,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/LOGOUT')
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
