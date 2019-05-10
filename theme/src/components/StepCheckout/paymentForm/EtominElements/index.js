import React from 'react';
import PaymentsGatewaySelector from './PaymentsGatewaySelector';
import CardPaymentForm from './CardPaymentForm';
import OxxoForm from './OxxoForm';
import api from '../../../../lib/api';
import axios from 'axios';


export default class EtominElements extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = { 
			etomin: null,
			selectedMethod: 'card',
			inProgress: false
		};

		this.handleChangePaymentMethod = this.handleChangePaymentMethod.bind(this)
		this.handleCardPaymentSumbit   = this.handleCardPaymentSumbit.bind(this)
		this.handleOxxoSubmit          = this.handleOxxoSubmit.bind(this)
	}

	handleChangePaymentMethod( event ){
		this.setState({ selectedMethod: event.target.value });
	}

	handleCardPaymentSumbit( value ){
		console.log( value )
		if( this.state.etomin != null ){
			this.setState({
	      inProgress: true
	    });
			axios.post( `${api.ajaxBaseUrl}/tokenCard`, value).then( (res )=>{
				console.log(res)
				if( res.data.error == 0 ){
					this.props.updateCart({
						payment_method_type : 'card',
						etomin_card_token: res.data.token,
						etomin_card_number: res.data.card
					})
					this.props.onSubmit()
				}
			})
		}
	}

	handleOxxoSubmit(){
		this.props.updateCart({
			payment_method_type : 'oxxo'
		})
		this.props.onSubmit()
	}



	componentDidMount() {
		const SCRIPT_URL = 'https://api.etomin.com/API/v1.0/js/etomin.out.min.js';
		const container = document.body || document.head;
		const script = document.createElement('script');
		script.src = SCRIPT_URL;
		script.async = true;
		script.onload = () => {
			  etomin.autentication( (err, session ) => {
					this.setState({
						etomin: session
					});
					this.props.updateCart(
						{ device_session_id: session }
					)
			  })
		};
		container.appendChild(script);
	}

	render() {
		const { formSettings, shopSettings, onPayment, onCreateToken, handleBack,classes } = this.props;
		return (
			<React.Fragment>
				<PaymentsGatewaySelector  handleChangePaymentMethod={this.handleChangePaymentMethod} selectedMethod={this.state.selectedMethod} />
				{ this.state.selectedMethod == 'card' 
					&& ( <CardPaymentForm classes={classes} inProgress={this.state.inProgress} onSubmit={this.handleCardPaymentSumbit} handleBack={handleBack} />) 
				}

					{ this.state.selectedMethod == 'oxxo' 
					&& ( <OxxoForm classes={classes} onSubmit={this.handleOxxoSubmit} inProgress={this.state.inProgress}  handleBack={handleBack} />) 
				}
			</React.Fragment>
		)
	}
}
