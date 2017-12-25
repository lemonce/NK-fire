import axios from 'axios';

export default function initControler() {
	const preview = document.getElementById('preview').contentWindow;

	let mousedownPool;
	let watcherId;

	function initMousedownPool() {
		mousedownPool = {
			topLeftCorner: false,
			topRightCorner: false,
			lowerLeftCorner: false,
			lowerRightCorner: false
		};

		return initMousedownPool;
	}

	initMousedownPool();

	preview.addEventListener('mousedown', event => {
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

		clearTimeout(watcherId);
		watcherId = setTimeout(initMousedownPool, 10000);

		console.log(mousedownPool);

		if (
			mousedownPool.topLeftCorner &&
        mousedownPool.lowerLeftCorner &&
        mousedownPool.topRightCorner &&
        mousedownPool.lowerRightCorner
		) {
			axios.delete('/api/win/fullscreen');
			initMousedownPool();
		}
	});
}

