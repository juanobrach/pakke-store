import React from 'react';
import { Redirect } from 'react-router-dom';
import Lscache from 'lscache';
import Order from './order';

export default class OrderDetails extends React.Component {
	constructor(props) {
		super(props);
		console.log('props',props)
	}

	render() {

		const {
      		settings,
			customerProperties,
			currentPage
		} = this.props.state;

		Lscache.flushExpired();

		if (Lscache.get('auth_data') === null && customerProperties === undefined) {
			return (
			  <Redirect to={{
						pathname: '/login'
				}}/>
			);
		} else {
			const cacheTimeStamp = localStorage.getItem('lscache-auth_data-cacheexpiration');
			if (Number (cacheTimeStamp) <= Math.floor((new Date().getTime()) / 1000)) {
				console.log('flush ')
				Lscache.flush();
				return (
					<Redirect to={{
						pathname: '/login'
					}}/>
				)
			}

			return (
				<Order
					settings={settings}
					data={currentPage.data}
				/>
			);
		}
	}
}
