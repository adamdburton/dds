<template>
	<div class="" :style="style"></div>
</template>

<script>
export default {
	props: ['tile', 'row'],
	computed: {
		style: function() {
			return 'opacity: ' + (1 - Math.floor(Math.random() * 5 + 1) / 10);
		}
	}
};
</script>

<style>
.tile-drop {
	// transform: perspective(1000px) translateZ(-30px);
}
</style>
