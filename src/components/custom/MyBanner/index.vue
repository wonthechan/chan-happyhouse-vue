<template>
  <div>
    <b-jumbotron img src="@/img/banners/banner1.jpg" style="background-image: src('@/img/banners/banner1.jpg');background-size: cover;" >
      <h1 slot="header" class="font-size-60 font-weight-light" align="center" style="margin-top:50px;margin-bottom:40px;">
        <strong>아파트 / 주택을 검색하세요 ! <img src="https://img.icons8.com/cotton/64/000000/cottage.png"/></strong>
      </h1>
       <br /><br />
       <div>
                    <!-- 선택옵션 -->
                  <a-select size="large" class="font-weight-bold list-unstyled mr-3" :value="searchField" style="width: 150px;font-size:20px;color:#96939c;" v-model="searchField">
                    <a-select-option  value="aptName">아파트 이름</a-select-option >
                    <a-select-option   value="dong">동 이름</a-select-option >
                  </a-select>
                    <!-- 입력창 -->
                    <a-input placeholder="원하시는 지역명, 아파트명을 입력해주세요" class="font-weight-bold list-unstyled mr-3" style="width: 700px;height:70px;font-size:20px;padding-left:16px;" enter-button="Search" v-model="searchText">

                    </a-input>
                    <!-- 버튼 클릭 -->
                    <a-button class="font-weight-bold list-unstyled" style="height:70px; font-size:20px;" type="primary" id="registerArea" @click="passInput();">
                      찾기
                      </a-button>
                      </div> <br /><br /><div style="margin-bottom:10px;"></div>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchField: '선택',
      searchText: '',
    }
  },
  methods: {
    passInput() {
      var payload = { searchField: this.searchField, searchText: this.searchText }
      this.$emit('searchpass', payload)
    },

  },
}
</script>
