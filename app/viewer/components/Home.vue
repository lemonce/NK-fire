<template>
<div id="index">

	<header>
		<h1 id="title">南开消防支队党组织生活公开平台</h1>
	</header>

	<main class="container-fluid" id="system">

		<div class="row" id="password">
			<div class="col-sm-4 col-sm-offset-4">
				<div class="input-group">
					<input type="password"
						class="form-control"
						v-model="password"
						title="请输入密码"
						required
						autofocus>
					<span class="input-group-btn">
						<button class="btn btn-info"
							:disabled="password === ''"
							@click.prevent="login()"
							>进入</button>
					</span>
				</div>
			</div>
			<div class="col-sm-2">
				<h3 style="text-align:left; margin:5px 0; color: yellow">{{message}}</h3>
			</div>
		</div>
		<keyboard
			v-model="password"
			@input="changed"
			layouts="1234567890{Backspace:backspace}|qwertyuiop|asdfghjkl|zxcvbnm"
			:maxlength="100"
		></keyboard>
	</main>
</div>
</template>

<script>
import axios from 'axios';
import keyboard from 'vue-keyboard';
import background from '../background.js';

export default {
	name: 'app',
	components: { keyboard },
	data() {
		return {
			password: '',
			message: ''
		}
	},
	methods: {
		changed(value) {
			this.password = value;

			console.log('Value ' + value);
		},
		login() {
			axios.post('/api/login', {
				password: this.password
			}).then( response => {
				this.$router.push('/config');
			}).catch( err => {
				console.log(err.response.status);
				if ( err.response.status === 401 ) {
					return this.message = '密码错误！'
				}

				return this.message = '系统错误'
			})
		}
	},
}
</script>

<style lang="less">
#index {
	position: absolute;
	width: 100%;
	top: 50%;
	transform: translateY(-50%);
	text-align: center;

}
#index #system .vue-keyboard-key {
	min-width: 100px;
	font-size: 4rem;
}                                                      
#title {
	margin-bottom: 100px;
	font-size: 60px;
	transform: translateY(-50%);
	cursor: pointer;
	-webkit-transition: color .2s ease-in-out;
	transition: color .2s ease-in-out;
	-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
			user-select: none;
	mix-blend-mode: overlay;
	color: rgba(0, 0, 0, 0.3);

	&:hover {
		color: rgba(0, 0, 0, 0.8);
	}
}
#system {
	padding: 30px;

	#password {
		margin-bottom: 30px;
	}
}
</style>
