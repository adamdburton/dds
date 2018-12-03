<template>
	<div id="app" class="h-full">
		<div class="flex flex-col h-full">
			<div class="lg:flex p-4 flex-1">
				<div class="flex-1 flex flex-col"><HUD :map="map" :threedee="false" /> <Controls @press="keypress" /></div>
				<div class="flex-1 flex-col flex ml-4"><Feed /> <Solution :path="path" /></div>
				<div class="flex-1 max-w-sm ml-4 flex flex-col">
					<Console :items="log" /> <Autopilot :enabled="autopilotEnabled" @autopilot="toggleAutopilot" /> <Ad />
				</div>
			</div>
			<div class="p-4 pt-0">
				<div class="container max-w-full is-dark with-title h-full text-white">
					<p class="title">Credits</p>
					<div class="text-xs leading-normal">
						Created by Adam Burton using <a href="https://vuejs.org/" target="_blank">Vue</a>,
						<a href="https://tailwindcss.com/" target="_blank">Tailwind.css</a> and
						<a href="https://github.com/BcRikko/NES.css" target="_blank">NES.css</a> in
						<a href="http://codesandbox.io" target="_blank">CodeSandbox</a>. Images and graphics from various sources used without
						permission, sorry!
					</div>
				</div>
			</div>
		</div>

		<IntroModal v-if="state === 'intro'" @close="state = 'playing';" />
		<HowToPlayModal v-if="state === 'how-to-play'" @close="state = 'playing';" />
		<GifModal v-if="gifSrc" :src="gifSrc" :caption="gifCaption" />
	</div>
</template>

<script>
import HUD from './components/gui/HUD';
import Controls from './components/gui/Controls';
import Console from './components/gui/Console';
import Feed from './components/gui/Feed';
import Ad from './components/gui/Ad';
import Autopilot from './components/gui/Autopilot';
import Solution from './components/gui/Solution';

import IntroModal from './components/modals/Intro';
import HowToPlayModal from './components/modals/HowToPlay';
import FoundModal from './components/modals/Found';
import GifModal from './components/modals/Gif';

import api from './api';
import autopilot from './autopilot';

const keyDirectionMap = {
	f: 'forward',
	l: 'port',
	r: 'starboard'
};

const keyPathMap = {
	ArrowUp: { action: 'move', direction: 'f' },
	ArrowLeft: { action: 'move', direction: 'l' },
	ArrowRight: { action: 'move', direction: 'r' },
	ArrowDown: { action: 'undo' },
	w: { action: 'move', direction: 'f' },
	a: { action: 'move', direction: 'l' },
	d: { action: 'move', direction: 'r' },
	s: { action: 'undo' }
};

