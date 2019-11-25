import Vue from "vue"

Vue.component('Icon', () => import("../components/common/Icon-wrap.vue"))
Vue.component('AppTitle', () => import("../components/common/AppTitle.vue"))
Vue.component('ToolBar', () => import("../components/common/Toolbar.vue"))
Vue.component('ContentWrap', () => import("../components/common/ContentWrap.vue"))
Vue.component('List', () => import("../components/common/List.vue"))
Vue.component('Rate', () => import("../components/common/Rate.vue"))
Vue.component('Scroll', () => import("../components/common/Scroll.vue"))