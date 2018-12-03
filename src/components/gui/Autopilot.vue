<template>
	<div class="container is-dark with-title mb-4">
		<p class="title">Autopilot</p>
		<div class="btn is-error" @click="$emit('autopilot');" v-html="enabled ? 'Disable' : 'Enable'"></div>
	</div>
</template>

<script>
export default {
	props: ['enabled'],
	mounted() {
		this.console('[AP] Mounting Autopilot systems...', 'text-pink-dark');
		this.console(' bebs /root/scripts/AP.amu', 'text-pink-dark opacity-50');
		this.console(' [*] INIT...............', 'text-pink-dark opacity-50');
		this.console(' [*] CREATE RAMDISK 32K.', 'text-pink-dark opacity-50');
		this.console(' [*] FILLING............', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 000000000O000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] 0000000000000000000', 'text-pink-dark opacity-50');
		this.console(' [*] DONE...............\n\n', 'text-pink-dark opacity-50');
	}
};
</script>
