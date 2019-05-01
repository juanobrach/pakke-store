import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import SelectField from './selectField';

import Lscache from 'lscache';


const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

class AccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
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

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}
		if (fieldName === 'password_verify') {
			validatorsArray.push(this.confirmPassword);
		}

		return validatorsArray;
	};


	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	handleUpdateAccount = form => {
		this.props.addCustomerAddress( this.props.customerProperties.customer_settings.id, form)
		this.props.handleCloseModal()
	}


	render() {
		const {
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			saveShippingLocation,
			buttonClassName,
			editButtonClassName,
			isReadOnly,
			title,
			handleCloseModal,
			handleSubmit
		} = this.props;

		return (
				<form onSubmit={handleSubmit(this.handleUpdateAccount)} className="modal-address-form">
						<h3>Mis datos</h3>
						<div className='columns is-variable is-5' style={{ marginBottom:'50px'}}>
							<div className="column">
								<h4>Nombre de quien recibe</h4>
								<Field
									name="first_name"
									id="first_name"
									className="address-checkout-field"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('first_name')}
									placeholder={this.getFieldPlaceholder('first_name')}
								/>
							</div>
							<div className="column">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.postal_code"
									id="shipping_address.postal_code"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('postal_code')}
									placeholder="Código postal"
								/>
							</div>
							<div className="column">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.state"
									id="shipping_address.state"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('state')}
									placeholder="Estado"
								/>
							</div>
							<div className="column">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.city"
									id="shipping_address.city"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('city')}
									placeholder="Ciudad"
								/>
							</div>
						</div>
						
						<div className="columns is-variable is-5">
							<div className="column is-3">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.neighborhood"
									id="shipping_address.neighborhood"
									component={InputField}
									type="text"
									placeholder="Colonia"
								/>
							</div>
							<div className="column is-4">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.address1"
									id="shipping_address.address1"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('address1')}
									placeholder="Nombre de la calle"
								/>
							</div>
							<div className="column is-3">	
								<h4></h4>												
								<Field
									className="address-checkout-field"
									name="shipping_address.address_num_ext"
									id="shipping_address.address_num_ext"
									component={InputField}
									type="number"
									placeholder="Nº exterior"
								/>
							</div>
							<div className="column is-2">
								<h4></h4>						
								<Field
									className="address-checkout-field"
									name="shipping_address.address_num_int"
									id="shipping_address.address_num_int"
									component={InputField}
									type="number"
									placeholder="Nº interior"
								/>
							</div>
						</div>
						<div className="columns is-variable is-5">
							<div className="column is-3">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.phone"
									id="shipping_address.phone"
									component={InputField}
									type="number"
									placeholder="Teléfono móvil"
								/>
							</div>

							<div className="column is-3">
								<h4>Tipo de dirección</h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.address_type"
									id="shipping_address.address_type"
									component={SelectField}
								>
								  <option name="Residencial">Residencial</option>
								</Field>
							</div>
							<div className="column">
								<h4></h4>
								<Field
									className="address-checkout-field"
									name="shipping_address.details"
									id="shipping_address.details"
									component={InputField}
									type="text"
									placeholder="Referencias para ubicar mejor el domicilio"
								/>
							</div>
						</div>

						<div className="columns">
							<div className="column">
								<button onClick={handleCloseModal} className="cancel-button">Cancelar</button>
							</div>
							<div className="column has-text-right">
								<button
									type="submit"
									disabled={invalid}
									className={buttonClassName}
								>
									Agregar nueva dirección
								</button>
							</div>
						</div>
				</form>
		);
	}
}

export default reduxForm({
	form: 'AccountForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(AccountForm);
