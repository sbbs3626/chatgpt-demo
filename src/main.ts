import './utils/system.copyright'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import App from './App.vue'
import pinia from './store'
import router from './router'
// 加载 svg 图标
import 'virtual:svg-icons-register'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'

// uno.css
import 'virtual:uno.css'
// 全局样式
import '@/assets/styles/globals.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
// 引入代码高亮，并进行全局注册
app.use(hljsVuePlugin)
app.mount('#app')
