import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ProductList from '../components/productList';
import ProductFilter from '../components/productFilter';
import Sort from '../components/sort';
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs';
import ShareButtons from '../components/shareButtons';

import * as helper from '../lib/helper';

let listType = "grid";
const getFilterAttributesSummary = productFilter => {
	let attributesSummary = '';
	if (productFilter.attributes) {
		Object.keys(productFilter.attributes).forEach(attributeKey => {
			const attributeName = attributeKey.replace('attributes.', '');
			const attributeValue = productFilter.attributes[attributeKey];
			const attributeValueFormatted = Array.isArray(attributeValue)
				? attributeValue.join(', ')
				: attributeValue;
			attributesSummary += `. ${attributeName}: ${attributeValueFormatted}`;
		});
	}
	return attributesSummary;
};

const getFilterPriceSummary = (productFilter, settings) => {
	let priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		const priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		const priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = `. ${text.price}: ${priceFrom} - ${priceTo}`;
	}
	return priceSummary;
};



const CategoryHero = ({ categoryDetails, categories, products }) => (
	<section className="hero is-light container is-widescreen">
		<div className="style={{paddingBottom:'15px'}}">
			<div>
				<div className="columns is-marginless">
					<div className="column is-paddingless">
						<CategoryBreadcrumbs
							currentCategory={categoryDetails}
							categories={categories}
						/>
					</div>
					<div className="column is-paddingless">
						<ShareButtons shareUrl={categoryDetails.url} pageDescription={categoryDetails.name} />
					</div>
				</div>
				<h1 className="category-title">{categoryDetails.name}</h1>
				<p className="products-found">Se encuentran { products.length } { ( products.length > 1 ? 'productos' : 'producto') }</p>
			</div>
		</div>
	</section>
);

CategoryHero.propTypes = {
	categoryDetails: PropTypes.shape({}).isRequired,
	categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	products: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const CategoryContainer = props => {
	const {
		setSort,
		setCurrentView,
		addCartItem,
		loadMoreProducts,
		getJSONLD,
		state,
		state: {
			products,
			categoryDetails,
			settings,
			productFilter,
			productsHasMore,
			categories,
			loadingProducts,
			loadingMoreProducts,
			currentGrid
		}
	} = props;
	
	const changeLayout = ( layoutType )=>{
		props.setCurrentView( layoutType )

	}
	const filterAttributesSummary = getFilterAttributesSummary(productFilter);
	const filterPriceSummary = getFilterPriceSummary(productFilter, settings);

	const pageTitle =
		categoryDetails.meta_title && categoryDetails.meta_title.length > 0
			? categoryDetails.meta_title
			: categoryDetails.name;
	const title = `${pageTitle}${filterAttributesSummary}${filterPriceSummary}`;

	const jsonld = getJSONLD(state);

	const showFilter = themeSettings.show_product_filter;

	return (
		<Fragment>
			<MetaTags
				title={title}
				description={categoryDetails.meta_description}
				canonicalUrl={categoryDetails.url}
				imageUrl={categoryDetails.image}
				ogType="product.group"
				ogTitle={categoryDetails.name}
				ogDescription={categoryDetails.meta_description}
				jsonld={jsonld}
			/>

			<CategoryHero categoryDetails={categoryDetails} categories={categories} products={products}/>

			<section className="section section-category">
				<div className="container is-widescreen">
					<div className="columns">
						<div className="column is-3 left-sidebar">
							<ProductFilter {...props} changeLayout={changeLayout} />
						</div>
						<div className="column is-9 category">
							<ProductList
								products={products}
								addCartItem={addCartItem}
								settings={settings}
								loadMoreProducts={loadMoreProducts}
								hasMore={productsHasMore}
								loadingProducts={loadingProducts}
								loadingMoreProducts={loadingMoreProducts}
								columnCountOnDesktop="3"
								columnCountOnWidescreen="3"
								columnCountOnFullhd="3"
								columnCount="12"
								columnCountOnMobile="1"
								listType={currentGrid}
							/>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

CategoryContainer.propTypes = {
	setSort: PropTypes.func.isRequired,
	addCartItem: PropTypes.func.isRequired,
	loadMoreProducts: PropTypes.func.isRequired,
	getJSONLD: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
		productFilter: PropTypes.shape({}),
		productsHasMore: PropTypes.bool,
		categoryDetails: PropTypes.shape({}),
		categories: PropTypes.arrayOf(PropTypes.shape({})),
		loadingProducts: PropTypes.bool,
		loadingMoreProducts: PropTypes.bool
	}).isRequired
};

export default CategoryContainer;
