import { API } from '../constants';

export async function fetchItems() {
	const data = await fetch(API.itemsUrl)
		.then((response) => response.json())
		.catch(() => []);

	return data;
}

export async function fetchItem(id) {
	const data = await fetch(`${API.itemsUrl}/${id}`)
		.then((response) => response.json())
		.catch(() => []);

	return data;
}

export async function uploadItem(item) {
	return fetch(API.itemsUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	})
		.then((response) => response.json())
		.catch((err) => err);
}

export async function updateItem(item) {
	return fetch(`${API.itemsUrl}/${item.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	})
		.then((response) => response.json())
		.catch((err) => err);
}

export async function deleteItem(id) {
	return fetch(`${API.itemsUrl}/${id}`, {
		method: 'DELETE',
	})
		.then((response) => response.json())
		.catch((err) => err);
}
