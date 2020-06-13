<template>
  <div>
    <div class="text-center mb-5">
      <h1 class="mb-5">
        <strong>Welcome to {{ settings.logo }}</strong>
      </h1>
      <p>
        Credentials for testing purposes -
        <strong>demo@sellpixels.com</strong> /
        <strong>demo123</strong>
      </p>
    </div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-3">
        <strong>로그인</strong>
      </div>
      <div class="mb-4">
        <a-radio-group
          :value="settings.authProvider"
          @change="e => changeAuthProvider(e.target.value)"
        >
          <a-radio value="firebase">Firebase</a-radio>
          <a-radio value="jwt">JWT</a-radio>
        </a-radio-group>
      </div>
      <a-form class="mb-4" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            placeholder="Email"
            v-decorator="['email', { initialValue: 'demo@sellpixels.com', rules: [{ required: true, message: '아이디를 입력해주세요!' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="Password"
            type="password"
            v-decorator="['password', {initialValue: 'demo123', rules: [{ required: true, message: '비밀번호를 입력해주세요!' }]}]"
          />
        </a-form-item>
        <a-button
          type="primary"
          htmlType="submit"
          size="large"
          class="text-center w-100"
          :loading="loading"
        >
          <strong>로그인</strong>
        </a-button>
      </a-form>
        <a @click.prevent="loginWithKakao()">
          <img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png" width="416px" height="53px">
        </a>
      <router-link to="/auth/forgot-password" class="kit__utils__link font-size-16">비밀번호 찾기</router-link>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">아직 회원이 아니세요?</span>
      <router-link to="/auth/register" class="kit__utils__link font-size-16">이메일로 회원가입</router-link>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'CuiLogin',
  components: {
  },
  computed: {
    ...mapState(['settings']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  created() {
    this.changeAuthProvider('firebase')
  },
  methods: {
    onSuccessLogin(authObj) {
      console.log('success')
      this.changeAuthProvider('kakao')
      this.$store.dispatch('user/KAKAO_LOGIN', { payload: authObj })
    },
    onFailureLogin(data) {
      console.log('failure')
      console.log(data)
    },
    loginWithKakao() {
      if (!window.Kakao.Auth.getAccessToken()) { // 사용자 토근이 만료된 경우 (로그아웃된 경우)
        window.Kakao.Auth.loginForm({
          success: (authObj) => {
            this.onSuccessLogin(authObj) // 카카오 로그인 성공 콜백
          },
          fail: (err) => {
            this.onFailureLogin(err)
          },
        })
      } else { // 사용자 토근이 존재하는 경우 (바로 로그인)
        window.Kakao.Auth.login({
          success: (response) => {
            this.onSuccessLogin(response) // 카카오 로그인 성공 콜백
          },
          fail: (error) => {
            this.onFailureLogin(error)
          },
        })
      }
    },
    changeAuthProvider(value) {
      this.$store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('user/LOGIN', { payload: values })
        }
      })
    },
  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>
