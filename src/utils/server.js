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
	return fetch(`${API.itemsRemoveUrl}/${id}`, {
		method: 'DELETE',
	})
		.then((response) => response.json())
		.catch((err) => err);
}

export async function sync(localItems, callback) {
	const serverItems = await fetchItems();

	// add local items to db
	localItems.forEach((item) => {
		if (item.flag_mark_deleted) return;
		const existsOnServer = !!serverItems.find(({ id }) => id == item.id);

		if (existsOnServer) return;
		uploadItem(item);
	});

	// remove local items from db
	localItems.forEach((item) => {
		if (!item.flag_mark_deleted) return;
		fetch(`${API.itemsUrl}/${item.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...item,
				flag_mark_deleted: true,
			}),
		});
	});

	setTimeout(async () => {
		callback(await fetchItems());
	}, 0);
}
