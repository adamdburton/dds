<template>
	<div class="flex-1">
		<div class="relative w-full pt-full"><component :is="component" :tile="tile" :row="row" class="absolute pin" /></div>
	</div>
</template>

<script>
import StartTile from './tiles/Start';
import WallTile from './tiles/Wall';
import ChannelTile from './tiles/Channel';
import PathTile from './tiles/Path';
import DroidTile from './tiles/Droid';

const tiles = {
	x: 'StartTile',
	d: 'DroidTile',
	'#': 'WallTile',
	' ': 'ChannelTile',
	'*': 'PathTile'
};

export default {
	components: {
		StartTile,
		WallTile,
		ChannelTile,
		PathTile,
		DroidTile
	},
	props: ['tile', 'row'],
	computed: {
		component: function() {
			return tiles[this.tile];
		}
	}
};
</script>

<style>
.pt-full {
	padding-top: 100%;
}
</style>
