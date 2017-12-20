<template>
<div id="workbench">
	<div id="menu-container">
		<app-menu></app-menu>

	</div>
	<div id="view-container">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
import AppMenu from './Menu.vue';

export default {
	name: 'app',
	components: { AppMenu }
}
</script>

<style lang="less">
#workbench {
	width: 100%;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	overflow: hidden;
	#menu-container {
		width: 300px;
		background: aliceblue;
		position: absolute;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	#view-container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 300px;
		overflow: hidden;
	}
}
</style>
