import React, { useEffect, useState } from 'react';
import { deleteItem, fetchItems, uploadItem } from '../utils/server';
import { v4 as uuid } from 'uuid';

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
			const newItem = {
				_createdAt: new Date().toISOString(),
				_id: uuid(),
				_type: `item.${data._type || 'undefined'}`,
				_updatedAt: new Date().toISOString(),
				description: data.description,
				//! HARDCODED
				mainImage: null,
				owner: {
					_type: 'owner',
					current: 'christian',
				},
				rating: {
					comfort: Number(data.valuationConvenience),
					look: Number(data.valuationAppearance),
				},
				tags: data.tags,
				title: `title of ${data._type}`,
			};

			setItems((prev) => [...prev, newItem]);
			uploadItem(newItem);
		},
		removeItem: async (id) => {
			deleteItem(id);
			setItems((prev) => prev.filter((v) => v._id != id));
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
