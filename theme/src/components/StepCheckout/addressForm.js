import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import Lscache from 'lscache';


const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

class CheckoutStepContacts extends React.Component {
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
		console.log( field );
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
			loadingShippingMethods,
			loadingPaymentMethods,
			initialValues,
			settings,
			saveShippingLocation,
			saveShippingMethod,
			savePaymentMethod,
			paymentMethods,
			shippingMethods,
			buttonClassName,
			editButtonClassName,
			isReadOnly,
			title,
			onNext
		} = this.props;

		return (
				<form onSubmit={handleSubmit}>
						<div className='columns' style={{ marginBottom:'50px'}}>
							<div className="column">
								<Field
									name="first_name"
									id="customer.first_name"
									autoComplete="new-password"
									className="address-checkout-field"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('first_name')}
									placeholder={this.getFieldPlaceholder('first_name')}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.postal_code"
									id="shipping_address.postal_code"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('postal_code')}
									placeholder={this.getFieldPlaceholder('postal_code')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ postal_code: value }))
									}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.state"
									id="shipping_address.state"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('state')}
									placeholder={this.getFieldPlaceholder('state')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ state: value }))
									}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.city"
									id="shipping_address.city"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('city')}
									placeholder={this.getFieldPlaceholder('city')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ city: value }))
									}
								/>
							</div>
						</div>
						
						<div className="columns">
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.country"
									id="shipping_address.country"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('country')}
									placeholder={this.getFieldPlaceholder('country')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ country: value }))
									}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.address1"
									id="shipping_address.address1"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('address1')}
									placeholder={this.getFieldPlaceholder('address1')}
									onBlur={(event, value) =>
										setTimeout(() => saveShippingLocation({ address1: value }))
									}
								/>
							</div>
							<div className="column">						
								<Field
									className="address-checkout-field"
									name="shipping_address.address_number_ext"
									id="shipping_address.address_number_ext"
									component={InputField}
									type="number"
									placeholder={this.getFieldPlaceholder('address_number_ext')}
								/>
							</div>
							<div className="column">						
								<Field
									className="address-checkout-field"
									name="shipping_address.address_number_int"
									id="shipping_address.address_number_int"
									component={InputField}
									type="number"
									placeholder={this.getFieldPlaceholder('address_number_int')}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.address_number_int"
									id="shipping_address.address_number_int"
									component={InputField}
									type="number"
									placeholder={this.getFieldPlaceholder('address_number_int')}
								/>
							</div>
						</div>

						<div className="columns">
							<div className="column">
								<button onClick={onNext} className="is-pulled-right">Enviar a esta dirección</button>
							</div>
						</div>

				</form>
		);
	}
}

export default reduxForm({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(CheckoutStepContacts);
