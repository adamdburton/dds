<template>
	<div class="flex-1 mb-4 container is-dark with-title h-full">
		<p class="title">Console Output</p>
		<div class="text-xs whitespace-pre-wrap overflow-x-hidden overflow-y-scroll no-scrollbar text-white" ref="consoleContainer">
			<div v-for="(line, i) in items" :key="i" v-html="line.text" :class="line.classes" class="mb-2"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['items'],
	watch: {
		items: function() {
			this.$nextTick(this.scrollToBottom);
		}
	},
	methods: {
		scrollToBottom: function() {
			let sc = this.$refs.consoleContainer;
			sc.scrollTop = sc.scrollHeight + sc.clientHeight;
		}
	}
};
</script>
