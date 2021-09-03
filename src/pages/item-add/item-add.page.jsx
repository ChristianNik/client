import { faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import { Avatar, EmojiButton, Hashtags, Input, Rating } from '../../components';
import { useItems } from '../../context/items.context';
import { useLanguage } from '../../context/language.context';
import useAddItem from '../../hooks/use-add-item';
import MobileLayout from '../../layouts/mobile.layout';

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
		const types = items.reduce((acc, item) => {
			const types = [...acc, item.type];
			const typesSet = new Set(types);
			typesSet.delete('');
			return [...typesSet];
		}, []);

		const typeCounts = items.reduce((acc, item) => {
			acc[item.type] = (acc[item.type] || 0) + 1;
			return acc;
		}, {});

		return types.sort((a, b) => (typeCounts[b] || 0) - (typeCounts[a] || 0));
	}, [items]);

	const [pageIndex, setPageIndex] = useState(0);

	const prevPage = () => {
		setPageIndex(pageIndex - 1);
		history.goBack();
	};
	const nextPage = () => {
		setPageIndex(pageIndex + 1);

		switch (pageIndex) {
			case 0: {
				history.push(`/items/add/details`);
				return;
			}
			case 1: {
				history.push(`/items/add/valuation`);
				return;
			}
			default: {
			}
		}
	};

	const [selectedType, setSelectedType] = useState('');

	return createPortal(
		<div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				overflow: 'auto',
				zIndex: 200,
				backgroundColor: 'hsl(220, 13%, 26%)',
			}}
		>
			<MobileLayout
				top={
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{pageIndex === 0 ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '32px',
									height: '32px',
									border: '2px solid gray',
									borderRadius: '50%',
									margin: '16px',
								}}
								onClick={() => {
									history.push('/items');
								}}
							>
								<FontAwesomeIcon icon={faTimes} color='gray' size='sm' />
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '32px',
									height: '32px',
									border: '2px solid gray',
									borderRadius: '50%',
									margin: '16px',
								}}
								onClick={prevPage}
							>
								<FontAwesomeIcon icon={faChevronLeft} color='gray' size='sm' />
							</div>
						)}

						<h2
							style={{
								textAlign: 'center',
								margin: '24px 0',
							}}
						>
							{pageIndex === 0
								? 'Select Type'
								: pageIndex === 1
								? 'Details'
								: pageIndex === 2
								? 'Valuation'
								: ''}
						</h2>
					</div>
				}
				bottom={
					<div
						style={{
							padding: '16px',
						}}
					>
						{pageIndex > 1 ? (
							<button
								onClick={handleAddItem}
								style={{
									fontSize: '14px',
									padding: '8px 32px',
									width: '100%',
									border: 'none',
									borderRadius: '4px',
								}}
							>
								{lang('items/add', 'add')}
							</button>
						) : (
							<button
								type='button'
								style={{
									fontSize: '14px',
									padding: '8px 32px',
									width: '100%',
									border: 'none',
									borderRadius: '4px',
								}}
								disabled={!selectedType || pageIndex > 1}
								onClick={nextPage}
							>
								NEXT
							</button>
						)}
					</div>
				}
			>
				<div
					style={{
						padding: '16px',
						overflow: 'auto',
					}}
				>
					<form onSubmit={handleAddItem}>
						<Route exact path='/items/add'>
							<div
								style={{
									overflow: 'hidden',
								}}
							>
								<ul
									style={{
										listStyle: 'none',
										display: 'grid',
										gap: '8px',
										overflow: 'hidden',
									}}
								>
									{itemTypes.map((type) => {
										return (
											<li
												key={type}
												style={{
													display: 'block',
													padding: '8px 16px',
													border: '2px solid currentColor',
													borderRadius: '4px',
													textDecoration: 'none',
													textAlign: 'center',
													textTransform: 'uppercase',
													color: 'hsl(220, 13%, 50%)',
													...(selectedType === type && {
														color: '#fff',
													}),
												}}
												onClick={() => {
													setSelectedType(type);
												}}
												onDoubleClick={() => {
													setSelectedType(type);
													nextPage();
												}}
											>
												{type}
											</li>
										);
									})}
								</ul>
							</div>
						</Route>

						<Route exact path='/items/add/details'>
							<>
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
									style={{
										margin: '16px 0',
										borderColor: 'hsl(220, 13%, 50%)',
									}}
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
							</>
						</Route>

						<Route exact path='/items/add/valuation'>
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
						</Route>
					</form>
				</div>
			</MobileLayout>
		</div>,
		document.getElementById('modal-root')
	);
};

export default ItemAdd;
