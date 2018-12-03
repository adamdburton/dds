<template>
	<Modal classes="max-w-sm w-full">
		<img src="https://media.giphy.com/media/1HPUSulSOHDpe/giphy.gif" class="block mx-auto mb-4" alt="" />
		<div class="background-black p-4 text-white mb-4" v-html="path"></div>
		<div class="text-center"><button class="btn btn-is-error" @click="$emit('close');">Fire</button></div>
	</Modal>
</template>

<script>
import Modal from '../Modal';

export default {
	components: {
		Modal
	},
	props: ['path'],
	computed: {}
};
</script>
