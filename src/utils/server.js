import { API } from '../constants';

export async function fetchItems() {
	const data = await fetch(API.itemsUrl)
		.then((response) => response.json())
		.catch(() => []);

	return data;
}

export async function sync(localItems) {
	const serverItems = await fetchItems();

	// remove local items from server
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

	// const dataIds = new Set([
	// 	...serverItems.map(({ id }) => id),
	// 	...localItems.map(({ id }) => id),
	// ]);
	// dataIds.forEach((item) => {
	// 	console.log('item :', item);
	// });
	// dataIds.forEach((id) => {
	// 	console.log('id :', id);
	// 	const existsOnServer = !!items.find((item) => item.id == id);
	// 	const existsLocal = !!data.find((item) => item.id == id);
	// 	console.log('existsOnServer :', existsOnServer);
	// 	console.log('existsLocal :', existsLocal);

	// 	if (existsOnServer && existsLocal) return;
	// });
}
