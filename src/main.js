import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VeLine from "v-charts/lib/line.common";
import VeMap from "v-charts/lib/map.common";
import VeBar from "v-charts/lib/bar.common";
// The following dependencies can be selectively loaded on demand
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markArea";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/title";
import "zrender/lib/svg/svg";
import "v-charts/lib/style.css";

[VeLine, VeMap, VeBar].forEach(comp => {
  Vue.component(comp.name, comp);
});
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
