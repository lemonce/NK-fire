'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.less';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './components/App.vue';

import routes from './router.js';

const router = new VueRouter({ routes });

const app = new Vue(
	Object.assign({router}, App)
).$mount('#app');