<template>
  <a-layout>
    <a-layout-content>
      <div
        :class="{
          [$style.container]: true,
          cui__layout__squaredBorders: settings.isSquaredBorders,
          cui__layout__cardsShadow: settings.isCardShadow,
          cui__layout__borderless: settings.isBorderless,
          [$style.white]: settings.authPagesColor === 'white',
          [$style.gray]: settings.authPagesColor === 'gray',
        }"
        :style="{backgroundImage: settings.authPagesColor === 'image' ? `url(resources/images/content/photos/7.jpg)` : 'none'}"
      >
        <div
          :class="{
          [$style.topbar]: true,
          [$style.topbarGray]: settings.isGrayTopbar,
        }"
        >
          <div class="mr-4">
            <a-icon style="font-size: 25px;" class="mr-2" type="home" />
            <span style="font-size: 25px;" class="font-weight-bold">Happy House</span>
          </div>
          <div class="d-none d-sm-block">
            <span class="mr-2">계정이 없으신가요?</span>
            <router-link to="/auth/register" class="font-size-16 kit__utils__link">회원가입</router-link>
          </div>
        </div>
        <div :class="$style.containerInner">
          <transition :name="settings.routerAnimation" mode="out-in">
            <router-view />
          </transition>
        </div>
        <div class="mt-auto pb-5 pt-5">
          <ul
            class="list-unstyled d-flex mb-0 flex-wrap justify-content-center"
            :class="[$style.footerNav]"
          >
            <li class="list-inline-item">
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li class="active list-inline-item">
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);">Confidential Information</a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);">Support</a>
            </li>
            <li class="list-inline-item">
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
          <div class="text-center">
            Spring Semester Final Web Project @ <a href="https://www.ssafy.com" target="_blank">SSAFY</a>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthLayout',
  computed: mapState(['settings']),
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
