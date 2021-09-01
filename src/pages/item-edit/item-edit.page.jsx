import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar } from '../../components';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import useAddItem from '../../hooks/use-add-item';
import { updateItem } from '../../utils/server';

const ItemEditPage = () => {
	const { id } = useParams();
	const { lang } = useLanguage();
	const { items } = useItems();

	const history = useHistory();

	const handleEditItem = async (e) => {
		e.preventDefault();

		await updateItem(formData);
		history.push(`/items/${id}`);
	};

	const item = useMemo(() => items.find((item) => item.id == id), [items]);
	const { formData, handleSelectImage } = useAddItem(item);

	if (!item) {
		return null;
	}
	return (
		<div>
			<h2>{lang('addItemTitle')}</h2>
			<form
				onSubmit={handleEditItem}
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

				<button
					type='submit'
					style={{ width: 'max-content', padding: '7px 14px' }}
				>
					{lang('editItemConfirmText')}
				</button>
			</form>
		</div>
	);
};

export default ItemEditPage;
