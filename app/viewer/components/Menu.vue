<template>
<div id="menu" class="container-fluid">
	<div class="panel panel-default config-panel">
		<div class="panel-heading">
			版式
		</div>
		<div class="panel-body">
			<p>路径：{{filePath}}</p>
			<a class="btn btn-info pull-right"
				@click="getPath()">选择文件</a>
		</div>
	</div>

	<div class="panel panel-default config-panel" hidden>
		<div class="panel-heading">
			数据源
		</div>
		<div class="panel-body">
			<p></p>
			<a class="btn btn-info pull-right">选择文件</a>
		</div>
	</div>

	<div class="row">
		<div class="col-sm-12">
			<a class="btn btn-success confirm-btn"
				@click="confirm()">开始展示</a>

		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

const reqPath = '/api/config/';

export default {
	name: 'app-menu',
	data() {
		return {
			filePath: '',
		}
	},
	methods: {
		getPath() {
			axios.get(`${reqPath}previewPath`).then(({data}) => {
				this.filePath = data;
				this.$emit('refresh');
			});
		},
		confirm() {
			return axios.post('/api/win/fullscreen');
		}
	},
	mounted() {
		axios.get(`${reqPath}staticPath`).then(({data}) => {
			this.filePath = data;
		});
	}
}
</script>

<style lang="less">
.panel.config-panel {
	margin-top: 20px;

	.panel-body p {
		word-break: break-all;
	}
}
.confirm-btn {
	width: 100%;
	display: inline-block;
}
</style>
