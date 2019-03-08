import Vue from 'vue';
import iView from 'iview';
import Cookies from "js-cookie";
import util from './js/util.js'
import loadingView from './js/vueExtend/loadingView';
window.util=util;
Vue.use(loadingView);
window.Cookies=Cookies;
export default {};
