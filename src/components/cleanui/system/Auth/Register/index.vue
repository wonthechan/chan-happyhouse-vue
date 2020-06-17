<template>
  <div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-4">
        <strong>환영합니다!</strong>
      </div>
      <div class="mb-4">

      </div>
      <a-form class="mb-4" :form="form" @submit="handleSubmit">

        <a-form-item>
          <a-input
            size="large"
            placeholder="아이디"
            v-decorator="['id', {rules: [{ required: true, message: '아이디를 입력해주세요!' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            placeholder="비밀번호"
            v-decorator="['password', {rules: [{ required: true, message: '비밀번호를 입력해주세요!' }]}]"
          />
        </a-form-item>

 <a-form-item>
          <a-input
            size="large"
            placeholder="닉네임"
            v-decorator="['name', {rules: [{ required: true, message: '닉네임을 입력해주세요!' }]}]"
          />
        </a-form-item>

         <a-form-item>
          <a-input
            size="large"
            placeholder="주소"
            v-decorator="['address', {rules: [{ required: true, message: '주소를 입력해주세요!' }]}]"
          />
        </a-form-item>

         <a-form-item>
          <a-input
            size="large"
            placeholder="연락처"
            v-decorator="['phone', {rules: [{ required: true, message: '연락처를 입력해주세요!' }]}]"
          />
        </a-form-item>

        <a-button
          type="primary"
          size="large"
          class="text-center w-100"
          :loading="loading"
          htmlType="submit"
        >
          <strong>회원 가입</strong>
        </a-button>
      </a-form>
      <div>
        <span class="mr-1">By signing up, you agree to the</span>
        <a href="javascript: void(0);" class="kit__utils__link">Terms of Service</a> and
        <a href="javascript: void(0);" class="kit__utils__link">Privacy Policy</a>
      </div>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">이미 계정이 있으신가요?</span>
      <router-link to="/auth/login" class="kit__utils__link font-size-16">로그인</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CuiRegister',
  computed: {
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('user/REGISTER', { payload: values })
        }
      })
    },
  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>
