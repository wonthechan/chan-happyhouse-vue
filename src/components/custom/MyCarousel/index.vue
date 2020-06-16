<template>
<a-carousel :autoplay="true">
    <div><img src="@/img/banners/banner1.jpg" /></div>
    <div><img src="@/img/banners/banner2.jpg" /></div>
    <div><img src="@/img/banners/banner3.jpg" /></div>
</a-carousel>
</template>
<script>
export default {
  methods: {
  },
}
</script>
<style scoped>
.ant-carousel >>> .slick-slide {
  height: 300px;
  line-height: 300px;
  overflow: hidden;
}
</style>
