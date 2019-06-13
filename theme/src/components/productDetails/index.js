import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';
import Disqus from '../comments/disqus';
import ViewedProducts from '../products/viewed';
import Breadcrumbs from './breadcrumbs';
import DiscountCountdown from './discountCountdown';
import AddToCartButton from './addToCartButton';
import Attributes from './attributes';
import Gallery from './gallery';
import Options from './options';
import Price from './price';
import Quantity from './quantity';
import RelatedProducts from './relatedProducts';
import Tags from './tags';
import ShareButtons from '../shareButtons';

const Description = ({ description }) => (
	<div
		className="product-content"
		dangerouslySetInnerHTML={{ __html: description }}
	/>
);

export default class ProductDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOptions: {},
			selectedVariant: null,
			isAllOptionsSelected: false,
			quantity: 1
		};

		this.onOptionChange = this.onOptionChange.bind(this);
		this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(
			this
		);
		this.addToCart = this.addToCart.bind(this);
		this.checkSelectedOptions = this.checkSelectedOptions.bind(this);

	}

	onOptionChange(optionId, valueId ) {
		let { selectedOptions } = this.state;
		if (valueId === '') {
			delete selectedOptions[optionId];
		} else {
			selectedOptions[optionId] = valueId;
		}

		this.setState({ selectedOptions: selectedOptions });
		this.findVariantBySelectedOptions();
		this.checkSelectedOptions();
	}

	findVariantBySelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		for (const variant of product.variants) {
			const variantMutchSelectedOptions = variant.options.every(
				variantOption =>
					selectedOptions[variantOption.option_id] === variantOption.value_id
			);
			if (variantMutchSelectedOptions) {
				this.setState({ selectedVariant: variant });
				return;
			}
		}

		this.setState({ selectedVariant: null });
	}

	setQuantity = quantity => {
		this.setState({ quantity: quantity });
	};

	addToCart() {
		const { product, addCartItem } = this.props;
		const { selectedVariant, quantity } = this.state;

		let item = {
			product_id: product.id,
			quantity: quantity
		};

		if (selectedVariant) {
			item.variant_id = selectedVariant.id;
		}

		addCartItem(item);
	}

	checkSelectedOptions() {
		const { selectedOptions } = this.state;
		const { product } = this.props;
		const allOptionsSelected =
			Object.keys(selectedOptions).length === product.options.length;
		this.setState({ isAllOptionsSelected: allOptionsSelected });
	}

	componentDidMount(){
		let regular_price = this.props.product.regular_price;
		let off_price  = this.props.product.price;

		let price = ( regular_price > off_price && off_price > 0 ? off_price : regular_price );
		let bestPrice = price;

		let variantId,
		variantOptions,
		id,
		value;

		let preSelectVariant = {};
		let variantObj = {};
		if( this.props.product.variants ){
			this.props.product.variants.forEach( (variant, variantIndex) =>{
				if( variant.price < bestPrice  ){
					bestPrice = variant.price;
					variantId = variant.id;
					variant.options.forEach( (_variant, _index )=>{
						id    = _variant.option_id;
						value = _variant.value_id;
						variantObj[id] = value;
						preSelectVariant = variantObj;
						this.onOptionChange(id, value )
					})
					
					
				}
			})
			
		}
	}

	render() {
		const { product, settings, categories } = this.props;
		const { selectedVariant, isAllOptionsSelected, selectedOptions } = this.state;


		


		const maxQuantity =
			product.stock_status === 'discontinued'
				? 0
				: product.stock_backorder
					? themeSettings.maxCartItemQty
					: selectedVariant
						? selectedVariant.stock_quantity
						: product.stock_quantity;
		const shareUrl = `${settings.domain}${product.path}`;
		if (product) {
			return (
				<Fragment>
					<section className="section-product">
						<div className="container is-widescreen">
							<div className="columns">
								<div className="column">
								<Breadcrumbs product={product} categories={categories} />
								</div>
								<div className="column">
									<ShareButtons shareUrl={shareUrl} pageDescription={product.meta_description} />
								</div>
							</div>
							<div className="columns">
								<div className="column is-6">
									<Gallery images={product.images} />
								</div>
								<div className="column is-6">
									<div className="content">
										<Tags tags={product.tags} />
										<h1 className="title is-4 product-name">{product.name}</h1>
										
										<p className="product-sku">SKU: { ( product.variable && selectedVariant && selectedVariant.sku.length > 0  ? selectedVariant.sku  : product.sku ) }</p>
										<Price
											product={product}
											variant={selectedVariant}
											isAllOptionsSelected={isAllOptionsSelected}
											settings={settings}
										/>
										{themeSettings.show_discount_countdown &&
											product.on_sale === true && (
												<DiscountCountdown product={product} />
											)}

										<Options
											options={product.options}
											onChange={this.onOptionChange}
											selectedOptions={selectedOptions}
										/>

										<section className="is-inline-flex add-to-cart-section" style={{ alignItems: "center"}}>
											<Quantity
												maxQuantity={maxQuantity}
												onChange={this.setQuantity}
											/>
											<div className="button-addtocart">
												<AddToCartButton
													product={product}
													variant={selectedVariant}
													addCartItem={this.addToCart}
													isAllOptionsSelected={isAllOptionsSelected}
												/>
											</div>
										</section>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="section-product-description">
						<div className="container is-widescreen">
							<div className="content">
								<div className="columns">
									<div className="column is-7">
										<h3>Descripción del producto</h3>
										<Description description={product.description} />
									</div>
								</div>
							</div>
						</div>
					</section>



					{themeSettings.disqus_shortname &&
						themeSettings.disqus_shortname !== '' && (
							<section className="section">
								<div className="container">
									<Disqus
										shortname={themeSettings.disqus_shortname}
										identifier={product.id}
										title={product.name}
										url={product.url}
									/>
								</div>
							</section>
						)}
				</Fragment>
			);
		} else {
			return null;
		}
	}
}
