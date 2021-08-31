import { useEffect, useState } from 'react';
import { fetchItems } from '../utils/server';

export function useItems() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await fetchItems();

			setItems(data);
		})();
	}, []);

	const addItem = async (data) => {
		setItems((prev) => [...prev, { ...data, created: Date.now() }]);
	};

	const removeItem = async (id) => {
		setItems((prev) =>
			prev.map((v) =>
				v.id != id
					? v
					: {
							...v,
							flag_mark_deleted: true,
					  }
			)
		);
	};

	return {
		items,
		setItems,
		addItem,
		removeItem,
	};
}
