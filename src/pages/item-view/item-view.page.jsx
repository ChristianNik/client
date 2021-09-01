import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar } from '../../components';
import { useLanguage } from '../../context/language.context';
import { fetchItem } from '../../utils/server';

const ItemViewPage = () => {
	const { lang } = useLanguage();
	const [item, setItem] = useState(null);
	const { id } = useParams();

	const history = useHistory();

	useEffect(() => {
		(async () => {
			const item = await fetchItem(id);
			setItem(item);
		})();
	}, []);

	if (!item) return null;

	return (
		<div>
			<button
				style={{
					padding: '16px',
					borderRadius: '50%',
					width: '48px',
					height: '48px',
					position: 'relative',
				}}
				onClick={() => {
					history.push('/items');
				}}
			>
				{lang('backText')}
			</button>
			<button
				style={{
					padding: '16px',
					borderRadius: '50%',
					minWidth: '48px',
					height: '48px',
					position: 'relative',
				}}
				onClick={() => {
					history.push(`/items/${id}/edit`);
				}}
			>
				{lang('items/view', 'editLabel')}
			</button>
			<div
				style={{
					textAlign: 'center',
				}}
			>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar
						src={item.image}
						size='xl'
						style={{
							marginRight: '16px',
						}}
					/>
				</div>
				<h1>{item.name || <small>{item.id}</small>}</h1>
			</div>
			<hr style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }} />
			<div>
				<small>
					<strong>{item.type}</strong>
				</small>
			</div>
			<div>
				{item.tags && item.tags.length > 0 ? `#${item.tags.join(', #')}` : ''}
			</div>
			<div>{item.description}</div>
		</div>
	);
};

export default ItemViewPage;
