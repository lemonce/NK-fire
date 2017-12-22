const handlePool = {};

exports.define = function (id, handle) {
	handlePool[id] = handle;
};

exports.call = function (id, ...args) {
	return handlePool[id](...args);
};