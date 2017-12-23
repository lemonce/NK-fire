'use strict';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.less';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);

import App from './components/App.vue';

import routes from './router.js';

const router = new VueRouter({ routes });

const app = new Vue(
	Object.assign({router}, App)
).$mount('#app');

let mousedownPool;

function initMousedownPool() {
	mousedownPool = {
		topLeftCorner: false,
		topRightCorner: false,
		lowerLeftCorner: false,
		lowerRightCorner: false
	};

	return initMousedownPool;
}

setInterval(initMousedownPool(), 10000);

document.body.addEventListener('mousedown', event => {
	const { screenX: x, screenY: y } = event;
	console.log(x, y);
	console.log(screen.height, screen.width);

	const { height, width } = screen;
	const lowerY = height - 200;
	const lowerX = width - 200;

	if (x < 200) {
		if (y < 200) {
			mousedownPool.topLeftCorner = true;
		} else if (y > lowerY) {
			mousedownPool.lowerLeftCorner = true;
		}
	} else if (x > lowerX) {
		if (y < 200) {
			mousedownPool.topRightCorner = true;
		} else if (y > lowerY) {
			mousedownPool.lowerRightCorner = true;
		}
	} else {
		initMousedownPool();
	}

	console.log(mousedownPool);

	if (
		mousedownPool.topLeftCorner
		&& mousedownPool.lowerLeftCorner
		&& mousedownPool.topRightCorner
		&& mousedownPool.lowerRightCorner
	) {
		axios.delete('/api/win/fullscreen');
		initMousedownPool();
	}
});