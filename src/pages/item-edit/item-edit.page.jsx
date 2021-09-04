import {
	faChevronLeft,
	faSave,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import MobileLayout from '../../layouts/mobile.layout';
import useAddItem from '../../hooks/use-add-item';
import { Avatar, Dialog, IconButton } from '../../components';
import { deleteItem, updateItem } from '../../utils/server';
import { useItems } from '../../context/items.context';

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
		<Dialog>
			<MobileLayout>
				<div
					style={{
						margin: '0 auto',
						maxWidth: '600px',
						overflow: 'auto',
						height: '100%',
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							justifyItems: 'center',
							alignItems: 'center',
						}}
					>
						<IconButton
							icon={faChevronLeft}
							onClick={() => {
								history.push('/items');
							}}
							style={{
								justifySelf: 'start',
							}}
						/>

						<h2>Edit</h2>
						<div
							style={{
								display: 'flex',
								justifySelf: 'end',
							}}
						>
							<IconButton
								icon={faSave}
								noBorder
								size='lg'
								onClick={handleEditItem}
							/>
							<IconButton
								icon={faTrash}
								noBorder
								size='lg'
								onClick={() => {
									deleteItem(id).then(() => {
										history.push(`/items`);
									});
								}}
							/>
						</div>
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
						<h1>{formData.name || <small>{formData.id}</small>}</h1>
						<div>
							<small>
								Created:{' '}
								<strong>{new Date(item.created).toLocaleString()}</strong>
							</small>
						</div>
						<small>
							<strong>{item.type}</strong>
						</small>
					</div>

					<hr style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }} />
				</div>
			</MobileLayout>
		</Dialog>
	);
};

export default ItemEditPage;
