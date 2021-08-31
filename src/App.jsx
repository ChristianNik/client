import React, { useEffect, useState } from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	NavLink,
	Route,
	useHistory,
} from 'react-router-dom';
import { fetchItems, sync } from './utils/server';
import { parseImageBase64 } from './utils/image';

const DEFAULT_TYPES = new Set(['shampoo', 't-shirt', 'pants']);

function useItems() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await fetchItems();

			setItems(data);
		})();
	}, []);

	const addItem = async (data) => {
		setItems((prev) => [...prev, { ...data, created: Date.now() }]);
	};

	const removeItem = async (id) => {
		setItems((prev) =>
			prev.map((v) =>
				v.id != id
					? v
					: {
							...v,
							flag_mark_deleted: true,
					  }
			)
		);
	};

	return {
		items,
		setItems,
		addItem,
		removeItem,
	};
}

function Input(props) {
	return (
		<>
			<label
				htmlFor={props.name}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{props.text}:
				<input
					list={props.options && `list-{$props.name}`}
					id={props.name}
					name={props.name}
					type={props.type}
					value={props.value}
					onChange={props.onChange}
					style={{ padding: '7px 14px' }}
				/>
			</label>
			{props.options && (
				<datalist id={`list-{$props.name}`}>
					{props.options.map((option) => (
						<option key={option} value={option} />
					))}
				</datalist>
			)}
		</>
	);
}

function makeId(length = 20) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function SideBar(props) {
	return (
		<nav
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
				alignItems: 'center',

				position: 'absolute',
				top: 'calc(100% - 56px)',

				width: '100%',
				minHeight: '56px',
				backgroundColor: 'hsl(220, 13%, 50%)',
			}}
		>
			<NavLink to='/items'>Items</NavLink>
			<NavLink to='/items/add'>New</NavLink>
		</nav>
	);
}

function Avatar(props) {
	return props.src ? (
		<img
			{...props}
			src={props.src}
			style={{
				marginRight: '16px',
				width: '56px',
				height: '56px',
				background: 'hsl(220, 13%, 26%)',
				borderRadius: '50%',
			}}
		/>
	) : (
		<div
			{...props}
			style={{
				width: '56px',
				height: '56px',
				background: 'hsl(220, 13%, 26%)',
				borderRadius: '50%',
				...props.style,
			}}
		/>
	);
}

function App() {
	const { items, setItems, addItem, removeItem } = useItems();
	const history = useHistory();

	const [formData, setFormData] = useState({
		id: makeId(20),
		type: '',
		name: '',
		description: 'Eine einfacher test.',
		valuationConvenience: '5',
		valuationAppearance: '4',
		valuationComfortableness: '1',
		image: '',
	});

	const handleInputChange = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleAddItem = async (e) => {
		e.preventDefault();

		await addItem(formData);
		history.push('/items');
	};

	return (
		<div className='App'>
			<SideBar />
			<Route exact path='/items'>
				<button
					onClick={() => {
						sync(items, (data) => {
							console.log('data :', data);
							setItems(data);
						});
					}}
				>
					Sync
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
									}}
								>
									<Avatar
										src={item.image}
										style={{
											marginRight: '16px',
										}}
									/>
									<div>
										<h3>{item.name}</h3>
										<p>{item.description}</p>
										<button
											onClick={() => {
												removeItem(item.id);
												// fetch(`${API.itemsRemoveUrl}/${item.id}`, {
												// 	method: 'DELETE',
												// })
											}}
										>
											remove
										</button>
									</div>
								</li>
							);
						})}
				</ul>
			</Route>
			<Route path='/items/add'>
				<h2>Add Item</h2>
				<form
					onSubmit={handleAddItem}
					style={{
						display: 'grid',
						gap: '8px',
						padding: '16px',
					}}
				>
					<Input
						name='type'
						text='Type'
						value={formData.type}
						onChange={handleInputChange}
						options={[...DEFAULT_TYPES]}
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

					<h3>Valuation</h3>
					<Input
						name='valuationConvenience'
						text='Convenience'
						value={formData.valuationConvenience}
						onChange={handleInputChange}
					/>
					<Input
						name='valuationAppearance'
						text='Appearance'
						value={formData.valuationAppearance}
						onChange={handleInputChange}
					/>
					<Input
						name='valuationComfortableness'
						text='Coziness'
						value={formData.valuationComfortableness}
						onChange={handleInputChange}
					/>

					<label htmlFor='imageFile'>Upload a photo of yourself:</label>
					<input
						type='file'
						id='imageFile'
						capture='user'
						accept='image/*'
						name='image'
						onChange={async (e) => {
							if (!e.target.files[0]) return;
							handleInputChange({
								...e,
								target: {
									...e.target,
									name: 'image',
									value: await parseImageBase64(e.target.files[0]),
								},
							});
						}}
					/>

					<button
						type='submit'
						style={{ width: 'max-content', padding: '7px 14px' }}
					>
						Add Item
					</button>
				</form>
			</Route>
		</div>
	);
}

export default App;
