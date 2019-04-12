import React from 'react';
import Lscache from 'lscache';
import CheckoutStepContacts from './addressForm';
import { themeSettings, text } from '../../lib/settings';

export default class ShippingStep extends React.Component {

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
			handleLocationSave,
			checkoutFields,
			onSubmit,
			onNext
		} = this.props;

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;


		return(
			<div className="shipping-step">
				<section>
					<h3>
						Dirección más reciente
					</h3>

					<div className='columns'>
						<div className="column is-one-quarter boxAddress">
							<div>
								<h5>Luis Miguel Hernandez</h5>
								<p>Av. Constituyentes No. 908, piso 1, Next-cloud Lomas Altas, Ciudad de México, Ciudad de México, 11950</p>
								<p>Nº móvil: 55 5989 4261</p>
							</div>
							<button onClick={onNext}>Enviar a esta dirección más reciente</button>
						</div>
						<div className="column is-one-quarter boxAddress">
							<div >
								<h5>Antonio Hernández</h5>
								<p>Acacias 243-117, Col del Bosque Guasave <br />
								 Sinaloa 81040</p>
								<p>Nº móvil: 687 872 9786</p>
							</div>
							<button onClick={onNext}>Enviar a esta dirección</button>
						</div>
					</div>
					<div className="columns">
						<div className="column is-half divisor">
							<hr/>
						</div>
					</div>
				</section>
				<section>
					<h3>
						Agregar nueva dirección
					</h3>
					<CheckoutStepContacts
						checkoutFields={checkoutFields}
						onSubmit={onSubmit}
						onNext={onNext}
						
					/>
				</section>
			</div>
		)
	}
}
