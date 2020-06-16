<template>
  <div class="card overflow-hidden">
    <div v-if="isNew" :class="$style.new">
      New
    </div>
    <div class="card-body">
      <a
        href="#"
        v-on:click="toggleFavorite"
        :class="[$style.favorite, favorite ? 'text-red' : 'text-gray-3']"
      >
        <i class="fe fe-heart font-size-21"></i>
      </a>
      <div :class="$style.image" class="border-bottom height-250 mb-3">
        <img class="img-fluid" :src="require(`@/img/apt/${src}`)"
 :alt="name" />
      </div>
      <a href="javascript:void(0);" class="font-size-24 text-dark">
          {{name}}
        </a>
      <div class="font-size-15 text-blue mb-2 mt-1 ">
        서울시 종로구 {{dong}}
        <div v-if="dong" class="font-size-21 text-blue mb-2 ml-1 mt-1">
           {{price}}만 원 / ({{Math.floor(area/3)}} 평)
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KitGeneral16',
  props: ['isNew', 'isFavorite', 'src', 'name', 'price', 'dong', 'area'],
  data: function() {
    return {
      favorite: this.isFavorite,
    }
  },
  methods: {
    toggleFavorite: function (event) {
      event.preventDefault()
      this.favorite = !this.favorite
    },
  },
}
</script>
<style lang="scss" module>
  @import "./style.module.scss";
</style>
