import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar } from '../../components';
import EmojiButton from '../../components/emojibutton';
import { fetchItem } from '../../utils/server';

const ItemViewPage = () => {
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
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<EmojiButton
					onClick={() => {
						history.push('/items');
					}}
				>
					⬅️
				</EmojiButton>

				<EmojiButton
					onClick={() => {
						history.push(`/items/${id}/edit`);
					}}
				>
					📝
				</EmojiButton>
			</div>

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
