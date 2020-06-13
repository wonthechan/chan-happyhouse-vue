<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="공지사항"
          :breadcrumb="{ props: { routes } }"
          sub-title="해피하우스 공지사항 게시판 입니다."
        />
        <!-- <div class="cui__utils__heading">
          <h5 class="font-weight-bold mb-2">고객지원</h5>
          <a-icon class="font-size-40" type="bulb" />
          <span class="font-size-40 font-weight-bold mb-2">공지사항</span>
        </div> -->
      </div>
      <div class="col-lg-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routes: [
        {
          path: '',
          breadcrumbName: 'Home',
        },
        {
          path: '',
          breadcrumbName: '고객지원',
        },
        {
          path: '',
          breadcrumbName: '공지사항',
        },
      ],
    }
  },
  mounted() {
    this.$router.push('/help/notices/list')
  },
}
</script>

<style>
</style>
