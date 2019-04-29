import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { text } from '../lib/settings';
import * as helper from '../lib/helper';

const getCheckoutField = (checkoutFields, fieldName) => {
	if (checkoutFields && checkoutFields.length > 0) {
		return checkoutFields.find(
			f => f.name === fieldName && f.status !== 'hidden'
		);
	}
	return null;
};

const MobileField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'mobile');
	return checkoutField && order.mobile !== '' ? (
		<ShippingFieldDiv
			label={helper.getCheckoutFieldLabel(checkoutField)}
			value={order.mobile}
		/>
	) : null;
};

const CityField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'city');
	return checkoutField && order.shipping_address.city !== '' ? (
		<ShippingFieldDiv
			label={helper.getCheckoutFieldLabel(checkoutField)}
			value={order.shipping_address.city}
		/>
	) : null;
};

const CommentsField = ({ order, checkoutFields }) => {
	const checkoutField = getCheckoutField(checkoutFields, 'comments');
	return checkoutField && order.comments !== '' ? (
		<ShippingFieldDiv
			label={helper.getCheckoutFieldLabel(checkoutField)}
			value={order.comments}
		/>
	) : null;
};

const ShippingFields = ({ order, shippingMethod }) => {
	let shippingFields = null;
	if (
		shippingMethod &&
		shippingMethod.fields &&
		shippingMethod.fields.length > 0
	) {
		shippingFields = shippingMethod.fields.map((field, index) => {
			const fieldLabel = helper.getShippingFieldLabel(field);
			const fieldValue = order.shipping_address[field.key];

			return (
				<ShippingFieldDiv key={index} label={fieldLabel} value={fieldValue} />
			);
		});
	}

	return <div>{shippingFields}</div>;
};

const ShippingFieldDiv = ({ label, value }) => (
	<div className="shipping-field">
		<label>{label}: </label>
		{value}
	</div>
);

const OrderItem = ({ item, settings }) => (
	<div className="columns is-mobile is-gapless checkout-success-row">
		<div className="column is-6">
			{item.name}
			<br />
			<span>{item.variant_name}</span>
		</div>
		<div className="column is-2 has-text-right">
			{helper.formatCurrency(item.price, settings)}
		</div>
		<div className="column is-2 has-text-centered">{item.quantity}</div>
		<div className="column is-2 has-text-right">
			{helper.formatCurrency(item.price_total, settings)}
		</div>
	</div>
);

const OrderItems = ({ items, settings }) => {
	if (items && items.length > 0) {
		const rows = items.map(item => (
			<OrderItem key={item.id} item={item} settings={settings} />
		));
		return <div>{rows}</div>;
	}
	return null;
};

const CheckoutSuccess = ({
	order,
	settings,
	pageDetails,
	shippingMethod,
	checkoutFields
}) => {
	if (order && order.items && order.items.length > 0) {
		return (
			<div className="checkout-success-details">
				<h1 className="checkout-success-title">
					<img src="/assets/images/card_success.svg" alt="" />
					<br />
					Gracias por tu pago
				</h1>

				<div className="columns is-centered" style={{ marginBottom: '3rem' }}>
					<div className="column is-6 checkout-success-order-detail has-text-centered">
						<p>
							El cargo por  <span> { helper.formatCurrency(order.grand_total, settings)  }</span> se realizó con éxito,  
						</p>
						<p>
							el núm. de folio de la compra es: <span> {order.number} </span>
						</p>
					</div>
				</div>
				<div className="columns is-centered">
					<div className="column is-12">
						<p>En breve te llegará por correo electrónico con toda la información y el comprobante de la compra.</p>
					</div>
				</div>
				<div className="columns is-centered">
					<div className="column is-12">
						<p className="redirect-message">
							En breve serás redireccionado al inicio de la tienda
						</p>
					</div>
				</div>
			</div>
		);
	}
	return <div className="has-text-centered">{text.cartEmpty}</div>;
};

CheckoutSuccess.propTypes = {
	order: PropTypes.shape({}),
	settings: PropTypes.shape({}).isRequired,
	pageDetails: PropTypes.shape({}).isRequired,
	shippingMethod: PropTypes.shape({}).isRequired,
	checkoutFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

CheckoutSuccess.defaultProps = {
	order: null
};

export default CheckoutSuccess;
