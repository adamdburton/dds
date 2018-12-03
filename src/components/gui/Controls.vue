<template>
	<div class="container is-dark with-title">
		<p class="title">Manual Controls</p>
		<Keys @press="press" />
	</div>
</template>

<script>
import Keys from './Keys';

export default {
	components: { Keys },
	methods: {
		press: function(key) {
			this.$emit('press', { key });
		}
	}
};
</script>
