<template>
	<div class="fixed bg-black bg-death-star bg-cover bg-center pin z-30 flex items-center justify-center">
		<div class="w-full z-50 max-h-screen p-8 overflow-y-scroll no-scrollbar" :class="classes"><slot></slot></div>
	</div>
</template>

<script>
export default {
	props: ['title', 'classes']
};
</script>

<style>
.bg-smoke {
	background-color: rgba(0, 0, 0, 0.8);
}
.bg-death-star {
	background-image: url('https://i.imgur.com/enICenD.png');
}
.bg-death-star::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 40;
}
</style>
