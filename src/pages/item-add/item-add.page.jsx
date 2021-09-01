import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Hashtags, Input, Rating } from '../../components';
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

	return (
		<div>
			<h2>{lang('addItemTitle')}</h2>
			<form
				onSubmit={handleAddItem}
				style={{
					display: 'grid',
					gap: '8px',
					padding: '16px',
				}}
			>
				<div
					style={{
						textAlign: 'center',
					}}
				>
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
				</div>
				<hr style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }} />

				<Input
					name='type'
					text={lang('typeTitle')}
					value={formData.type}
					onChange={handleInputChange}
					options={itemTypes}
				/>
				<Input
					name='name'
					text={lang('nameTitle')}
					value={formData.name}
					onChange={handleInputChange}
				/>
				<Input
					name='description'
					text={lang('descriptionTitle')}
					value={formData.description}
					onChange={handleInputChange}
				/>
				<h3>{lang('tagsTitle')}</h3>
				<Hashtags tags={formData.tags} onSubmit={addTag} onRemove={removeTag} />

				<h3>{lang('valuationTitle')}</h3>
				<Rating
					text={lang('convenienceTitle')}
					name='valuationConvenience'
					onChange={handleInputChange}
				/>
				<Rating
					text={lang('appearanceTitle')}
					name='valuationAppearance'
					onChange={handleInputChange}
				/>

				<button
					type='submit'
					style={{ width: 'max-content', padding: '7px 14px' }}
				>
					{lang('addItemText')}
				</button>
			</form>
		</div>
	);
};

export default ItemAdd;
