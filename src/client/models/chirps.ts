import * as axios from 'axios'
import {Chirp, UserId} from '../../shared/chirp'


export async function getTimeline(): Promise<Chirp[]> {
	let response = await axios.get<Chirp[]>('/api/timeline');
	return response.data;
}

export async function getTimelineForUser(user: UserId): Promise<Chirp[]> {
	let response = await axios.get<Chirp[]>(`/api/timeline${user}`);
	return response.data;
}

export async function saveChirp(chirp: Chirp): Promise<Chirp> {
	let res = await axios.post<Chirp>('/api/chirps', chirp);
	return res.data;
}