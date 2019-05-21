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


const VendorsLinks = () =>{
	let vendors = [
		{
			imgSrc:"/assets/images/vendors/venders-logo.png",
			alt: "Venders",
			href: "#",
			columSize:"is-one-quarter"
		},
		{
			imgSrc:"/assets/images/vendors/ikniu-logo.png",
			alt: "Ikniu",
			href: "#",
			columSize:"is-2"
		},
		{
			imgSrc:"/assets/images/vendors/anko-logo.png",
			alt: "Anko",
			href: "#",
			columSize:"is-narrow"
		},
		{
			imgSrc:"/assets/images/vendors/etomin-logo.png",
			alt: "Etomin",
			href: "#",
			columSize:"is-one-quarter"
		}
	]

	const items = vendors.map( (item, index) => {

		
		return (
			<li key={index}>
				<a href={item.href} >
					<img src={item.imgSrc} alt={item.alt} />
				</a>
			</li>
		)
	})

	return <ul className="brands-logos-container">{items}</ul>

}

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


		const footerMenu = {
			catalogo:{
				title:'Catálogo',
				items:[
					{
						url: "#",
						text: "Cajas de cartón"
					},
					{
						url: "#",
						text: "Film de paletizar"
					},
					{
						url: "#",
						text: "Papel kraft"
					},
					{
						url: "#",
						text: "Cinta de embalaje"
					},
					{
						url: "#",
						text: "Bolsas y sobres"
					},
					{
						url: "#",
						text: "Etiquetas adhesivas"
					},
					{
						url: "#",
						text: "Cutter y tijeras"
					}
				]
			},
			nosotros:{
				title:'Nosotros',
				items:[
					{
						url: "#",
						text: "¿Que es Pakke?"
					},
					{
						url: "#",
						text: "Nuestro blog"
					},
					{
						url: "#",
						text: "Twitter"
					},
					{
						url: "#",
						text: "Facebook"
					},
					{
						url: "#",
						text: "Instagram"
					},
					{
						url: "#",
						text: "Youtube"
					}
				]
			},
			ayuda:{
				title:'Ayuda',
				items:[
					{
						url: "#",
						text: "Términos y condiciones"
					},
					{
						url: "#",
						text: "Políticas de privacidad"
					},
					{
						url: "#",
						text: "Centro de ayuda"
					},
					{
						url: "#",
						text: "Uso de cookies"
					}
				]
			},
			cuenta:{
				title:'Mi cuenta',
				items:[
					{
						url: "/login",
						text: "Ingresa"
					},
					{
						url: "/register",
						text: "Regístrate"
					},
					{
						url: "/customer-account",
						text: "Mis pedidos"
					},
					{
						url: "/customer-account",
						text: "Mis direcciones"
					},
					{
						url: "/customer-account",
						text: "Mi información"
					}
				]
			}
		}
		return (
			<section className="section-footer">
				<hr />
				<div className="payments-methods">
					<div className="container is-widescreen">
						<div className="level">
						{	paymentMethods.map( (paymentMethod, index ) => {
								return <div className="level-item has-text-centered" key={index}><img src={ paymentMethod.img} alt={ paymentMethod.alt } /> </div>
							})
						}
						</div>
					</div>
				</div>
				<div className="customer-help-contact footer">
					<div className="container is-widescreen">
						<div className="content">
							<div className="columns is-centered">
								<div className="column is-three-fifths is-offset-1">
									<div className="level-item has-text-centered">
										<div>
											<p style={{color:'#4d4d4d'}}>
											Despreocúpate, si tienes dudas, no puedes generar una compra, problemas en un pedido,
											estamos siempre para atenderte.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="block" style={{height:'40px'}}></div>
							<div className="columns level customer-help-contact-with-icons">
								<div className="column level-item has-text-centered">
									<div className="block help-icon">
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
									<div className="block help-icon">
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
									<div className="block help-icon">
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
									<div className="block help-icon">
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
				<footer className="footer-bg">
					<div className="container is-widescreen">
						<div className="content">
							<div className="columns">
								<div className="column is-4">
									<div className="mobile-padding">
										<div className="footer-logo">
											<img src='/assets/images/logo-pakke-bco.png' alt="Pakke" />
										</div>
										<p>
											<small>Conoce las soluciones que tenemos para ti</small>
										</p>
										<VendorsLinks />
										<p style={{fontSize:"13px"}}>Av. Constituyentes 908, Lomas Altas C.P. 11950 CDMX</p>
									</div>
								</div>
								<div className="column is-8">
									<div className="columns">
											<FooterMenu
												title={footerMenu.catalogo.title}
												items={footerMenu.catalogo.items}
											/>
											<FooterMenu
												title={footerMenu.nosotros.title}
												items={footerMenu.nosotros.items}
											/>
											<FooterMenu
												title={footerMenu.ayuda.title}
												items={footerMenu.ayuda.items}

											/>
											<FooterMenu
												title={footerMenu.cuenta.title}
												items={footerMenu.cuenta.items}
											/>
										</div>
								</div>
							</div>
						</div>
						<hr />
						<div className="level">
							<div className="level-item has-text-centered">
								<p>
									© { new Date().getFullYear() } Venders. Todos los derechos reservados
								</p>
							</div>
						</div>
					</div>
				</footer>
			</section>
		);
	}
}
