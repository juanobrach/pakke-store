import React from 'react';
import { Link } from 'react-router-dom';
import AuthHeader from '../../../../src/server/auth-header';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import Login from './login';
import RegisterForm from '../register';




export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleFormSubmit = values => {
		let cartLayer = false;
		if (this.props.location !== undefined && this.props.location.state !== undefined) {
			if(this.props.location.state.cartLayer && Lscache.get('auth_data') === null) {
				cartLayer = true;
			}
		}

    this.props.loginUser({
			email: values.email,
      password: AuthHeader.encodeUserPassword(values.password),
			history: this.props.history,
			cartLayer: cartLayer
		});
	};

	render() {

		const {
			settings,
			customerProperties,
			cartlayerBtnInitialized,
			isLoginSubmitting
		} = this.props.state;

		if (this.props.state.customerProperties !== undefined) {
			if (this.props.state.customerProperties.authenticated) {
				const expiryMilliseconds = 1000;  //time units is seconds
  				Lscache.setExpiryMilliseconds(expiryMilliseconds);
				Lscache.set('auth_data', this.props.state.customerProperties.token, 6000);
			}
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
							<li className="is-active"><Link to="/login">Ingresar</Link></li>
							<li><Link to="/register">Registro</Link></li>	
						</ul>
							<Login
								inputClassName={checkoutInputClass}
								buttonClassName={checkoutButtonClass}
								editButtonClassName={checkoutEditButtonClass}
								settings={settings}
								customerProperties={customerProperties}
								cartlayerBtnInitialized={cartlayerBtnInitialized}
								readOnly={true}
								onSubmit={this.handleFormSubmit}
								isLoginSubmitting={isLoginSubmitting}
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
