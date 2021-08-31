import React from 'react';
import { Avatar, Hashtags, Input, Rating } from '../../components';
import useAddItem from '../../hooks/use-add-item';

const ItemAdd = () => {
	const {
		formData,
		addTag,
		removeTag,
		handleInputChange,
		handleAddItem,
		handleSelectImage,
	} = useAddItem();
	return (
		<div>
			<h2>Add Item</h2>
			<form
				onSubmit={handleAddItem}
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
					<div
						style={{ display: 'flex', justifyContent: 'center' }}
						onClick={handleSelectImage}
					>
						<Avatar
							src={formData.image}
							size='xl'
							style={{
								marginRight: '16px',
							}}
						/>
					</div>
				</div>
				<hr style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }} />

				<Input
					name='type'
					text='Type'
					value={formData.type}
					onChange={handleInputChange}
					options={['shampoo', 't-shirt', 'pants']}
				/>
				<Input
					name='name'
					text='Name'
					value={formData.name}
					onChange={handleInputChange}
				/>
				<Input
					name='description'
					text='Description'
					value={formData.description}
					onChange={handleInputChange}
				/>
				<h3>Tags</h3>
				<Hashtags tags={formData.tags} onSubmit={addTag} onRemove={removeTag} />

				<h3>Valuation</h3>
				<Rating
					text='Convenience'
					name='valuationConvenience'
					onChange={handleInputChange}
				/>
				<Rating
					text='Appearance'
					name='valuationAppearance'
					onChange={handleInputChange}
				/>
				<Rating
					text='Coziness'
					name='valuationComfortableness'
					onChange={handleInputChange}
				/>

				<button
					type='submit'
					style={{ width: 'max-content', padding: '7px 14px' }}
				>
					Add Item
				</button>
			</form>
		</div>
	);
};

export default ItemAdd;
