<template>
<div id="workbench">
	<div id="menu-container">
		<app-menu @refresh="reShow()" @setFullscreen="setFull()"></app-menu>

	</div>
	<div id="view-container">
		<iframe id="preview" src="http://localhost:8888/" frameborder="0" @load="aoeu()"></iframe>
	</div>
</div>
</template>

<script>
import AppMenu from "./Menu.vue";
import axios from "axios";
import fullscreenControl from "../fullsrceenControl";

export default {
  name: "home",
  components: { AppMenu },
  methods: {
    reShow() {
      document.getElementById("preview").contentWindow.location.reload();
    },
    setFull() {
      document.querySelector("#menu-container").setAttribute("hidden", true);
      document.querySelector("#view-container").style.left = 0;
      return axios.post("/api/win/fullscreen");
    },
    aoeu() {
      fullscreenControl();
    }
  }
};
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
    background: #fff;
  }
}
#preview {
  width: 100%;
  height: 100%;
  display: inline-flex;
}
</style>