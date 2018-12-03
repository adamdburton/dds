<template>
	<div class="bg-wall bg-cover pixelated" :style="style"></div>
</template>

<script>
export default {
	props: ['tile', 'row'],
	computed: {
		style: function() {
			return 'opacity: ' + (1 - Math.floor(Math.random() * 3) / 10);
		}
	}
};
</script>

<style>
.pixelated {
	image-rendering: pixelated;
}

.bg-wall {
	background-image: url('https://uploads.codesandbox.io/uploads/user/075e8af8-ae7e-431c-853a-e7f75a4aa858/SV_m-wall.png');
}
</style>
