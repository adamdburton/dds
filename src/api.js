const name = '_Undefined';

class API {
	fetch(path = 'f') {
		// Api returns 410 Gone for a "did not hit a wall" path. A 410, guys? Those poor droids!
		// For the sake of the game it's been remapped to 304 Not Modified for "didn't hit any empire
		// scrap metal on the way over there"

		return fetch('https://burt0n.net/vp.php?name=' + name + '&path=' + path)
			.catch(err => {
				console.log('crashed, undo?', err);
			})
			.then(async response => ({
				...(await response.json()),
				code: response.status
			}));
	}
}

const api = new API();

export default api;
