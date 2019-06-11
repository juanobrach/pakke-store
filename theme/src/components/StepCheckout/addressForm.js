import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';
import { formatCurrency } from '../../lib/helper';
import InputField from './inputField';
import SepomexField from './SepomexField';

import api from '../../lib/api';
import axios from 'axios';

import Lscache from 'lscache';


const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;


class AddressForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				form:{
					states:[],
					cities:[],
					colonies:[]
				}
		}
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

	fetchStateAndCity =(cp)=>{
			axios({
			method:'POST',
			url:`${api.ajaxBaseUrl}/sepomex/getCities`,
			data: { cp: cp }
		}).then( ( res )=>{
			
		
			if( res.data ){
				let states = [];
				if( res.data.state.length > 0){
					let state = {
						text: res.data.state[0],
						value: res.data.state[0]
					}
					states.push( state );
				}

				let cities = [];
				if( res.data.city.length > 0){
					let city = {
						text: res.data.city[0],
						value: res.data.city[0]
					}
					cities.push( city );
				}				

				let colonies = [];
				if( res.data.colonies.length > 0){
					colonies = res.data.colonies.map( ( colony )=>{
						return{
							text: colony,
							value: colony							
						}
					})
				}	
				




				this.setState({
					['states']: "",
					['cities']: "",
					['colonies']: "",

					form:{ 
						states:states,
						cities:cities,
						colonies:colonies
					}} 
				);
			} 
		})
	}


	handleOnChange(propertyName, event) {
      if (event && event.target) {


      		if( propertyName == 'postal_code'){
      			if( event.target.value.toString().length <= 5){
      				this.setState({[propertyName]: event.target.value}); //For Input And Radio
      				this.fetchStateAndCity(event.target.value);
      			}else if( propertyName === "state"){
      				this.setState({[propertyName]: event.target.value})
      			}else{
      				event.preventDefault();
      			}
      		}else{
          	this.setState({[propertyName]: event.target.value}); //For Input And Radio
      		}


      }
      else {
          this.setState({[propertyName]: event});//For Date
      }
	}

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
			title,
			onChange,
		} = this.props;

		return (
				<form onSubmit={handleSubmit}>
						<div className='columns is-variable is-5'>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.full_name"
									id="shipping_address.full_name"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('first_name')}
									label="Nombre de quien recibe"
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.postal_code"
									id="shipping_address.postal_code"
									component={InputField}
									type="number"
									validate={this.getFieldValidators('postal_code')}
									label="Código postal"
									onChange={ (e)=>{ this.handleOnChange('postal_code',e)} }
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.state"
									id="shipping_address.state"
									component={SepomexField}
									validate={this.getFieldValidators('state')}
									label="Estado"
									data={this.state.form.states}
									{...this.props}
								/>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.city"
									id="shipping_address.city"
									component={SepomexField}
									validate={this.getFieldValidators('city')}
									label="Ciudad"
									data={this.state.form.cities}
									{...this.props}
								/>
							</div>
						</div>
						
						<div className="columns is-variable is-5">
							<div className="column is-3">
								<Field
									className="address-checkout-field"
									name="shipping_address.neighborhood"
									id="shipping_address.neighborhood"
									component={SepomexField}
									type="text"
									label="Colonia"
									data={this.state.form.colonies}
									validate={this.getFieldValidators('neighborhood')}
									showArrow={true}
									{...this.props}
								/>
							</div>
							<div className="column is-4">
								<Field
									className="address-checkout-field"
									name="shipping_address.address1"
									id="shipping_address.address1"
									component={InputField}
									type="text"
									validate={this.getFieldValidators('address1')}
									label="Nombre de la calle"
								/>
							</div>
							<div className="column is-3">													
								<Field
									className="address-checkout-field"
									name="shipping_address.address_num_ext"
									id="shipping_address.address_num_ext"
									component={InputField}
									validate={this.getFieldValidators('address_num_ext')}
									type="number"
									label="Nº exterior"
								/>
							</div>
							<div className="column is-2">						
								<Field
									className="address-checkout-field"
									name="shipping_address.address_num_int"
									id="shipping_address.address_num_int"
									component={InputField}
									type="number"
									label="Nº interior"
								/>
							</div>
						</div>
						<div className="columns is-variable is-5">
							<div className="column is-3">
								<Field
									className="address-checkout-field"
									name="shipping_address.phone"
									id="shipping_address.phone"
									component={InputField}
									type="number"
									label="Teléfono móvil"
								/>
							</div>

							<div className="column is-3">
								<Field
									className="address-checkout-field"
									name="shipping_address.address_type"
									id="shipping_address.address_type"
									component={InputField}
									label={"Tipo de dirección"}
								>
								  <option name="Residencial">Residencial</option>
								</Field>
							</div>
							<div className="column">
								<Field
									className="address-checkout-field"
									name="shipping_address.details"
									id="shipping_address.details"
									component={InputField}
									type="text"
									label="Referencias para ubicar mejor el domicilio"
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
	keepDirtyOnReinitialize: true,
	asyncBlurFields: []
})(AddressForm);
