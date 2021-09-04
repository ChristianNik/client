import React from 'react';

const CompactItemsList = ({ items, ...rest }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
				gap: '4px',
			}}
		>
			{(items || []).map((item) =>
				item.image ? (
					<div
						key={item.id}
						style={{
							width: 'minmax(100px, 150px)',
							height: '100px',
						}}
					>
						<img
							style={{
								objectFit: 'cover',
								width: '100%',
								height: '100px',
							}}
							src={item.image}
							onClick={(e) => rest.onItemClick && rest.onItemClick(item, e)}
						/>
					</div>
				) : (
					<div
						style={{
							backgroundColor: `hsl(220, 13%, ${
								Math.random() * (26 - 0) + 26
							}%)`,
							width: 'minmax(100px, 150px)',
							height: '100px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							padding: '8px',
						}}
						onClick={(e) => rest.onItemClick && rest.onItemClick(item, e)}
						onContextMenu={(e) => {
							e.preventDefault();
							rest.onItemRemoveClick && rest.onItemRemoveClick(item, e);
						}}
					>
						<div
							style={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.name || item.description || item.id}
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default CompactItemsList;
