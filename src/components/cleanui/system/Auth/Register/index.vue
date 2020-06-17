<template>
  <div>
   <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-4">
        <strong>회원가입</strong>
      </div>
      <a-form class="mb-4" :form="form"  @submit="findPw">
        <a-form-item>
          <i class="fa fa-envelope-o fa-fw"></i> ID
          <a-input
            size="large"
            placeholder="ex) ssafy  /  ssafy123"
            v-model="id"
          />
        </a-form-item>
         <a-form-item>
           <i class="fa fa-user fa-fw"></i> Password
          <a-input
            size="large"
            placeholder="ex) 영문대소문자 + 숫자"
            v-model="password"
          />
        </a-form-item>
         <a-form-item>
           <i class="fa fa-user fa-fw"></i> Name
          <a-input
            size="large"
            placeholder="ex) 김싸피"
            v-model="name"
          />
        </a-form-item>
         <a-form-item>
           <i class="fa fa-user fa-fw"></i> Address
          <a-input
            size="large"
            placeholder="ex) 역삼 멀티캠퍼스"
            v-model="address"
          />
        </a-form-item>
         <a-form-item>
           <i class="fa fa-user fa-fw"></i> Phone Number
          <a-input
            size="large"
            placeholder="ex) 010-1234-5678"
           v-model="phone"
          />
        </a-form-item><br /><br />
        <a-button @click="join();" htmlType="submit" size="large" type="primary" class="text-center w-100">
          <strong>회원가입</strong>
        </a-button>
      </a-form><br />
      <router-link to="/auth/login" class="kit__utils__link font-size-16">
        <i class="fe fe-arrow-left mr-1 align-middle" />
        로그인
      </router-link>
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
      id: '',
      name: '',
      password: '',
      phone: '',
      address: '',
    }
  },
  methods: {
    join() {
      alert(this.id)
      var values = { id: this.id, password: this.password, address: this.address, name: this.name, phone: this.phone }
      this.$store.dispatch('user/REGISTER', { payload: values })
    },
  },
}
</script>
<style lang="scss" module>
@import "@/components/cleanui/system/Auth/style.module.scss";
</style>
