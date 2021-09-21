import { useEffect, useState } from 'react';
import { fetchItemImage } from '../utils/server';

const useItemImage = (item) => {
	const [itemImage, setItemImage] = useState('');
	useEffect(() => {
		if (!item) return;
		const imageId = (item.mainImage?.asset._ref + '')
			.replace('image-', '')
			.replace('-base64', '');

		(async () => {
			const image = await fetchItemImage(imageId);
			setItemImage(image.base64);
		})();
	}, [item]);

	return itemImage;
};

export default useItemImage;
