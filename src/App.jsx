import React, { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

const DEFAULT_TYPES = new Set(['shampoo', 't-shirt', 'pants']);

const API = {
	itemsUrl: 'http://localhost:3000/items',
	itemsAddUrl: 'http://localhost:3000/items',
};

function useItems() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		(async () => {
			const data = await fetch(API.itemsUrl)
				.then((response) => response.json())
				.catch(() => []);

			setItems(data);
		})();
	}, []);

	return items;
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
					name={props.name}
					type={props.type}
					value={props.value}
					onChange={props.onChange}
					style={{ width: 'max-content', padding: '7px 14px' }}
				/>
			</label>
			{props.options && (
				<datalist id={`list-{$props.name}`}>
					{props.options.map((option) => (
						<option value={option} />
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

function App() {
	const items = useItems();
	console.log(makeId());
	const [formData, setFormData] = useState({
		id: makeId(20),
		type: '',
		name: 'Hose',
		description: 'Eine einfache test Hose',
		valuationConvenience: '5',
		valuationAppearance: '4',
		valuationComfortableness: '1',
		image: 'data:image/png;base64,...',
	});

	const handleInputChange = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleAddItem = (e) => {
		e.preventDefault();

		fetch(API.itemsAddUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
	};

	return (
		<Router>
			<div className='App'>
				<nav>
					<NavLink to='/items'>Items</NavLink>
					<NavLink to='/items/add'>New</NavLink>
				</nav>
				<Route exact path='/items'>
					<ul>
						{items.map((item) => {
							return (
								<li key={item._id}>
									<h3>{item.name}</h3>
									<p>{item.description}</p>
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
							gap: '5px',
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

						<button
							type='submit'
							style={{ width: 'max-content', padding: '7px 14px' }}
						>
							Add Item
						</button>
					</form>
				</Route>
			</div>
		</Router>
	);
}

export default App;
