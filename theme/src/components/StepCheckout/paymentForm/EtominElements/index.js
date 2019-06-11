import React from 'react';
import PaymentsGatewaySelector from './PaymentsGatewaySelector';
import CardPaymentForm from './CardPaymentForm';
import OxxoForm from './OxxoForm';
import SpeiForm from './SpeiForm';

import api from '../../../../lib/api';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';


export default class EtominElements extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			etomin: null,
			selectedMethod: 'card',
			inProgress: false
		};

		this.handleChangePaymentMethod = this.handleChangePaymentMethod.bind(this)
		this.handleCardPaymentSumbit   = this.handleCardPaymentSumbit.bind(this)
		this.handleOxxoSubmit          = this.handleOxxoSubmit.bind(this)
		this.handleSpeiSubmit          = this.handleSpeiSubmit.bind(this)

	}

	handleChangePaymentMethod( event ){
		this.setState({ selectedMethod: event.target.value });
	}

	handleCardPaymentSumbit( value ){
		if( this.state.etomin != null ){
			this.setState({
	      inProgress: true
	    });
			axios.post( `${api.ajaxBaseUrl}/tokenCard`, value).then( (res )=>{
				if( res.data.error == 0 ){
					this.props.updateCart({
						payment_method_type : 'card',
						etomin_card_token: res.data.token,
						etomin_card_number: res.data.card
					})
					this.props.onSubmit()
				}else{
					this.setState({
			      inProgress: false
			    });
					let error = res.data.code == 400
					let errorMessage = "Hemo tenido un error al validar este metodo de pago";
					switch( error ){
							case 400:
							errorMessage = "Estan faltado informacion en al consulta";
							break;
							default:
							errorMessage = res.data.message;
							break;
					}
					toast(errorMessage, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});

				}
			})
		}
	}

	handleOxxoSubmit(){
		if( this.state.etomin != null ){
			this.props.updateCart({
				payment_method_type : 'oxxo'
			})
			this.props.onSubmit()
		}
	}

	handleSpeiSubmit(){
		if( this.state.etomin != null ){
			this.props.updateCart({
				payment_method_type : 'spei'
			})
			this.props.onSubmit()			
		}
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

					{ this.state.selectedMethod == 'spei' 
					&& ( <SpeiForm classes={classes} onSubmit={this.handleSpeiSubmit} inProgress={this.state.inProgress}  handleBack={handleBack} />) 
				}
				<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
				/>
			</React.Fragment>
		)
	}
}
