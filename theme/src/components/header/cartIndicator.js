import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';

const CartCount = ({ cart }) => {
	if (cart && cart.items && cart.items.length > 0) {
		const itemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);
		return <span className="cart-count">{itemsCount}</span>;
	}
	return null;
};

const CartIcon = ({ cartIsActive }) => {
	if (cartIsActive) {
		return (
			<img
				src="/assets/images/close.svg"
				className="icon"
				alt={text.close}
				title={text.close}
				style={{ minWidth: 24, padding: 4 }}
			/>
		);
	}
	return (
		<React.Fragment>
			<img
				src="/assets/images/icons/cart-icon.png"
				alt={text.cart}
				title={text.cart}
				style={{ minWidth: 29, minHeight: 21 }}
			/>
			<span>Carrito</span>
		</React.Fragment>
	);
};

export default class CartIndicator extends React.PureComponent {
	render() {
		const { cart, onClick, cartIsActive } = this.props;
		return (
			<span className="cart-button leve-item" onClick={onClick}>
				<CartIcon cartIsActive={cartIsActive} />
				<CartCount cart={cart} />
			</span>
		);
	}
}
