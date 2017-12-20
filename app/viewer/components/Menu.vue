<template>
<div id="menu">
	<a :href="fileName">{{fileName}}</a>
	<a href="javascript:;" class="file-path btn btn-info">选择文件
		<input type="file" id="select-file" @change="getFullPath()">

	</a>
</div>
</template>

<script>
export default {
	name: 'app-menu',
	data() {
		return {
			fileName: ''
		}

	},
	methods: {
		getFullPath() {
			// return this.fileName = document.querySelector('#select-file').value;
			let url;

			if (navigator.userAgent.indexOf('MSIE') >= 1) {
				url = document.querySelector('#select-file').value;
			} else if (navigator.userAgent.indexOf('Firefox') > 0) {
				url = window.URL.createObjectURL(document.querySelector('#select-file').files.item(0));
			} else if (navigator.userAgent.indexOf('Chrome') > 0) {
				url = window.URL.createObjectURL(document.querySelector('#select-file').files.item(0));
			}

			return this.fileName = url;
		}
	}
}
</script>

<style lang="less">
#menu {
	a {
		display: inline-block;
	}
	.file-path {
		position: relative;
		
		input {
			position: absolute;
			right: 0;
			top: 0;
			opacity: 0;
		}
	}
}
</style>
