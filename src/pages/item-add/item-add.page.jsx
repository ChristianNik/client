import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, EmojiButton, Hashtags, Input, Rating } from '../../components';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import useAddItem from '../../hooks/use-add-item';

const ItemAdd = () => {
	const { lang } = useLanguage();
	const { items, addItem } = useItems();
	const history = useHistory();
	const { formData, addTag, removeTag, handleInputChange, handleSelectImage } =
		useAddItem();

	useEffect(() => window.scrollTo(0, 0), []);

	const handleAddItem = async (e) => {
		e.preventDefault();

		await addItem(formData);
		history.push('/items');
	};

	const itemTypes = useMemo(() => {
		return items.reduce(
			(acc, item) => [...new Set([...acc, item.type])],
			['shampoo', 't-shirt', 'pants']
		);
	}, [items]);

	// useEffect(() => {
	// 	handleSelectImage();
	// }, []);

	const [pageIndex, setPageIndex] = useState(0);

	return (
		<div>
			<form onSubmit={handleAddItem}>
				{pageIndex === 0 && (
					<>
						<h2
							style={{
								textAlign: 'center',
							}}
						>
							Select Type
						</h2>
						<Input
							name='type'
							text={lang('items/add', 'typeCaption')}
							value={formData.type}
							onChange={handleInputChange}
							options={itemTypes}
						/>
					</>
				)}

				{pageIndex === 1 && (
					<>
						<h2
							style={{
								textAlign: 'center',
							}}
						>
							Details
						</h2>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Avatar
								src={formData.image}
								size='xl'
								onClick={handleSelectImage}
								style={{
									marginRight: '16px',
								}}
							/>
						</div>
						<hr
							style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }}
						/>
						<h3>{lang('items/add', 'tagsCaption')}</h3>
						<Hashtags
							tags={formData.tags}
							onSubmit={addTag}
							onRemove={removeTag}
						/>
						<Input
							name='description'
							text={lang('items/add', 'descriptionCaption')}
							value={formData.description}
							onChange={handleInputChange}
						/>
						<button
							type='submit'
							style={{ width: 'max-content', padding: '7px 14px' }}
						>
							{lang('items/add', 'add')}
						</button>
					</>
				)}

				{pageIndex === 2 && (
					<>
						<h2
							style={{
								textAlign: 'center',
							}}
						>
							Valuation
						</h2>
						<h3>{lang('items/add', 'valuationCaption')}</h3>
						<Rating
							text={lang('items/add', 'convenienceCaption')}
							name='valuationConvenience'
							onChange={handleInputChange}
						/>
						<Rating
							text={lang('items/add', 'appearanceCaption')}
							name='valuationAppearance'
							onChange={handleInputChange}
						/>
						<button
							type='submit'
							style={{ width: 'max-content', padding: '7px 14px' }}
						>
							{lang('items/add', 'add')}
						</button>
					</>
				)}
			</form>
			<button
				disabled={pageIndex < 1}
				onClick={() => setPageIndex(pageIndex - 1)}
			>
				Back
			</button>
			<button
				disabled={pageIndex > 1}
				onClick={() => setPageIndex(pageIndex + 1)}
			>
				Next
			</button>
		</div>
	);
};

export default ItemAdd;
