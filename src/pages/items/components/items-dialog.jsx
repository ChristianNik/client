import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { fetchItem } from '../../../utils/server';
import { Dialog, RouteAnimationWrapper } from '../../../components';
import useScrollTop from '../../../hooks/use-scroll-top';
import ItemAdd from '../../item-add';
import ItemEditPage from '../../item-edit';
import ItemViewPage from '../../item-view/item-view.page';

const ItemDialog = () => {
	useScrollTop();
	const [item, setItem] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const item = await fetchItem(id);
			setItem(item);
		})();
	}, []);

	if (!item) return null;

	return (
		<Dialog>
			<RouteAnimationWrapper>
				<Route path='/items/add' component={ItemAdd} />
				<Route exact path='/items/:id/edit' component={ItemEditPage} />
				<Route exact path='/items/:id' component={ItemViewPage} />
			</RouteAnimationWrapper>
		</Dialog>
	);
};

export default ItemDialog;
