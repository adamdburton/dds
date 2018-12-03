<template>
	<Modal classes="max-w-lg w-full flex flex-col">
		<section class="balloon container flex-1 leading-normal md:leading-loose mb-8 px-4 md:px-0">
			<div class="messages">
				<div class="message -left">
					<div class="self-end flex-no-shrink">
						<img :src="src" alt="" class="block rounded-full shadow-inner w-8 h-8 md:w-12 md:h-12 mb-2" />
						<div class="text-xs text-black text-center hidden md:block">Adam</div>
					</div>
					<div class="balloon from-left text-sm">
						<p>Thank you for checking out my Deathstar task submission.</p>
						<p>It's design is reminiscent of 1980's text-based GUI programs with some 8-bit style.</p>
						<p>
							Use <span class="text-red-light">autopilot</span> to have DDS find a solution by programatically calling the API or use
							your <span class="text-blue-dark">WASD</span> or <span class="text-blue-dark">arrow</span> keys to play yourself!
						</p>
					</div>
				</div>
			</div>
		</section>

		<div class="text-center"><button @click="$emit('close');" class="btn is-primary">Launch DDS</button></div>
	</Modal>
</template>

<script>
import Modal from '../Modal';

export default {
	components: {
		Modal
	},
	computed: {
		src: function() {
			return 'https://uploads.codesandbox.io/uploads/user/075e8af8-ae7e-431c-853a-e7f75a4aa858/ZgNG-output-onlinepngtools%20(1).png';
		},
		isTouch: function() {
			return 'ontouchstart' in document.documentElement;
		}
	}
};
</script>

<style>
.rotate-90 {
	transform: rotate(90deg);
}

/* Stolen from NES demo site - why isn't this in the release file?? */
/* NES.css is really nice but it's early in development :) */
/* @see: https://github.com/BcRikko/NES.css */

.balloon.container {
	display: block;
	width: auto;
	overflow: auto;
}
.balloon.container .balloon {
	margin: 2rem 1rem;
}

@media (min-width: 768px) {
	.balloon.container .balloon {
		margin: 2rem;
	}
}

.balloon.container .messages {
	display: flex;
	flex-direction: column;
}
.balloon.container .message {
	display: flex;
}
.balloon.container .message i {
	align-self: flex-end;
}
.balloon.container .message.-left {
	align-self: flex-start;
}
.balloon.container .message.-right {
	align-self: flex-end;
}
</style>
