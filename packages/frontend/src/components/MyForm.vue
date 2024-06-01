<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { getUser } from '@/api/user';
import type { IUser } from '@/types';

const schema = yup.object({
	email: yup.string().email().required(),
	number: yup.string().transform(val => val ? val : undefined).length(6),
});

const email = ref('');
const number = ref();
const user = ref<IUser>();

let currentAbortController: AbortController | null = null;

const onSubmit = async () => {
	if (currentAbortController) {
		currentAbortController.abort();
	}

	currentAbortController = new AbortController();
	const signal = currentAbortController.signal;

	user.value = undefined;
	try {
		const { data } = await getUser(email.value, signal, number.value);
		user.value = data;
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<Form class="form" :validation-schema="schema" @submit="onSubmit">
		<Field name="email" type="email" v-model="email"/>
		<ErrorMessage name="email"/>

		<Field name="number" v-mask="'**-**-**'" :model-value="number"
					 @update:model-value="val => number = val ? val.replace(/[-_]/g, '') : undefined"/>
		<ErrorMessage name="number"/>

		<button type="submit">Submit</button>

		<div v-if="user" class="result">
			<span>{{ user.email }}</span>
			<span>{{ user.number }}</span>
		</div>
	</Form>
</template>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 16px;
	max-width: 400px;
	width: 100%;
}

.result {
	display: flex;
	gap: 8px;
}
</style>