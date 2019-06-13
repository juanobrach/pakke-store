import React from 'react';
import PropTypes from 'prop-types';
import api from '../../lib/api';
import ProductList from '../productList';
export default class CustomProducts extends React.Component {
	static propTypes = {
		ids: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),
		sku: PropTypes.string,
		sort: PropTypes.string,
		limit: PropTypes.number.isRequired,
		category_id: PropTypes.string,
		category_slug: PropTypes.string,
		tags: PropTypes.string,
		attributes: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			})
		),
		is_pack: PropTypes.bool,
		price_from: PropTypes.number,
		price_to: PropTypes.number,
		on_sale: PropTypes.bool,
		settings: PropTypes.shape({}).isRequired,
		addCartItem: PropTypes.func.isRequired,
		isCentered: PropTypes.bool,
		className: PropTypes.string,
		columnCountOnMobile: PropTypes.number,
		columnCountOnTablet: PropTypes.number,
		columnCountOnDesktop: PropTypes.number,
		columnCountOnWidescreen: PropTypes.number,
		columnCountOnFullhd: PropTypes.number
	};

	static defaultProps = {
		ids: null,
		is_pack: null,
		sku: null,
		sort: null,
		category_id: null,
		category_slug: null,
		tags: null,
		attributes: null,
		price_from: null,
		price_to: null,
		on_sale: null,
		isCentered: false,
		className: 'columns is-multiline is-mobile products',
		columnCountOnMobile: 1,
		columnCountOnTablet: 3,
		columnCountOnDesktop: 4,
		columnCountOnWidescreen: 4,
		columnCountOnFullhd: 4
	};

	state = {
		products: []
	};

	componentDidMount() {
		this.isCancelled = false;
		this.fetchProducts(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchProducts(nextProps);
	}

	componentWillUnmount() {
		this.isCancelled = true;
	}

	fetchProducts = ({
		ids,
		sku,
		sort,
		is_pack,
		limit,
		category_id,
		category_slug,
		tags,
		attributes,
		price_from,
		price_to,
		variants,
		on_sale
	}) => {
		const filter = {
			ids,
			sku,
			tags,
			on_sale,
			is_pack,
			variants:[],
			search: null,
			category_id,
			category_slug,
			price_from,
			price_to,
			sort,
			fields:
				'variants,path,id,name,category_id,category_slug,is_pack,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags',
			limit: limit || 4,
			offset: 0
		};

		if (attributes && Array.isArray(attributes) && attributes.length > 0) {
			attributes.forEach(attr => {
				filter[`attributes.${attr.name}`] = attr.value;
			});
		}	


		api.ajax.products
			.list(filter)
			.then(({ json }) => {
				if (!this.isCancelled) {
					let data = json.data;
					
					this.setState({
						products: data
					});
				}
			})
			.catch(() => {});
	};

	render() {
		const {
			settings,
			addCartItem,
			isCentered,
			className,
			columnCountOnMobile,
			columnCountOnTablet,
			columnCountOnDesktop,
			columnCountOnWidescreen,
			columnCountOnFullhd,
			columnCount,
			is_pack
		} = this.props;

		const { products } = this.state;

		const filteredProducts = [];

		products.forEach( ( product, productIndex ) =>{
						
			let regular_price = product.regular_price;
			let off_price  = product.price;

			let price = ( regular_price > off_price && off_price > 0 ? off_price : regular_price );
			let bestPrice = price;

			let variantId,
				variantOptions;

			if( product.variants ){
				product.variants.forEach( (variant, variantIndex) =>{
					if( variant.price < bestPrice  ){
						bestPrice = variant.price;
						variantId = variant.id;
						variantOptions = variant.options;
						products[productIndex].variantSeledted = variantId;
						products[productIndex].variantOptions = variantOptions;
					}
				})
			}
			products[productIndex].price = bestPrice;
			filteredProducts.push(products[productIndex]);
		})

		return (
			<ProductList
				products={filteredProducts}
				addCartItem={addCartItem}
				settings={settings}
				loadMoreProducts={null}
				hasMore={false}
				columnCountOnMobile={columnCountOnMobile}
				columnCountOnTablet={columnCountOnTablet}
				columnCountOnDesktop={columnCountOnDesktop}
				columnCountOnWidescreen={columnCountOnWidescreen}
				columnCountOnFullhd={columnCountOnFullhd}
				isCentered={isCentered}
				className={className}
				columnCount={columnCount}
				is_pack={is_pack}
			/>
		);
	}
}
