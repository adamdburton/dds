import api from './api';

class Autopilot {
	map = '';
	path = 'f';

	isRunning = false;
	isComplete = false;

	moves = ['fff', 'ff', 'f', 'rf', 'lf', 'l', 'r'];

	stepCallback = null;
	completeCallback = null;

	reset() {
		this.isComplete = false;
		this.isRunning = true;
		this.map = '';
		this.path = 'f';
	}

	async enable() {
		this.reset();

		while (this.isRunning && !this.isComplete) {
			let moves = this.moves,
				successfulMove = false;

			while (!successfulMove) {
				for (let i in moves) {
					let move = moves[i];
					let response = await api.fetch(this.path + move);

					let updatePath = true;
					let updateMap = true;

					if (response.code === 410) {
						successfulMove = true;
					} else if (response.code === 417) {
						updatePath = false;
					} else if (response.code === 200) {
						successfulMove = true;
						this.isRunning = false;
						this.isComplete = true;
					}

					if (updatePath) {
						this.path += move;
					}

					if (updateMap) {
						this.map = response.map;
					}

					if (this.stepCallback) {
						this.stepCallback(this.map, this.path, response);
					}

					await this.wait(250);

					if (successfulMove) {
						break;
					}
				}

				if (!this.isRunning || this.isComplete) {
					break;
				}
			}
		}

		if (this.isComplete && this.completeCallback) {
			this.completeCallback(this.map, this.path);
		}
	}

	async wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	disable() {
		this.isRunning = false;
	}

	step(callback) {
		this.stepCallback = callback;
	}

	complete(callback) {
		this.completeCallback = callback;
	}
}

const autopilot = new Autopilot();

export default autopilot;
