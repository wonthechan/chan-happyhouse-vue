/* eslint-disable handle-callback-err */
/* eslint-disable handle-callback-err */
/* eslint-disable handle-callback-err */
<template>
  <div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-4">
        <strong>Find Password</strong>
      </div>
      <a-form class="mb-4" :form="form"  @submit="findPw">
        <a-form-item>
          <i class="fa fa-envelope-o fa-fw"></i> ID
          <a-input
            size="large"
            placeholder="ex) ssafy  /  ssafy@ssafy.com"
            v-decorator="['email', {rules: [{ required: true, message: 'Please input your Id' }]}]"
          />
        </a-form-item>
         <a-form-item>
           <i class="fa fa-user fa-fw"></i> Name
          <a-input
            size="large"
            placeholder="ex) 김싸피"
            v-decorator="['name', {rules: [{ required: true, message: 'Please input your name' }]}]"
          />
        </a-form-item>
        <a-button htmlType="submit" size="large" type="primary" class="text-center w-100">
          <strong>Find my password</strong>
        </a-button>
      </a-form>
      <router-link to="/auth/login" class="kit__utils__link font-size-16">
        <i class="fe fe-arrow-left mr-1 align-middle" />
        Go to Sign in
      </router-link>
    </div>
  </div>
</template>
<script>

import http from '@/util/http-common.js'

export default {
  name: 'CuiForgotPassword',
  data: function () {
    return {
      form: this.$form.createForm(this),
      password: '',
    }
  },
  methods: {
    findPw(e) {
      e.preventDefault()
      // eslint-disable-next-line handle-callback-err
      this.form.validateFields((err, values) => {
        http
          .get('/users/' + values.email + '/' + values.name, {
          })
          .then(({ data }) => {
            if (data.length === 0) { alert('일치하는 정보가 없습니다.') } else {
              alert('비밀번호는 '.concat(data).concat(' 입니다.'))
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            // eslint-disable-next-line no-undef
            console.log(data)
            alert('조회 중 문제가 발생하였습니다.')
          })
      })
    },

  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>
