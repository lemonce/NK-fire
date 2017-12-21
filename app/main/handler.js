const handlePool = {};

exports.define = function (id, handle) {
	handlePool[id] = handle;
};

exports.get = function (id) {
	return handlePool[id];
};