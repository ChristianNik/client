import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import MobileLayout from '../../layouts/mobile.layout';
import useAddItem from '../../hooks/use-add-item';
import { Avatar, Button, Dialog, IconButton, Input } from '../../components';
import { deleteItem, updateItem } from '../../utils/server';
import { useItems } from '../../context/items.context';

const ItemEditPage = () => {
	const { id } = useParams();
	const { items } = useItems();

	const history = useHistory();

	const pushToView = () => history.goBack();

	const handleEditItem = async (e) => {
		e.preventDefault();

		await updateItem(formData);
		pushToView();
	};

	const item = useMemo(() => items.find((item) => item.id == id), [items]);
	const { formData, handleSelectImage, handleInputChange } = useAddItem(item);

	if (!item) {
		return null;
	}
	return (
		<MobileLayout
			style={{
				background: 'var(--background)',
			}}
			top={
				<Dialog.Header
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						justifyItems: 'center',
						alignItems: 'center',
						background: 'var(--surface)',
						color: 'var(--on-surface)',
					}}
				>
					<IconButton
						icon={faChevronLeft}
						onClick={pushToView}
						style={{
							justifySelf: 'start',
						}}
					/>
					<h2
						style={{
							textAlign: 'center',
							margin: '24px 0',
						}}
					>
						Edit
					</h2>
					<div
						style={{
							display: 'flex',
							justifySelf: 'end',
						}}
					>
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
				</Dialog.Header>
			}
			bottom={
				<Dialog.Header
					style={{
						padding: '16px',
						display: 'grid',
						gridAutoFlow: 'column',
						gap: '8px',
					}}
				>
					<Button onClick={pushToView}>Cancel</Button>
					<Button primary onClick={handleEditItem}>
						Save
					</Button>
				</Dialog.Header>
			}
		>
			<Dialog.Content>
				<div
					style={{
						textAlign: 'center',
						marginTop: '26px',
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
				<div
					style={{
						margin: '16px',
						display: 'grid',
						gap: '8px',
					}}
				>
					<hr
						style={{
							borderColor: 'var(--inactive)',
						}}
					/>
					<Input
						value={formData.name}
						onChange={handleInputChange}
						name='name'
						text='Name'
					/>
					<Input
						value={formData.description}
						onChange={handleInputChange}
						name='description'
						text='Description'
					/>
				</div>
			</Dialog.Content>
		</MobileLayout>
	);
};

export default ItemEditPage;
