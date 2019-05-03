import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import SelectField from './selectField';

import Lscache from 'lscache';


const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

class AddressForm extends React.Component {
	constructor(props) {
		super(props);
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

	confirmPassword = value => {
		if(value !== this.state.comparePassword ) {
			return text.password_verify_failed;
		}
		return undefined;
	}

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};


	render() {
		const {
			handleSubmit,
			customerProperties,
			pristine,
			invalid,
			valid,
			reset,
			submitting,
			saveShippingLocation,
			buttonClassName,
			editButtonClassName,
			isReadOnly,
			title
		} = this.props;

		return (
				<form onSubmit={handleSubmit}>
						<div className='columns is-variable is-5' style={{ marginBottom:'50px'}}>
							<div className="column">
								<h4>Nombre de quien recibe</h4>
								<Field
									name="shipping_address.full_name"
									id="shipping_address.full_name"
									className="address-checkout-field"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('first_name')}
									placeholder={this.getFieldPlaceholder('first_name')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ full_name: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ postal_code: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ state: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ city: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ neighborhood: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ address1: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ address_num_ext: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ address_num_int: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ phone: value }))
									}
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
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ details: value }))
									}
								/>
							</div>
						</div>

						<div className="columns is-pulled-right">
							<div className="column">
								<button
									type="submit"
									disabled={invalid}
									className={buttonClassName}
								>
									Entregar en esta dirección
								</button>
							</div>
						</div>

				</form>
		);
	}
}

export default reduxForm({
	form: 'AddressForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(AddressForm);
