<template>
	<div class="mb-4">
		<div class="flex justify-center">
			<button class="btn" @click="$emit('press', 'ArrowUp');">
				<slot name="up"><div class="rotate-90">&lt;</div></slot>
			</button>
		</div>
		<div class="flex justify-center">
			<button class="btn" @click="$emit('press', 'ArrowLeft');">
				<slot name="left"><div>&lt;</div></slot>
			</button>
			<button class="btn" @click="$emit('press', 'ArrowDown');">
				<slot name="down"><div class="rotate-90">&gt;</div></slot>
			</button>
			<button class="btn" @click="$emit('press', 'ArrowRight');">
				<slot name="right"><div>&gt;</div></slot>
			</button>
		</div>
	</div>
</template>
