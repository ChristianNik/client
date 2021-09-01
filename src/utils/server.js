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

export async function sync(localItems, callback) {
	const serverItems = await fetchItems();

	// add local items to db
	localItems.forEach((item) => {
		if (item.flag_mark_deleted) return;
		const existsOnServer = !!serverItems.find(({ id }) => id == item.id);

		if (existsOnServer) return;
		fetch(API.itemsUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		});
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
