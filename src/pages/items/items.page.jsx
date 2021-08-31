import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../../components';
import { useLanguage } from '../../context/language.context';
import { useItems } from '../../hooks/use-items';
import { sync } from '../../utils/server';

const ItemsPage = () => {
	const { lang } = useLanguage();
	const { items, setItems, removeItem } = useItems();
	const history = useHistory();
	return (
		<div>
			<button
				onClick={() => {
					sync(items, (data) => {
						console.log('data :', data);
						setItems(data);
					});
				}}
			>
				{lang('buttonSyncText')}
			</button>
			<ul>
				{items
					.filter((v) => !v.flag_mark_deleted)
					.map((item) => {
						return (
							<li
								key={item.id}
								style={{
									display: 'flex',
									alignItems: 'center',
									overflow: 'hidden',
								}}
								onClick={() => {
									history.push(`/items/${item.id}`);
								}}
							>
								<Avatar
									src={item.image}
									style={{
										marginRight: '16px',
									}}
								/>

								<div
									style={{
										overflow: 'auto',
									}}
								>
									{!item.name && !item.description ? (
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
											}}
										>
											{item.id}
										</div>
									) : (
										<div
											style={{
												whiteSpace: 'nowrap',
											}}
										>
											<h3
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												{item.name}
											</h3>
											<p
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												{item.description}
											</p>
										</div>
									)}
								</div>
								<div style={{ marginLeft: 'auto', display: 'grid' }}>
									<button
										onClick={(e) => {
											e.stopPropagation();
											removeItem(item.id);
											// fetch(`${API.itemsRemoveUrl}/${item.id}`, {
											// 	method: 'DELETE',
											// })
										}}
									>
										{lang('removeItemText')}
									</button>
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default ItemsPage;
