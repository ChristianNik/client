import React, { useEffect, useState } from 'react';
import { fetchItems } from '../utils/server';

const ItemsContext = React.createContext([]);

export function ItemsProvider({ children }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await fetchItems();
			setItems(data);
		})();
	}, []);

	const provider = {
		items,
		setItems,
		addItem: async (data) => {
			setItems((prev) => [...prev, { ...data, created: Date.now() }]);
		},
		removeItem: async (id) => {
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
		},
	};

	return (
		<ItemsContext.Provider value={provider}>{children}</ItemsContext.Provider>
	);
}

export const useItems = () => {
	const { items, setItems, addItem, removeItem } =
		React.useContext(ItemsContext);

	return {
		items,
		setItems,
		addItem,
		removeItem,
	};
};
