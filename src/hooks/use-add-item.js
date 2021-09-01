import { useEffect, useState } from 'react';
import { buildImageSelector, compressImage } from '../utils/image';
import { makeId } from '../utils/make-id';

const useAddItem = (initialData) => {
	const [formData, setFormData] = useState({
		id: makeId(20),
		type: '',
		name: '',
		description: '',
		valuationConvenience: '1',
		valuationAppearance: '1',
		valuationComfortableness: '1',
		image: '',
		tags: [],
	});

	useEffect(() => {
		initialData && setFormData(initialData);
	}, [initialData]);

	const addTag = (data) =>
		setFormData((prev) => ({
			...prev,
			tags: [...new Set([...prev.tags, data])],
		}));

	const removeTag = (data) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter((t) => t != data),
		}));
	};

	const handleInputChange = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleSelectImage = async () => {
		const imageSelector = buildImageSelector();

		imageSelector.onchange = async (e) => {
			const [file] = e.target.files;
			if (!file) return;

			const compressedImage = await compressImage(file);

			handleInputChange({
				...e,
				target: {
					...e.target,
					name: 'image',
					value: compressedImage,
				},
			});
		};
		imageSelector.click();
	};

	return {
		formData,
		addTag,
		removeTag,
		handleInputChange,
		handleSelectImage,
	};
};

export default useAddItem;
