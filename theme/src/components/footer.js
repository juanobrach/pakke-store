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
									<a href="tel:01552629 9848">
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
									</a>
								</div>
								<div className="column level-item has-text-centered">
									<a href="mailto:soporte@pakke.mx">

										<div className="block help-icon">
											<img src="/assets/images/icons/email-71-51.png"/>
										</div>
										<p>
											<strong>soporte@pakke.mx</strong>
											<br/>
											Escríbenos para brindarte la
											ayuda que necesitas.
										</p>
									</a>
								</div>
								<div className="column level-item has-text-centered">
									<a target="_blank" href="https://api.whatsapp.com/send?phone=525526299848&text=Hola,%20quisiera%20saber%20más%20acerca%20de%20Pakke">
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
									</a>

								</div>
								<div className="column level-item has-text-centered">
									<a href="http://help.pakke.mx">
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
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<footer className="footer-bg">
					<div className="container is-widescreen">
						<div className="content">
							<div className="columns">
								<div className="column is-6">
									<div className="mobile-padding">
										<div className="footer-logo">
											<img src='/assets/images/logo-pakke-bco.png' alt="Pakke" />
										</div>
										<p>
											<small>Conoce las soluciones que tenemos para ti</small>
										</p>
										<VendorsLinks />
										<div style={{ display:'flex'}}> 
											<p><a  target="_blank" href="http://help.pakke.mx/aviso-de-privacidad/">Aviso de privacidad</a> </p> 
											<span style={{margin:'0 .5em'}}>{"  |  "}</span>
											<p><a   target="_blank" href="http://help.pakke.mx/terminos-y-condiciones/">Términos y Condiciones</a> </p>
										</div>
									</div>
								</div>
								<div className="column is-6">
									<div className="columns"></div>
								</div>
							</div>
						</div>
						<div  className="social-footer-icons">
							<ul>
								<li>
									<a href="https://www.facebook.com/pakke.mx" target="_blank" title="Síguenos en Facebook">
										<img src="/assets/images/icons/pakke-facebook-footer.svg" alt="Facebook Pakke" />
									</a>
								</li>
								<li>
									<a href="https://twitter.com/pakke_mx" target="_blank" title="Síguenos en Twitter">
										<img src="/assets/images/icons/pakke-twitter-footer.svg" alt="Twitter Pakke" />
									</a>
								</li>
								<li>
									<a href="https://instagram.com/pakkemx" target="_blank" title="Síguenos en Instagram">
										<img src="/assets/images/icons/pakke-instagram-footer.svg" alt="Instagram Pakke" />
									</a>
								</li>
								<li>
									<a href="https://www.linkedin.com/company/pakke-mx/" target="_blank" title="Síguenos en Linkedin">
										<img src="/assets/images/icons/pakke-linkedin-footer.svg" alt="Linkedin Pakke" />
									</a>
								</li>
							</ul>
						</div>
						<div className="level">
							<div className="level-item has-text-centered">
								<p>
									© { new Date().getFullYear() } Venders. Todos los derechos reservados
								</p>
							</div>
						</div>
					</div>
					<div style={{bottom: '100px', height: '64px', position: 'fixed', right: '18px', width: '64px', zIndex: 21}}>
						<a href="https://api.whatsapp.com/send?phone=525526299848&text=Hola,%20quisiera%20saber%20más%20acerca%20de%20Pakke"  target="_blank">
							<img src="/assets/images/icons/whatsapp.png" alt="whatsapp" style={{height: '63px', width: '63px'}} />
						</a>
					</div>
				</footer>
			</section>
		);
	}
}
