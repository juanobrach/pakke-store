import React from 'react';
import { NavLink ,Link } from 'react-router-dom';
import { themeSettings, text } from '../../../lib/settings';
import Lscache from 'lscache';
import  Login  from './LoginMenu/index';


export default class CustomerMenu extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
		this.handleLogOut = this.handleLogOut.bind(this)

	}


	onMouseEnterHandler = () => {
		this.setState({
			isActive: !this.state.isActive
		});
	};

	onMouseLeaveHandler = () => {
		this.setState({
			isActive: false
		});
	};


	handleLogOut(){
		Lscache.flush();
		this.props.logOutUser();
	}

	render() {
		const { customerProperties, isMobile } = this.props;
		let isLogged = this.props.customerProperties !== undefined && Lscache.get('auth_data') !== null ? true : false;
		let customerName = "Registrate";
		if( isLogged ){
			customerName = customerProperties.customer_settings.full_name
		}


		return (
				!isMobile ? 
				<div className={ (this.state.isActive ? ' is-active' : '') +  " customer-menu"}>
					<p>Hola {customerName}</p>
				 	<p className="menu-item" onClick={this.onMouseEnterHandler}>
						Mi cuenta
						<span className="arrow-down-icon"></span>
					</p>
					<div className="menu" >
						{ 	
							isLogged
							? <div> 
								<ul className="loged-customer-menu">
									<li>
										<Link to="/customer-account">
										Mis pedidos
										</Link>
									</li>
									<li>
										<Link to="/customer-account">
										Mi información general
										</Link>
									</li>
									<li>
										<Link to="/customer-account">
										Libreta de direcciones
										</Link>
									</li>
								</ul>
								<hr />
								<button  className="logout-btn" onClick={ this.handleLogOut } >Cerrar sesión</button>
							</div>
							: <Login {...this.props}/>
						}
					</div>
				</div> : <div className="mobile-customer-menu">
					<p>Hola {customerName}</p>
					<div> 
						<ul className="loged-customer-menu">
							<li>
								<Link to="/customer-account">
									Cuenta
								</Link>
							</li>
							<li>
								<Link to="/customer-account">
									Pedidos
								</Link>
							</li>
							<li>
								<Link to="/customer-account">
									Direcciones
								</Link>
							</li>
						</ul>
						<hr />
						<button  className="logout-btn" onClick={ this.handleLogOut } >Cerrar sesión</button>
					</div>
				</div>
		);
	}
}
