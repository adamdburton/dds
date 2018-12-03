<template>
	<Modal classes="max-w-md">
		<div class="container is-dark with-title mb-4">
			<p class="title">How to play</p>
			<div v-if="isTouch"></div>
			<div v-else>
				<div class="flex justify-around mb-4">
					<Keys />
					<Keys>
						<div slot="up">W</div>
						<div slot="left">A</div>
						<div slot="down">S</div>
						<div slot="right">D</div>
					</Keys>
				</div>
				<div class="text-center leading-loose">
					<div>Up/W = Forward</div>
					<div>Left/A = Left</div>
					<div>Right/D = Right</div>
					<div>Down/S = Undo</div>
				</div>
			</div>

			<button class="btn btn-primary" @click="$emit('close');">Close</button>
		</div>
	</Modal>
</template>

<script>
import Modal from '../Modal';
import Keys from '../gui/Keys';

export default {
	components: {
		Modal,
		Keys
	},
	computed: {
		isTouch: function() {
			return 'ontouchstart' in document.documentElement;
		}
	}
};
</script>
