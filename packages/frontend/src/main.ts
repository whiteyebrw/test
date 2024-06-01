import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import Inputmask from 'inputmask';

const app = createApp(App);

app.directive("mask", {
	mounted(el, binding) {
		if (!binding.value) return;

		const im = new Inputmask(binding.value, {
			showMaskOnHover: false,
			removeMaskOnSubmit: true,
		});
		im.mask(el);
		el._im = im;
	},
	unmounted(el, binding) {
		if (!binding.value) return;

		el._im.remove();
	},
});

app.mount('#app');
