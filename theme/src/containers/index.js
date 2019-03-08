import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings } from '../lib/settings';
import MetaTags from '../components/metaTags';
import CustomProducts from '../components/products/custom';
import HomeSlider from '../components/homeSlider';

const IndexContainer = props => {
	const {
		addCartItem,
		state: { pageDetails, settings, categories }
	} = props;

	const slider_pictures = [
		{
			image: '/assets/images/slider/slider_1.png',
			title: '',
			description: '',
			path: '/assets/images/slider/slider_1.png',
			button: ''
		},
		{
			image: '/assets/images/slider/slider_1.png',
			title: '',
			description: '',
			path: '/assets/images/slider/slider_1.png',
			button: ''
		},
		{
			image: '/assets/images/slider/slider_1.png',
			title: '',
			description: '',
			path: '/assets/images/slider/slider_1.png',
			button: ''
		}

	]; 

	return (
		<Fragment>
			<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>

			<HomeSlider images={slider_pictures} />

			{pageDetails.content &&
				pageDetails.content.length > 10 && (
					<section className="section">
						<div className="container">
							<div className="content">
								<div
									dangerouslySetInnerHTML={{
										__html: pageDetails.content
									}}
								/>
							</div>
						</div>
					</section>
				)}

			<section className="section" style={{paddingTop:'40px'}}>
				<div className="container">
					<section style={{paddingTop:'30px'}} >
						<div className="title is-4">
						 	Categorías
						</div>
						<div className="columns has-text-centered is-variable is-1 categories-links">
						 {
						 	categories.map( (category, key )=>{
						 		if( category.parent_id != null ) return false;
						 		return <div className="column" key={key}>
						 			<div>
							 			<a href={ category.path } className="block" >
								 				<img src="/assets/images/icons/category-icon.png" />
								 				<h3>{ category.name }</h3>
							 			</a>
						 			</div>
						 		</div>
						 	})
						 }
						</div>
					</section>
					<section style={{ marginTop:'30px'}}>
						<div className="title is-4">
							Productos destacados
						</div>
						<CustomProducts
							sku={themeSettings.home_products_sku}
							sort={themeSettings.home_products_sort}
							limit="5"
							settings={settings}
							addCartItem={addCartItem}
						/>
					</section>
					<section style={{ marginTop:'30px'}}>
						<div className="title is-4">
							Paquete de cajas
						</div>
						<div className="columns">
							<div className="column boxes-pack">
								<div className="columns">
									<div className="column is-offset-6">
									 	<p>
									 	Paquetes de 500 
									 	cajas de cartón 
									 	sin membrete
									 	</p>
									 	<button className="button-view-more">Ver más</button>
									</div>
								</div>
							</div>
							<div className="column boxes-pack">
								<div className="columns">
									<div className="column is-offset-6">
									 	<p>
									 	Paquetes de 500 
									 	cajas de cartón 
									 	sin membrete
									 	</p>
									 	<button className="button-view-more">Ver más</button>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section style={{ marginTop:'30px'}}>
						<div className="title is-4">
							Te puede interesar
						</div>
						<CustomProducts
							sku={themeSettings.home_products_sku}
							sort={themeSettings.home_products_sort}
							limit="5"
							settings={settings}
							addCartItem={addCartItem}
						/>
					</section>
				</div>
			</section>
		</Fragment>
	);
};

IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default IndexContainer;
