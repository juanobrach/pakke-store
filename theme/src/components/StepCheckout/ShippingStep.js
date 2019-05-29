import React from 'react';
import Lscache from 'lscache';
import AddressForm from './addressForm';
import { themeSettings, text } from '../../lib/settings';
import { Field, reduxForm } from 'redux-form';
import InputField from './inputField';



const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};

class ShippingStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedin: false,
			reinitialized: false,
			emailValues: '',
			comparePassword: ''
		}
	}

	componentDidMount() {
		if (Lscache.get('auth_data') !== null) {
			this.setState({ loggedin: true });
		}
	}


	render(){
		const {
			customerProperties,
			handleContactsSubmit,
			handleSetFetchedShipping,
			saveShippingLocation,
			checkoutFields,
			customerProperties:{ 
				customer_settings : { addresses }
			}} = this.props;
		
		// Guardo pakke como metood de
		console.log( addresses );
		return(
			<div className="shipping-step">
				<section style={{ overflow:'hidden'}}>
					<h3>
						Dirección más reciente
					</h3>
					<div className='columns'>
						{
							addresses.length > 0 ? addresses.map( (address, i ) => {
								return (<div  key={i} className="column is-one-quarter boxAddress">
																	<div>
																		<h5>{address.full_name}</h5>
																		<p>{address.address1}, piso 1, Next-cloud Lomas Altas, Ciudad de México, Ciudad de México, 11950</p>
																		<p>Nº móvil:{address.phone}</p>
																	</div>
																	<button onClick={ ()=>{handleSetFetchedShipping(i)}}>Enviar a esta dirección más reciente</button>
																</div>)
							}) : ''
						}
					</div>
					<div className="columns">
						<div className="column is-half divisor">
							<hr />
						</div>
					</div>
				</section>
				<section>
					<h3>
						Agregar nueva dirección
					</h3>
					<AddressForm
						checkoutFields={checkoutFields}
						onSubmit={handleContactsSubmit}
						saveShippingLocation={saveShippingLocation}						
					/>
				</section>
			</div>
		)
	}
}

export default reduxForm({
	form: 'ShippingStep',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(ShippingStep);