export default {
	name: 'App',
	components: {
		HUD,
		Controls,
		Console,
		Feed,
		Ad,
		Autopilot,
		Solution,
		IntroModal,
		HowToPlayModal,
		FoundModal,
		GifModal
	},
	data: () => ({
		state: 'intro',
		sendingCommand: false,
		log: [],
		inputDisabled: false,
		autopilotEnabled: false,
		path: '',
		map: '',
		gifSrc: null,
		gifCaption: ''
	}),
	computed: {
		playing: function() {
			return this.state === 'playing';
		},
		isTouch: function() {
			return 'ontouchstart' in document.documentElement;
		}
	},
	methods: {
		showGif: function(src, caption = '', duration = 3500) {
			this.gifSrc = src;
			this.gifCaption = caption;

			setTimeout(() => {
				this.gifSrc = '';
				this.gifCaption = '';
			}, duration);
		},
		toggleAutopilot: function() {
			if (this.autopilotEnabled) {
				this.disableAutopilot();
			} else {
				this.enableAutopilot();
			}
		},
		enableAutopilot: function() {
			this.disableInput();
			this.start();

			let dronesLost = 0;

			autopilot.step((map, path, request) => {
				this.map = map;
				this.path = path;

				if (request.code === 417) {
					this.console('[AP] DRONE LOST... (' + ++dronesLost + ')', 'text-pink-dark opacity-50');
				}
			});

			autopilot.complete(() => {
				this.autopilotEnabled = false;
				this.state = 'found';

				this.console('[AP] Target reached', 'text-pink-dark');
				this.console('[AP] UNMOUNTING....', 'text-pink');

				this.showGif('https://media.giphy.com/media/1xo9COytfPE9chS05b/giphy.gif', 'Targeting solution found!');
			});

			this.autopilotEnabled = true;

			this.showGif(
				'https://img.fanburst.com/d3PLjU8nM1v8aeEQD7l-Ei1MQGw=/400x400/cx2.fanburst.com/artwork/3e18f8ac-efc6-4362-b945-3462fb5b76ca.gif'
			);

			autopilot.enable();
		},
		disableAutopilot: function() {
			autopilot.disable();
			this.enableInput();

			this.autopilotEnabled = false;
		},
		enableInput() {
			this.inputDisabled = false;
		},
		disableInput() {
			this.inputDisabled = true;
		},
		toggleFullscreen: function() {
			this.$fullscreen.toggle();
		},
		start() {
			this.path = 'f';
			this.map = '##  x ###\n##  *####';

			this.state = 'playing';

			this.showGif('https://media.giphy.com/media/l3vRhTKbAF2qy2tnG/giphy.gif');
		},
		keypress(event) {
			if (this.inputDisabled || !this.playing) {
				return;
			}

			if (keyPathMap[event.key]) {
				if (event.preventDefault) {
					event.preventDefault();
				}

				let action = keyPathMap[event.key];

				if (action.action === 'move') {
					this.move(action.direction);
				} else if (action.action === 'undo') {
					this.path = this.path.slice(0, -1);
					this.map = this.map.slice(0, -10);
				}
			}
		},
		console(text, classes = '') {
			this.log.push({
				text: text.replace(/\n/g, '<br />'),
				classes
			});
		},
		async move(letter) {
			if (!this.sendingCommand) {
				this.sendingCommand = true;

				this.console('[CTRL&gt;] Moving ' + keyDirectionMap[letter] + '', 'text-purple');

				let response = await api.fetch(this.path + letter);

				let updatePath = true;
				let updateMap = true;

				if (response.code === 410) {
					this.console('[CTRL&lt;410] Good path, keep going.', 'text-purple');
				} else if (response.code === 417) {
					this.console('[CTRL&lt;417] Droid crashed', 'text-red-light');
					updatePath = false;
				} else if (response.code === 200) {
					this.console('[CTRL&lt;200] Droid reported success.', 'text-purple');

					this.state = 'complete';
				}

				if (updatePath) {
					this.path += letter;
				}

				if (updateMap) {
					this.map = response.map;
				}

				this.sendingCommand = false;

				return response;
			} else {
				this.console('[CTRL] Awaiting previous probe deployment result, please wait', 'text-red-light');
			}
		}
	},
	mounted: function() {
		this.console(' &nbsp;___  ___  ___\n / _ \\/ _ \\/ __/\n/ // / // /\\ \\\n\\___/\\___/___/\n\n', 'text-blue-light');
		this.console('Booting Droid Deployment System', 'text-blue-light');
		this.console('===============================\n\n', 'text-blue-light');

		this.console('[IO] Configuring devices', 'text-orange');

		if (this.isTouch) {
			this.console(' Touch input detected', 'text-orange opacity-50');
			this.console(' [*] Binding gestures', 'text-orange opacity-50');
		} else {
			this.console(' HID detected', 'text-orange opacity-50');
			this.console(' [*] Binding keys', 'text-orange opacity-50');

			window.addEventListener('keyup', this.keypress);
		}

		this.console(' ...done\n\n', 'text-orange opacity-50');

		// It was here I realised my mistake of 'booting' the console in mounted() and continued
		// anyway because it's 6:21pm and I started working on this at 7:30am.

		this.console('[DRCS] Connecting to Droid Remote Control Services', 'text-teal');
		this.console(' Using HTDCP [/ ~ /]', 'text-teal opacity-50');

		this.console(' Auth-SIG: #### B00_&lt;47 #### o_o', 'text-teal opacity-50');
		this.console(' Auth-ACK: #### p3p_p3r #### -_-', 'text-teal opacity-50');
		this.console(' Auth-ATT: #### C4L1C47 #### ^_^', 'text-teal opacity-50');

		this.console(' ...done\n\n', 'text-teal opacity-50');

		this.console('[CTRL] Listening for DRCS input', 'text-purple');
	}
};
</script>

<style>
.round-btn {
	background-image: url('https://uploads.codesandbox.io/uploads/user/075e8af8-ae7e-431c-853a-e7f75a4aa858/owLt-button.png');
	background-size: cover;
}

.media-embed {
	padding-top: 56.25%;
	position: relative;
}

.media-embed iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
