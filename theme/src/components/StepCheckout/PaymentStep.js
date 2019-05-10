import React from 'react';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import PaymentForm from './paymentForm';


export default class PaymentStep extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		   selectedMethod:'card'
		}
		this.handleCardPaymentSubmit   = this.handleCardPaymentSubmit.bind(this)
	}



	componentDidMount() {
	}

	onChange = event => {
		const checked = event.target.checked;
		this.setState({ paymentMethod: 'checked' });
	};



	handleCardPaymentSubmit( card ){
		console.log( 'card form', card )
	}

	render(){
		const {
			customerProperties,
			onSubmit,
			cart,
			settings,
			processingCheckout,
			handleSuccessPayment,
			shippingMethod,
			onCreateToken,
			handlePaymentStepSuccess,
			updateCart,
			handleBack,
			classes
		} = this.props;

	const { payment_method_gateway, grand_total } = cart;

		return(
			<div className="payment-step">
				<section>
					<h3>
						Método de pago
					</h3>

					<div className='columns'>

					</div>
					<div className="columns">
						<div className="column divisor">
							<hr />
						</div>
					</div>
				</section>
				<section>
				{!processingCheckout && (
					<PaymentForm
						gateway={payment_method_gateway}
						amount={grand_total}
						shopSettings={settings}
						shippingMethod={shippingMethod}
						onPayment={handleSuccessPayment}
						onSubmit={onSubmit}
						onCreateToken={onCreateToken}
						handlePaymentStepSuccess={handlePaymentStepSuccess}
						updateCart={updateCart}
						handleBack={handleBack}
						classes={classes}
					/>
				)}
				{processingCheckout && <p>{text.loading}</p>}
				</section>
			</div>
		)
	}
}
