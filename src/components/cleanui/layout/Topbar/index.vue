<template>
  <div :class="$style.topbar">
    <div class="mr-4">
      <!-- 로고 클릭 시 메인 페이지로 이동 -->
      <a href="/main">
        <a-icon style="font-size: 25px;" class="mr-2" type="home" />
        <span style="font-size: 25px;" class="font-weight-bold">Happy House</span>
        <span class="font-weight-bold ml-2 mr-2">X</span>
        <img src="@/img/logo1.png" width="25px">
        <span class="font-weight-bold ml-2 mr-2">powered by vue.js</span>
      </a>
    </div>
    <div class="mr-auto">
    </div>
    <a-menu :mode="'horizontal'" :selectedKeys="selectedKeys" @click="handleClick">
      <template v-for="item in menuData">
        <template v-if="true || !item.roles || item.roles.includes(user.role)">
          <item
            v-if="!item.children && !item.category"
            :menu-info="item"
            :styles="$style"
            :key="item.key"
          />
          <sub-menu v-if="item.children" :menu-info="item" :styles="$style" :key="item.key" />
        </template>
      </template>
    </a-menu>
    <div>
      <cui-user-menu />
    </div>
  </div>
</template>

<script>
import CuiUserMenu from './UserMenu'

// MenuTop 관련
import store from 'store'
import { getMenuData } from '@/services/menu2'
import SubMenu from './partials/submenu'
import Item from './partials/item'

export default {
  components: {
    CuiUserMenu,
    SubMenu, // MenuTop
    Item,
  },
  data() {
    return {
      menuData: getMenuData,
      selectedKeys: [],
    }
  },
  watch: {
    '$route'() {
      this.setSelectedKeys()
    },
  },
  methods: {
    handleClick(e) {
      if (e.key === 'settings') {
        this.$store.commit('CHANGE_SETTING', { setting: 'isSettingsOpen', value: true })
        return
      }
      store.set('app.menu.selectedKeys', [e.key])
      this.selectedKeys = [e.key]
    },
    setSelectedKeys() {
      const pathname = this.$route.path
      const menuData = this.menuData.concat()
      const flattenItems = (items, key) =>
        items.reduce((flattenedItems, item) => {
          flattenedItems.push(item)
          if (Array.isArray(item[key])) {
            return flattenedItems.concat(flattenItems(item[key], key))
          }
          return flattenedItems
        }, [])
      const selectedItem = find(flattenItems(menuData, 'children'), [
        'url',
        pathname,
      ])
      this.selectedKeys = selectedItem ? [selectedItem.key] : []
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
