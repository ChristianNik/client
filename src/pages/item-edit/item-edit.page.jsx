import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, EmojiButton } from '../../components';
import { useItems } from '../../context/items.context';
import useAddItem from '../../hooks/use-add-item';
import { updateItem } from '../../utils/server';

const ItemEditPage = () => {
	const { id } = useParams();
	const { items } = useItems();

	const history = useHistory();

	const pushToView = () => history.push(`/items/${id}`);

	const handleEditItem = async (e) => {
		e.preventDefault();

		await updateItem(formData);
		pushToView();
	};

	const item = useMemo(() => items.find((item) => item.id == id), [items]);
	const { formData, handleSelectImage } = useAddItem(item);

	if (!item) {
		return null;
	}
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<EmojiButton onClick={pushToView}>❌</EmojiButton>
				<EmojiButton onClick={handleEditItem}>💾</EmojiButton>
			</div>

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
		</div>
	);
};

export default ItemEditPage;
