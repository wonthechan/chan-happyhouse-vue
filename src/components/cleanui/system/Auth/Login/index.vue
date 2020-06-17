/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
<template>
  <div>
    <div class="text-center mb-5">
      <h1 class="mb-5">
        <strong>Welcome to {{ settings.logo }}</strong>
      </h1>

    </div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-4">
        <strong>로그인</strong>
      </div>
      <a-form class="mb-4" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            placeholder="Email"
            v-decorator="['email', { initialValue: 'ssafy', rules: [{ required: true, message: '아이디를 입력해주세요!' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="Password"
            type="password"
            v-decorator="['password', {initialValue: 'ssafy', rules: [{ required: true, message: '비밀번호를 입력해주세요!' }]}]"
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
        <button class="kakao_btn font-weight-bold" @click.prevent="loginWithKakao()"><a-icon type="login" /><span class="ml-2">카카오 로그인</span></button>
        <br>
      <router-link to="/auth/forgot-password" class="kit__utils__link font-size-16">비밀번호 찾기</router-link>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">아직 회원이 아니신가요?</span>
      <router-link to="/auth/register" class="kit__utils__link font-size-16">회원가입</router-link>
    </div>
  </div>
</template>
<script>

// eslint-disable-next-line no-unused-vars
import Vuex, * as vuex from 'vuex'
import http from '@/util/http-common.js'
import Vue from 'vue'

export default {
  name: 'CuiLogin',
  components: {
  },
  computed: {
    ...vuex.mapState(['settings']),
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
      // eslint-disable-next-line handle-callback-err
      this.form.validateFields((err, values) => {
        http
          .post('/users/login', {
            uid: values.email,
            upassword: values.password,
          })
          .then(({ data }) => {
            if (data.length !== 0) {
              this.$store.dispatch('user/LOGIN_v2', { payload: data })
            } else {
              Vue.prototype.$notification.error({
                mmessage: '잘못된 비밀번호입니다.',
                description: '로그인에 실패하였습니다.',
              })
            }
          })
      })
    },
  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>

<style scoped>
.kakao_btn {
    display: block;
    width: 100%;
    height: 38px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    font-size: 15px;
    color: #333;
    background-color: #ffe500;
}
</style>
