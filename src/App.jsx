import React, { useEffect, useState } from 'react';
import './App.css';

import {
	BrowserRouter as Router,
	NavLink,
	Route,
	Switch,
	useHistory,
	useParams,
} from 'react-router-dom';
import { fetchItem, fetchItems, sync } from './utils/server';
import { compressImage } from './utils/image';

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

				position: 'fixed',
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
	const SIZE = {
		sm: { width: '24px', height: '24px' },
		md: { width: '40px', height: '40px' },
		lg: { width: '56px', height: '56px' },
		xl: { width: '150px', height: '150px' },
	};

	const elementStyle = {
		...SIZE[props.size || 'lg'],
		marginRight: '16px',
		background: 'hsl(220, 13%, 26%)',
		borderRadius: '50%',
		...props.style,
	};

	return props.src ? (
		<img {...props} src={props.src} style={elementStyle} />
	) : (
		<div {...props} style={elementStyle} />
	);
}

function ItemView(props) {
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
				«
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

	function buildImageSelector() {
		const fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');
		fileSelector.setAttribute('accept', 'image/*');
		fileSelector.setAttribute('capture', 'user');

		return fileSelector;
	}

	const handleSelectImage = async () => {
		const imageSelector = buildImageSelector();
		imageSelector.onchange = async (e) => {
			const [file] = e.target.files;

			if (!file) return;

			const compressedImage = await compressImage(file);

			handleInputChange({
				...e,
				target: {
					...e.target,
					name: 'image',
					value: compressedImage,
				},
			});
		};
		imageSelector.click();
	};

	return (
		<div
			className='App'
			style={{
				marginBottom: '56px',
			}}
		>
			<SideBar />
			<div
				style={{
					padding: '16px',
				}}
			>
				<Switch>
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
												alignItems: 'center',
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

											<div>
												<h3>{item.name}</h3>
												<p>{item.description}</p>
											</div>
											<div style={{ marginLeft: 'auto', display: 'grid' }}>
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
					<Route exact path='/items/add'>
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
							<hr
								style={{ margin: '16px 0', borderColor: 'hsl(220, 13%, 50%)' }}
							/>

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

							<button
								type='submit'
								style={{ width: 'max-content', padding: '7px 14px' }}
							>
								Add Item
							</button>
						</form>
					</Route>
					<Route exact path='/items/:id' component={ItemView} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
