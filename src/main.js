import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Radio } from 'vue-strap'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  components: {
    Radio
  },
  render: h => h(App)
}).$mount('#app')
