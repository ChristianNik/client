import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImagePlaceHolder = (props) => (
	<div
		style={{
			backgroundColor: `hsl(220, 13%, ${Math.random() * (26 - 0) + 26}%)`,
			width: 'minmax(100px, 150px)',
			height: '100px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			padding: '8px',
		}}
		{...props}
	/>
);

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
						<LazyLoadImage
							placeholder={<ImagePlaceHolder />}
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
					<ImagePlaceHolder
						key={item.id}
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
					</ImagePlaceHolder>
				)
			)}
		</div>
	);
};

export default CompactItemsList;
