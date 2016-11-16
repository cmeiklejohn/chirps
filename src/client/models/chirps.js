import * as axios from 'axios'

export async function getTimeline() {
	let response = await axios.get('/api/timeline');
	return response.data;
}

export async function getTimelineForUser(user) {
	let response = await axios.get(`/api/timeline${user}`);
	return response.data;
}

export async function saveChirp(chirp) {
	let res = await axios.post('/api/chirps', chirp);
	return res.data;
}