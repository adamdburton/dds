<template>
	<div class="container is-dark with-title flex-1 mb-4">
		<p class="title">Heads Up Display</p>
		<div
			class="h-full overflow-x-hidden overflow-y-auto no-scrollbar bg-channel bg-9 pixelated"
			:class="threedee ? 'map-tilt' : ''"
			ref="mapContainer"
		>
			<div v-for="(line, i) in tiles" :key="i" class="flex flex-no-grow flex-no-shrink">
				<Tile v-for="(tile, j) in line.chars" :tile="tile" :row="i" :key="'row-' + i + '-char-' + j" />
			</div>
		</div>
	</div>
</template>

<script>
import Tile from './Tile';

export default {
	components: { Tile },
	props: ['map', 'threedee'],
	watch: {
		map: function() {
			this.$nextTick(this.scrollToTop);
		}
	},
	methods: {
		scrollToTop: function() {
			this.$refs.mapContainer.scrollTop = 0;
		}
	},
	computed: {
		tiles: function() {
			let map = this.map;

			// This replaces the last '*' with 'd', splits into rows, reverses them and
			// then maps them to chubks of characters and the movement that caused that
			// row of characters

			// Lovely!

			return map
				.split('')
				.reverse()
				.join('')
				.replace('*', 'd') // Just the one please
				.split('')
				.reverse()
				.join('')
				.split('\n')
				.reverse()
				.map((row, i) => {
					return {
						movement: this.map.substr(i, 1),
						chars: row.split('')
					};
				});
		}
	},
	mounted() {
		this.scrollToTop();
	}
};
</script>

<style>
.animate-transform {
	transition: transform 1s ease-in-out;
}

.map-tilt {
	transform: perspective(1500px) rotateX(55deg) translateY(-15vw);
}

.bg-9 {
	background-size: 11.111111%;
}

.bg-channel {
	background-image: url('https://uploads.codesandbox.io/uploads/user/075e8af8-ae7e-431c-853a-e7f75a4aa858/AFkM-channel.png');
}

.no-scrollbar::-webkit-scrollbar {
	display: none;
}
</style>
