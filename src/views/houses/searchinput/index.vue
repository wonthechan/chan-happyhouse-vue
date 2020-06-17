<template>
  <div>
    <b-jumbotron style="background-image: url(https://cdn.hipwallpaper.com/i/83/87/4nDiwY.jpg);background-size: cover;" >
      <h1 slot="header" class="font-weight-bold text-white font-size-50 list-unstyled mr-3" align="center" style="padding-top:50px;margin-bottom:40px;">
        <strong>아파트 / 주택을 검색하세요 ! <img style="margin-bottom:15px;" src="https://img.icons8.com/cotton/64/000000/cottage.png"/></strong>
      </h1>
       <br /><br />
       <div align="center">
                    <!-- 선택옵션 -->
                  <a-select size="large" class="font-weight-bold list-unstyled mr-3" :value="searchField" style="width: 150px;font-size:20px;color:#96939c;" v-model="searchField">
                    <a-select-option  value="aptName">아파트 이름</a-select-option >
                    <a-select-option   value="dong">동 이름</a-select-option >
                  </a-select>
                    <!-- 입력창 -->
                    <a-input placeholder="원하시는 아파트명 또는 지역명을 입력해주세요 :)" class="font-weight-bold list-unstyled mr-3" style="width: 700px;height:70px;font-size:20px;padding-left:16px;" enter-button="Search" v-model="searchText">

                    </a-input>
                    <!-- 버튼 클릭 -->
                    <a-button class="font-weight-bold list-unstyled mr-3" style="height:70px; font-size:20px;" type="primary" id="registerArea" @click="passInput('search');">
                      찾기
                      </a-button>
                      <a-button class="font-weight-bold list-unstyled" style="height:70px; font-size:20px;" type="primary" id="registerArea" @click="passInput('chart');">
                     통계 보기
                     </a-button>
                      </div> <br /><br /><div style="margin-bottom:10px;"></div>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchField: 'aptName',
      searchText: '',
    }
  },
  methods: {
    passInput(value) {
      if (value === 'search') {
        var payload = { searchField: this.searchField, searchText: this.searchText }
        this.$emit('searchpass', payload)
      } else {
        this.$emit('searchpass', 'chart')
      }
    },
  },
}
</script>
