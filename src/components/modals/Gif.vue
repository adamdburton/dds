<template>
	<Modal classes="max-w-sm w-full">
		<img :src="src" class="block mx-auto mb-4" alt="" />
		<div v-if="caption" v-html="caption" class="bg-black p-2 text-white text-center leading-normal"></div>
	</Modal>
</template>

<script>
import Modal from '../Modal';

export default {
	components: {
		Modal
	},
	props: ['src', 'caption'],
	computed: {}
};
</script>
