import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../lib/settings';

class FooterMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	isActiveToggle = () => {
		this.setState({
			isActive: !this.state.isActive
		});
	};

	render() {
		const { title, items } = this.props;
		let ulItems = null;

		if (items && items.length > 0) {
			ulItems = items.map((item, index) => (
				<li key={index}>
					<NavLink to={item.url || ''}>{item.text}</NavLink>
				</li>
			));
		}

		return (
			<div className="column is-3">
				<div
					className={
						'footer-title mobile-padding' +
						(this.state.isActive ? ' footer-menu-open' : '')
					}
					onClick={this.isActiveToggle}
				>
					{title}
					<span />
				</div>
				<ul className="footer-menu">{ulItems}</ul>
			</div>
		);
	}
}

const SocialIcons = ({ icons }) => {
	if (icons && icons.length > 0) {
		const items = icons.map((icon, index) => (
			<a
				key={index}
				href={icon.url || ''}
				target="_blank"
				rel="noopener"
				title={icon.type}
				className={icon.type}
			/>
		));
		return <p className="social-icons">{items}</p>;
	} else {
		return null;
	}
};

const Contacts = ({ contacts }) => {
	if (contacts && contacts.length > 0) {
		const items = contacts.map((item, index) => {
			const contact = item ? item.text : null;
			if (contact && contact.indexOf('@') > 0) {
				return (
					<li key={index}>
						<a href={'mailto:' + contact}>{contact}</a>
					</li>
				);
			} else {
				return <li key={index}>{contact}</li>;
			}
		});
		return <ul className="footer-contacts">{items}</ul>;
	} else {
		return null;
	}
};

export default class Footer extends React.PureComponent {
	static propTypes = {
		settings: PropTypes.shape({}).isRequired
	};

	render() {
		const { settings } = this.props;
		const footerLogoUrl =
			themeSettings.footer_logo_url && themeSettings.footer_logo_url.length > 0
				? '/assets/images/' + themeSettings.footer_logo_url
				: settings.logo;
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
			<section className="section-footer">
				<hr />
				<div className="payments-methods">
					<ul className="container">
					{	paymentMethods.map( paymentMethod  => {
							return <li><img src={ paymentMethod.img} alt={ paymentMethod.alt } /> </li>
						})
					}
					</ul>
				</div>
				<div className="customer-help-contact footer">
					<div className="container">
						<div className="content">
							<div className="columns is-centered">
								<div className="column is-three-fifths is-offset-1">
									<div className="level-item has-text-centered">
										<div>
											<p className="title">24/7</p>
											<p>
											Despreocúpate, si tienes dudas, no puedes generar una compra, problemas en un pedido
											ó simplemente quieres hablar con nosotros, estamos siempre para atenderte.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="block" style={{height:'40px'}}></div>
							<div className="columns level">
								<div className="column level-item has-text-centered">
									<div className="block">
										<img src="/assets/images/icons/phone-70-70.png"/>
									</div>
									<p>
										Llámanos desde todo México al:
										<br />
										<strong>01 (55) 2629 9848</strong>
										<br />
										De lunes a viernes de 9 a 19 hrs.	
									</p>
								</div>
								<div className="column level-item has-text-centered">
									<div className="block">
										<img src="/assets/images/icons/email-71-51.png"/>
									</div>
									<p>
										<strong>soporte@pakke.mx</strong>
										<br/>
										Escríbenos para brindarte la
										ayuda que necesitas.
									</p>
								</div>
								<div className="column level-item has-text-centered">
									<div className="block">
										<img src="/assets/images/icons/chat-83-70.png"/>
									</div>
									<p>
									<strong>Chatea con nosotros</strong>
									<br/>
									Hacemos todo lo posible por
									solucionarte tus dudas en el
									momento.
									</p>
								</div>
								<div className="column level-item has-text-centered">
									<div className="block">
										<img src="/assets/images/icons/question-71-71.png"/>
									</div>
									<p>
									<strong>¿Tienes dudas?</strong>
									<br/>
									En nuestro Centro de ayuda,
									podrás encontrar la respuesta a
									todos tus problemas.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<footer className="footer-bg footer">
					<div className="container">
						<div className="content">
							<div className="columns is-gapless">
								<div className="column is-5">
									<div className="mobile-padding">
										<div className="footer-logo">
											<img src='/assets/images/logo-pakke-bco.png' alt="Pakke" />
										</div>
										<p>
											<small>{themeSettings.footer_about}</small>
										</p>
										<Contacts contacts={themeSettings.footer_contacts} />
										<SocialIcons icons={themeSettings.footer_social} />
									</div>
								</div>
								<div className="column is-1 is-hidden-mobile" />
								<FooterMenu
									title={themeSettings.footer_menu_1_title}
									items={themeSettings.footer_menu_1_items}
								/>
								<FooterMenu
									title={themeSettings.footer_menu_2_title}
									items={themeSettings.footer_menu_2_items}
								/>
							</div>
						</div>
					</div>
				</footer>
			</section>
		);
	}
}
