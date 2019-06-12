import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { formatCurrency, formatNumber } from '../../lib/helper';
import moment from 'moment';

const formateDate = (date, settings) =>{

	moment.locale('es');
	const dateCreated = moment( date );
	const day = dateCreated.format('D')
	const monthYear = dateCreated.format('MMMM YYYY');
	return day +' de '+ monthYear;
}


export default class Order extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const data = this.props.data;
		const settings = this.props.settings;

		let transaction = data.transactions.find( transaction => { if( transaction.status.length > 0 ){ return transaction }  })
		let transaction_type = transaction.order_type.toLowerCase()
		let shipping = data.shipping_address;
		return (
			<React.Fragment>
					<nav className="breadcrumb is-small" aria-label="breadcrumbs" style={{marginTop:'17px'}}>
						<ul style={{ margin:'0', marginTop:'18px'}}>
							<li>
								<NavLink to="/customer-account">Mi cuenta</NavLink>
							</li>
							<li className="is-active">
								<a href="#" aria-current="page">
									Pedido  {data.number}
								</a>
							</li>
						</ul>
					</nav>
					<div className="columns" id="order-details-container" >
						<div className="column is-6">
							<h3>Detalles del pedido Nº <strong>{data.number}</strong></h3>
							<ul className="box-container">
								<li>
									<div className="level">
										<div className="level-left">
											<p className="level-item">
												Productos:
											</p>
										</div>
										<div className="level-right">
											<p className="level-item">
												{ formatCurrency(data.subtotal, settings)}
											</p>
										</div>
									</div>
									<div className="level">
										<div className="level-left">
											<p className="level-item">
												Gastos de envío:
											</p>
										</div>
										<div className="level-right">
											<p className="level-item">
												{ formatCurrency(data.shipping_total, settings)}
											</p>
										</div>
									</div>
									<div className="level">
										<div className="level-left">
											<p className="level-item">
												Subtotal:
											</p>
										</div>
										<div className="level-right">
											<p className="level-item">
												{ formatCurrency(data.subtotal, settings)}
											</p>
										</div>
									</div>
									<div className="level">
										<div className="level-left">
											<p className="level-item">
												IVA:
											</p>
										</div>
										<div className="level-right">
											<p className="level-item">
												{ formatCurrency(data.tax_included_total, settings)}
											</p>
										</div>
									</div>
									<div className="level">
										<div className="level-left">
											<p className="level-item">
												<strong>Total con IVA:</strong>
											</p>
										</div>
										<div className="level-right">
											<p className="level-item">
												<strong>{ formatCurrency(data.grand_total, settings)}</strong>
											</p>
										</div>
									</div>
								</li>
							</ul>

							<ul className="box-container">
								<li className="payment-method">
									<div className="columns is-vcentered">
										<div className="column is-2" >
											<div style={{ display:'flex', alignItems:'center', borderRadius:'5px', backgroundColor:'#f2f2f2', textAlign:'center', width:'70px', height:'50px'}}>
												<div>
													{
														transaction_type == 'visa' ?
															<img src="/assets/images/payment/visa.png"  style={{ marginTop:'4px', width:'41px'}} alt=""/> : ''
													}


													{	transaction_type == 'mastercard' ?
																											<img src="/assets/images/payment/mastercard.png"  style={{ marginTop:'4px', width:'41px'}} alt=""/> : ''
													}
													{	transaction_type == 'amex' ?
																											<img src="/assets/images/payment/american_express.png"  style={{ marginTop:'4px', width:'41px'}} alt=""/> : ''
													}
													{	transaction_type == 'oxxo' ?
																											<img src="/assets/images/payment/oxxo.png"  style={{ marginTop:'4px', width:'41px'}} alt=""/> : ''
													}
													{transaction_type == 'spei' ?
															<img src="/assets/images/payment/spei.png"  style={{ marginTop:'4px', width:'41px'}} alt=""/> : ''
													}
												</div>
											</div>
										</div>
										<div className="is-11" style={{ marginLeft: '.5em'}}>
											<p><strong>{transaction.order_type} {data.etomin_card_number}</strong></p>
											<p>Pago por  {formatCurrency( transaction.amount, settings)}</p>
											<p>Pago referencia nº {transaction.transaction_id} { data.date_paid ? `acreditado el ${formateDate( data.date_paid, settings )}` : '' } </p>
											{
												transaction.order_type == 'OXXO' ?
													<p><a href={transaction.urlPrint} style={{color: '#5e0d8b',
    																																textDecoration: 'underline',
    																																fontSize: '13px'}}>
																Imprimir cupon de pago
														</a>
													</p> : ''
											}

											{
												transaction.order_type == 'SPEI' ?
													<p>
														Numero de cuenta para deposito {transaction.deposit_account}
													</p> : ''
											}
										</div>
									</div>
								</li>
								<li className="shipping">
									<p className="status">Dirección de envío</p>
									<p>{ shipping.address1 } {shipping.address_num_ext}, {shipping.address_num_int}, {shipping.state}, {shipping.city} {shipping.postal_code}</p>
								</li>
							</ul>
						</div>
						<div className="column is-6">
							<h3>Compraste el {formateDate(data.date_placed, settings)}</h3>
							<ul className="items-container box-container">
							{
								data.items.map( (item, key) => {

								 	let productImage = ( item.product_image != null ? item.product_image[0].url : '/assets/images/placeholder-50.png')

									return(
										<li className="item-list" key={key}>
											<div className="columns is-vcentered">
													<div className="column is-1">
														<img src={ productImage } alt="" />
													</div>
													<div className="column is-8">
														<p>{item.name}</p>
														<p>{item.quantity} { item.quantity > 1 ? "unidades" : "unidad"  }</p>
													</div>
													<div className="column is-3 has-text-right">
														<p><strong>
														{ formatCurrency(item.price, settings)}
														</strong></p>
													</div>
											</div>									
										</li>
									)
								})
							}
							</ul>
						</div>
					</div>
					<div className="buttons-footer">
						<div className="columns">
							<div className="column is-6">
									<Link to="/customer-account">Regresar</Link>
							</div>
							<div className="column is-6">

							</div>
						</div>
					</div>
			</React.Fragment>
		)
	}
}

