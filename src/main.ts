import { createApp } from "vue"
import App from "~/App.vue"

// general setup
import store from '~/setup/setup-store'
import setupBasic from '~/setup/setup-basic'
import setupAxios from '~/setup/setup-axios'
import setupI18n from '~/setup/setup-i18n'

// app store
import StorePost from '~/store/Post/list.js'

// app register store module
store.registerModule('post', StorePost)

const app = createApp(App)

app.use(store)
app.use(setupI18n)

setupBasic(app)
setupAxios(app)

app.mount("#app")
