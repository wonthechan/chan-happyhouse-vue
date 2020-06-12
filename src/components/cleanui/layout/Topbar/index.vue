<template>
  <div :class="$style.topbar">
    <div class="mr-4" v-if="false">
      <cui-fav-pages v-if="false"/>
    </div>
    <div class="mr-auto">
      <cui-search v-if="false"/>
    </div>
    <div class="mr-4 d-none d-md-block" v-if="false">
      <cui-issues-history v-if="false"/>
    </div>
    <div class="mb-0 mr-auto d-xl-block d-none" v-if="false">
      <cui-project-management v-if="false"/>
    </div>
    <div class="mr-4 d-none d-sm-block" v-if="false">
      <cui-language-switcher v-if="false"/>
    </div>
    <div class="mr-4 d-none d-sm-block" v-if="false">
      <cui-actions v-if="false"/>
    </div>

    <!-- MenuTop 새로 삽입 -->
    <!-- <div :class="$style.navigation">
    </div> -->
    <a-menu :mode="'horizontal'" :selectedKeys="selectedKeys" @click="handleClick">
      <template v-for="item in menuData">
        <template v-if="!item.roles || item.roles.includes(user.role)">
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
import CuiIssuesHistory from './IssuesHistory'
import CuiProjectManagement from './ProjectManagement'
import CuiSearch from './Search'
import CuiLanguageSwitcher from './LanguageSwitcher'
import CuiActions from './Actions'
import CuiUserMenu from './UserMenu'
import CuiFavPages from './FavPages'

// MenuTop 관련
import store from 'store'
import { getMenuData } from '@/services/menu2'
import SubMenu from './partials/submenu'
import Item from './partials/item'

export default {
  components: {
    CuiIssuesHistory,
    CuiProjectManagement,
    CuiSearch,
    CuiLanguageSwitcher,
    CuiActions,
    CuiUserMenu,
    CuiFavPages,
    SubMenu, // MenuTop
    Item,
  },
  data() {
    return {
      menuData: getMenuData,
      selectedKeys: [],
      openKeys: [],
    }
  },
  watch: {
    'settings.isMenuCollapsed'() {
      this.openKeys = []
    },
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
