<template>
  <div :class="{
    'cui__layout__grayBackground': settings.isGrayBackground,
  }">
    <a-layout
      :class="{
      'cui__layout__contentMaxWidth': true,
      'cui__layout__appMaxWidth': settings.isAppMaxWidth,
      'cui__layout__grayBackground': settings.isGrayBackground,
      'cui__layout__squaredBorders': settings.isSquaredBorders,
      'cui__layout__cardsShadow': settings.isCardShadow,
      'cui__layout__borderless': settings.isBorderless,
    }"
    >
      <a-back-top />

      <!-- top menu -->
      <a-layout>
        <a-layout-header
          :class="{
          'cui__layout__header': true,
          'cui__layout__fixedHeader': settings.isTopbarFixed,
          'cui__layout__headerGray': settings.isGrayTopbar,
        }"
        >
          <cui-topbar />
        </a-layout-header>
        <a-layout-content style="height: '100%'; position: 'relative'">
          <div class="cui__utils__content">
            <transition :name="settings.routerAnimation" mode="out-in">
              <router-view />
            </transition>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <cui-footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CuiTopbar from '@/components/cleanui/layout/Topbar'
import CuiFooter from '@/components/cleanui/layout/Footer'

export default {
  name: 'MainLayout',
  components: { CuiFooter, CuiTopbar },
  computed: mapState(['settings']),
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
