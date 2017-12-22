import Home from './components/Home.vue';
import Config from './components/Config.vue';
import Password from './components/Password.vue';

export default [
	{
		path: '/',
		alias: '/home',
		component: Home
	},
	{
		path: '/config',
		component: Config
	},
	{
		path: '/password',
		component: Password
	}
];