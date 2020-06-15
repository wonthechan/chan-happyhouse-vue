<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="QnA 게시판"
          :breadcrumb="{ props: { routes } }"
          sub-title="해피하우스 QnA 게시판 입니다."
        />
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
          breadcrumbName: 'QnA',
        },
      ],
    }
  },
  mounted() {
    this.$router.push('/help/qnas/list')
  },
}
</script>

<style>
</style>
