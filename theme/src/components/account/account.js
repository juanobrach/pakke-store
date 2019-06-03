import React from 'react';
import api from '../../../dist/lib/api';
import { Redirect, Link } from 'react-router-dom';
import Lscache from 'lscache';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import AddressForm from './addressForm';
import { formatCurrency, formatNumber } from '../../lib/helper';
import moment from 'moment';



const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};


const formateDate = (date, settings) =>{

	moment.locale('es');
	const dateCreated = moment( date );
	const day = dateCreated.format('D')
	const monthYear = dateCreated.format('MMMM YYYY');
	return day +' de '+ monthYear;
}



const InputField = field => (
	<div className={field.className}>
		<label htmlFor={field.id}>
			{field.label}
			{field.meta.touched &&
				field.meta.error && <span className="error">{field.meta.error}</span>}
		</label>
		<input
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
			id={field.id}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
	</div>
);

class Account extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reinitialized: false,
			cartLayer: false,
			modalOpen: false,
			modalContent: '',
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

	}

	setInitialValues() {
		this.props.initialize({
	
			first_name: this.props.customerProperties.customer_settings.first_name,
			last_name: this.props.customerProperties.customer_settings.last_name,
			email: this.props.customerProperties.customer_settings.email,
			password: this.props.customerProperties.customer_settings.password,
			billing_address: {
				address1: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].address1 : '',
				address2: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].address2 : '',
				city: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].city : '',
				postal_code: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].postal_code : '',
				state: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].state : '',
				country: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[0].country : ''
			}, shipping_address: {
				address1: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].address1 : '',
				address2: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].address2 : '',
				city: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].city : '',
				postal_code: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].postal_code : '',
				state: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].state : '',
				country: this.props.customerProperties.customer_settings.addresses.length > 0 ? this.props.customerProperties.customer_settings.addresses[1].country : ''
			}
		});
		this.setState({ reinitialized: true });
		this.setState({ emailValues: this.props.customerProperties.customer_settings.email });
	}

	getField = fieldName => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find(item => item.name === fieldName);
		return field;
	};

	getFieldStatus = fieldName => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = fieldName => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	isFieldHidden = fieldName => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}

		return validatorsArray;
	};

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	getFieldLabelText = fieldName => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'first_name':
					return text.first_name;
					break;
				case 'last_name':
					return text.last_name;
					break;
				case 'email':
					return text.email;
					break;
				case 'mobile':
					return text.mobile;
					break;
				case 'password':
					return text.password;
					break;
				case 'password_verify':
					return text.password_verify;
					break;
				case 'address1':
					return text.address1;
					break;
				case 'address2':
					return text.address2;
					break;
				case 'country':
					return text.country;
					break;
				case 'state':
					return text.state;
					break;
				case 'city':
					return text.city;
					break;
				case 'postal_code':
					return text.postal_code;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	getTableHeaderLabel = tableHeaderLabel => {
		switch (tableHeaderLabel) {
			case 'product_image':
				return text.product_image;
			case 'id':
				return text.order_line_id;
			case 'product_id':
				return text.product_id;
			case 'variant_id':
				return text.product_variant_id;
			case 'quantity':
				return text.product_qty;
			case 'discount_total':
				return text.product_discount_total;
			case 'name':
				return text.product_name;
			case 'price':
				return text.product_price;
			case 'price_total':
				return text.product_price_total;
			case 'sku':
				return text.product_sku;
			case 'tax_class':
				return text.product_tax_class;
			case 'tax_total':
				return text.product_tax_total;
			case 'variant_name':
				return text.product_variant_name;
			case 'weight':
				return text.product_weight;
			default:
				return 'Unnamed field';
		}
	};

	getFieldLabel = fieldName => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};

	handleContactsEdit = () => {
		this.setState({ profileEdit: true });
	};

	handleOpenModal = ( modalContent ) => {
		this.setState({
			modalOpen: true,
			modalContent: modalContent
		})
	}

	handleCloseModal = () => {
		this.setState({
			modalOpen: false,
			modalContent: ''
		})
	}

	render() {
		const { handleSubmit,
				customerProperties,
				cartlayerBtnInitialized,
				cart,
				initialValues,
				settings,
				addCustomerAddress
		} = this.props;
		const accountInputField = 'account-field';
		const accountForm = 'account-form';
		const titleClassName = 'login-title';
		const accountEditButtonClass = 'account-button button';
		const accountHeaderMenueContainer = 'account-header-menue-container';
		const accountHeaderMenueItems = 'account-header-menue-items';
		const accountProfileContainer = 'account-profile-container';
		const accountProfileList = 'account-profile-list';
		const accountButtonContainer = 'account-button-container';
		const continueShoppingButton = 'continue-shopping-button account-button button';
		const accountProfileHeadline = 'account-profile-headline';
		const isActive = 'is-active';

		let billingAddress = {};
		let shippingAddress = {};
		
		let addresses = [];
		let address = {};

		let orderHistory = {};
		const list = [];
		let tableStyle = null;
		let keyCounter = 0;
		let listHeader = [];

		if (customerProperties === undefined || Lscache.get('auth_data') === null) {
			return (
			  	<Redirect to={{
					pathname: '/login'
				}}/>
			);
		}

		if (customerProperties !== undefined && customerProperties.cartLayer && Lscache.get('auth_data') !== null) {
			return (
				<Redirect to={{
					pathname: '/checkout'
				}}/>
			);
		}

		if (customerProperties !== undefined) {
			console.log( customerProperties )
			if (customerProperties.customer_settings !== null && 'addresses' in customerProperties.customer_settings) {
				[].slice.call(customerProperties.customer_settings.addresses).forEach(function(key, i) {
					address = {};
					address.address_pakke_id = key.address_pakke_id;
					address.full_name = key.full_name;
					address.postal_code = key.postal_code;
					address.state = key.state;
					address.city = key.city;
					address.address1 = key.address1;
					address.neighborhood = key.neighborhood;
					address.address_num_ext = key.address_num_ext;
					address.address_num_int = key.address_num_int;
					address.phone = key.phone;
					address.address_type = key.address_type;
					address.details = key.details;
					addresses.push( address );
				});
				orderHistory = customerProperties.order_statuses.data.filter(obj => obj.draft !== true).reduce(function(map, obj, i) {
					map['ordered_items' + i] = obj;
					return map;
				}, {});
			}
			const orders = [];
			keyCounter = 0;
			// TODO numer de guia y fecha de entrega de pakke
			for(var i in orderHistory) {
				let orderCreatedAt = formateDate( orderHistory[i].date_created, settings );
				let grandTotal = orderHistory[i].grand_total;
				let orderNumber = orderHistory[i].number;
				let sendTo = orderHistory[i].shipping_address.full_name;
				let guideNumber = "TBM018081738009";
				let sendedOn = "07 Marzo 2019"
				orders.push( 
					<li key={i}>
						<div className="columns">
							<div className="column is-9">
								<p className="is-marginless">Realizado el</p>
								<strong>{orderCreatedAt}</strong>											
							</div>
							<div className="column">
								<p className="is-marginless">Total</p>
								<strong>{ formatCurrency(grandTotal, settings) }</strong>	
							</div>
						</div>
						<p>Pedido Nº  <span>{orderNumber}</span></p>
						<p>Enviado a: <span>{ sendTo}</span></p>
						<p>Nº de guía:  <span>{guideNumber}</span></p>
						<p>Entregado el<span> {sendedOn}</span></p>
						<div className="options">
							<Link to={`/customer-account/order/${orderNumber}`}>Ver detalles del pedido</Link>
						</div>
					</li>
				)
			};
			if( orders.length <= 0 ){
				orders.push(<li>Aun no tienes pedidos</li>)
			}

			const addresses_container = [];
			for (var i in addresses ) {
				addresses_container.push(
					<li key={i}>
						<div className="columns">
							<div className="column is-7">
								<strong>{addresses[i].full_name}</strong>
								<p className="is-marginless"><span>{addresses[i].address1}</span></p>
								<p className="is-marginless">{addresses[i].neighborhood} {addresses[i].city}, {addresses[i].state} {addresses[i].postal_code}</p>
								<p className="is-marginless">Tel contacto: {addresses[i].phone}</p>
							</div>
							<div className="column is-5 options" style={{textAlign:"right", lineHeight:'27px'}}>
								<a href="#" className="delete-link">Eliminar</a>
								<a href="#">Editar</a>
								<a href="#">Predeterminada</a>
							</div>
						</div>
					</li>

				)
			}



			if (this.state.profileEdit && !this.state.reinitialized ) {
				this.setInitialValues();
			}

			tableStyle = {
				align: 'center'
			};

			return (
				<React.Fragment>
					<div className="account-container">
						<div className="account-section">
							<h2 className={'has-text-left ' + titleClassName}>
								Mi cuenta
							</h2>
						</div>
						<div className="columns">
							<div className="column is-4">
								<h4>Mis pedidos</h4>
								<ul className="orders_history_list">
									{orders}
								</ul>
							</div>
							<div className="column is-4">
								<h4>Mis datos</h4>
								<ul className="customer-data">
									<li>
										<strong>{customerProperties.customer_settings.first_name} {customerProperties.customer_settings.last_name}</strong>
										<p className="is-marginless">{customerProperties.customer_settings.email}</p>
										<p className="is-marginless">Tel: {customerProperties.customer_settings.mobile}</p>
										<div className="options">
											<a href="#" onClick={ ()=> { this.handleOpenModal('contact') } }>Editar</a>   |  <a href="#">Cambiar contraseña</a>
										</div>
									</li>
								</ul>
							</div>
							<div className="column is-4">
								<h4>Mis direcciones</h4>
								<ul className="orders_history_list">
									{addresses_container}
								</ul>
								<div className="addd-new-address btn-account-container">
									<a href="#">
										<div className="columns is-gapless">
											<div className="column is-1">
												<img src="/assets/images/icons/delivery-truck.png" alt="" />
											</div>
											<div className="column is-11">
												<button className="btn-account"  onClick={ ()=> { this.handleOpenModal('address') } }>
													<p>	
														<span>
															<img src="/assets/images/icons/add-icon.png" alt="" />
														</span>
														Agregar nueva dirección
													</p>
												</button>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div className={"account-modal modal " + ( this.state.modalOpen ? "is-active" : "") }>
						  <div className="modal-background"></div>
						  <div className="modal-content">
						  	{ this.state.modalContent == 'contact' &&
									<AddressForm  handleCloseModal={this.handleCloseModal} customerProperties={customerProperties} addCustomerAddress={addCustomerAddress} />
						  	}
						  	{ this.state.modalContent == 'address' &&
									<AddressForm  handleCloseModal={this.handleCloseModal} customerProperties={customerProperties} addCustomerAddress={addCustomerAddress} />
						  	}
						  </div>
						</div>
					</div>
				</React.Fragment>
			)
		}
	}
}
export default reduxForm({
	form: 'Account',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(Account);
