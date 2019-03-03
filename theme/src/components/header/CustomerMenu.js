import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';


export default class CustomerMenu extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}


	onMouseEnterHandler = () => {
		this.setState({
			isActive: true
		});
	};

	onMouseLeaveHandler = () => {
		this.setState({
			isActive: false
		});
	};



	render() {

		const customerLoggedMenu = <div> 
			<ul>
				<li>Mis pedidos</li>
				<li>Mi información general</li>
				<li>Libreta de direcciones</li>
			</ul>
			<p>Cerrar sesión</p>
		</div>;

		const customerLoginMenu = <div>Login</div>


		const { customerProperties } = this.props;
		let customerName = ( customerProperties ? customerProperties.customer_settings.full_name : "Registrate"  )
		return (
			<div onMouseEnter={this.onMouseEnterHandler}
				onMouseLeave={this.onMouseLeaveHandler}
				onMouseUp={this.onMouseLeaveHandler}
				className={ (this.state.isActive ? ' is-active' : '') +  " customer-menu"}>
				<p>Hola {customerName}</p>
				<p className="menu-item">
					Mi cuenta
					<span className="arrow-down-icon"></span>
				</p>
				<div className="menu" >
					{ 	
						customerProperties
						? customerLoggedMenu
						: customerLoginMenu

					}
				</div>
			</div>
		);
	}
}
