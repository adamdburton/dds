<template>
	<div class="container is-dark with-title flex-1">
		<p class="title">Targetting Solution</p>
		<div v-if="path" class="text-white opacity-75 text-sm break-word overflow-y-scroll no-scrollbar" v-html="formattedPath"></div>
		<div v-else class="text-white opacity-75 text-sm">
			<br />
			Instructions:<br />
			<br />
			1. Turn on <span class="text-red-light">Autopilot</span>.<br />
			2. Solution will be generated automatically.<br />
			<br />
			OR<br />
			<br />
			1. Press <span class="text-blue-dark">WASD</span> or <span class="text-blue-dark">arrow keys</span>.<br />
			2. Your solution will be shown here.
		</div>
	</div>
</template>

<script>
export default {
	props: ['path'],
	computed: {
		formattedPath: function() {
			return this.path.replace(/(.{4})/g, '<span>$1</span> ').replace(/fl/g, 'f</span><span>l');
		}
	}
};
</script>
