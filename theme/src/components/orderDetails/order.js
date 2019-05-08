import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Order extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const data = this.props.data;
		console.log( data );
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
												$ 34,500.50
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
												$ 1,500.00
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
												$ 36,000.50
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
												<strong>$ 36,000.50</strong>
											</p>
										</div>
									</div>
								</li>
							</ul>

							<ul className="box-container">
								<li className="payment-method">
									<div className="columns is-vcentered">
										<div className="column is-2">
											<div style={{borderRadius:'5px', backgroundColor:'#f2f2f2', textAlign:'center', width:'70px'}}>
												<img src="/assets/images/payment/mastercard.png"  style={{ marginTop:'4px', width:'41px', height:'32px'}} alt=""/>
											</div>
										</div>
										<div className="is-10">
											<p><strong>Mastercard **** 4375</strong></p>
											<p>Pago por  $ 34,500.50</p>
											<p>Pago referencia nº 34564557656 acreditado el 5 de marzo 2019</p>
										</div>
									</div>
								</li>
								<li className="shipping">
									<p className="status">Entregado</p>
									<p>Llegó el:  <strong>07 Marzo 2019</strong></p>
									<p>En: Av. Constituyentes 908, Piso 1, Next Cloud, Lomas Altas, Ciudad de México, Ciudad de México 11950 </p>
									<p>Recibe:  Se entregó directamente a un recepcionista ó alguien de la recepción.</p>
									<p>Nº de guía: <strong>TBM018081738009</strong></p>
								</li>
							</ul>
						</div>
						<div className="column is-6">
							<h3>Compraste el 5 de Marzo 2019</h3>
							<ul className="items-container box-container">
							{
								data.items.map( (item, key) => {

								 	let productImage = ( item.product_image != null ? item.product_image : '/assets/images/placeholder-50.png')

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
														<p><strong>${item.price}</strong></p>
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

