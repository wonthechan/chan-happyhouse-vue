<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="즐겨찾기 한 매물"
          :breadcrumb="{ props: { routes } }"
          sub-title="즐겨찾기 한 매물을 관리할 수 있습니다."
        />
      </div>
      <div class="col-lg-9">
        <div class="card kit__utils__cardMarked kit__utils__cardMarked--primary">
          <div class="card-header">
              <a-icon class="font-size-18 mr-2" type="star" />
              <span class="text-dark font-size-18 font-weight-bold mb-0">즐겨찾기</span>
          </div>
          <div class="card-body">
    <div class="mb-5">
    </div>
         <div class="row e-card-layout">
        <div class="col-sm-4 col-sm-4 col-sm-4 col-sm-4" style="margin-bottom:50px" v-for="(item, index) in aptlist" :key="'item_' + index">

           <div class = "container">
         <a-card style="width: 300px">
           <a @click="deleteInterestHouse(item.no)" slot="extra"><a-icon style="color:red;" type="close-circle" /></a>
              <img @click="aptView(item.no)" v-b-modal.modal-1 class="btn btn-light"
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                slot="cover"
              />
              <a-card-meta :description="item.aptName" style="font-size:30px;">
              </a-card-meta>
              <a-card-meta :description="item.dealAmount" style="font-size:20px;">
              </a-card-meta>
              <br>
               <p> {{item.dong}}  면적 : {{item.area}}  건축 연도 : {{item.buildYear}}</p>
            </a-card>
        </div>
          </div>
       </div>
            <div class="form-inline">
              </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/util/http-common.js'
export default {
  name: 'interestareaManage',
  components: {
  },
  data() {
    return {
      uid: this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf('@')),
      aptlist: [],
      routes: [
        {
          path: '',
          breadcrumbName: 'Home',
        },
        {
          path: '',
          breadcrumbName: '아파트/주택',
        },
        {
          path: '',
          breadcrumbName: '즐겨찾기 한 매물',
        },
      ],
    }
  },
  created() {
    this.findAllInterestHouse()
  },
  methods: {
    deleteInterestHouse(no) {
      http.delete(`/houses/interest/delete/${this.uid}/${no}`)
        .then(({ data }) => {
          if (data === 'success') { this.$message.success('즐겨찾기에서 삭제되었습니다.') } else { this.$message.success('삭제에 실패하였습니다.') }
        })
      this.findAllInterestHouse()
    },
    findAllInterestHouse() {
      http.get(`/houses/interest/${this.uid}`)
        .then(({ data }) => {
          this.aptlist = data
        })
    },

  },
}
</script>
