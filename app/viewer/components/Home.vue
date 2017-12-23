<template>
<div id="index">

	<header>
		<h1 id="title">南开消防支队党组织生活公开平台</h1>
	</header>

	<main class="container-fluid" id="system">

		<div class="row" id="password">
			<div class="col-sm-4 col-sm-offset-4">
				<div class="input-group input-group-lg">
					<input type="password"
						class="form-control"
						v-model="password"
						title="请输入密码"
						required
						autofocus>
					<span class="input-group-btn">
						<button class="btn btn-warning"
							:disabled="password === ''"
							@click.prevent="login()"
							>进入</button>
					</span>
				</div>
			</div>
			<div class="col-sm-2">
				<p class="error-message">{{message}}</p>
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
			this.message = '';
			this.password = value;
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

	#system .vue-keyboard-key {
		min-width: 100px;
		font-size: 4rem;
	}  
}                                              
#title {
	margin-bottom: 1rem;
	font-size: 7rem;
	transform: translateY(-50%);
	color: rgba(255, 255, 255, 0.6);
}
#system {
	padding: 30px;

	#password {
		margin-bottom: 30px;

		.error-message {
			margin: 0;
			font-size: 28px;
			padding: 3px 0;
			color: yellow;
			text-align: left;
		}
	}
}
</style>
