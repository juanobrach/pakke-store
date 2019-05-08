import React from 'react';
import { Link } from 'react-router-dom';

import AuthHeader from '../../../../src/server/auth-header';
import { Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Register from './register';

export default class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			verifiedToken: false
		}
	}

	handleContactsSubmit = values => {

 		this.props.registerUser({
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
            password: AuthHeader.encodeUserPassword(values.password),
            history: this.props.history
		})		
	};


	verifyToken() {
		this.setState( {verifiedToken: true } );
		this.props.registerUser({
			token: this.props.location.search.split('=')[1]
		});
	} 

	render() {

		const {
			settings,
			registerProperties,
			registerFormSubmiting
		} = this.props.state;


		if (this.props.location.search !== '' && this.props.location.search.indexOf('?token=') !== -1) {		
			!this.state.verifiedToken ? this.verifyToken() : '';
		}

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		const paymentMethods = [
			{
				img:'/assets/images/payment/meses_sin_interes.png',
				alt: '3, 6, 9 Y 12 meses sin interes en todas las tarjetas'
			},
			{
				img:'/assets/images/payment/mastercard.png',
				alt: 'Mastercard'
			},
			{
				img:'/assets/images/payment/visa.png',
				alt: 'Visa'
			},
			{
				img:'/assets/images/payment/american_express.png',
				alt: 'American Express'
			},
			{
				img:'/assets/images/payment/spei.png',
				alt: 'SPEI'
			},
			{
				img:'/assets/images/payment/oxxo.png',
				alt: 'OXXO'
			},
			{
				img:'/assets/images/payment/BBVA_bancomer.png',
				alt: 'BBVA Bancomer'
			},
			{
				img:'/assets/images/payment/paypal.png',
				alt: 'Paypal'
			}
		]

		return (
			<React.Fragment>
				<div className="columns login-register-page">
					<div className="column is-5" style={{padding:'100px 36px 160px 36px'}}>
						<ul className="login-register-selector">
							<li><Link to="/login">Ingresar</Link></li>
							<li className="is-active">
								<Link to="/register">
									Registro
								</Link>
							</li>
						</ul>
								<Register
									inputClassName={checkoutInputClass}
									buttonClassName={checkoutButtonClass}
									editButtonClassName={checkoutEditButtonClass}				
									settings={settings}
									registerProperties={registerProperties}			
									onSubmit={this.handleContactsSubmit}
									submiting={registerFormSubmiting}
								/>
					</div>
					<div className="column is-7">
						<div className="columns background-pakke">
							<div className="column has-text-centered" style={{ marginTop:'100px', position:'relative'}}>
								<img src="/assets/images/logo-pakke-bco-2.png" alt="" />
								<div className="columns payments-methods">
									<div className="column">
										<div className="level">
										{	paymentMethods.map( (paymentMethod, index ) => {
												return <div className="level-item has-text-centered" key={index}><img src={ paymentMethod.img} alt={ paymentMethod.alt } /> </div>
											})
										}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
