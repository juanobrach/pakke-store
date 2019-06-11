import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import ItemTags from './itemTags';
import ItemImage from './itemImage';
import ItemPrice from './itemPrice';
import ItemActions from './itemActions';



const Item = ({
	product,
	addCartItem,
	settings,
	columnCountOnMobile = columnCountOnMobile || 1,
	columnCountOnTablet = 2,
	columnCountOnDesktop = columnCountOnDesktop ||  5,
	columnCountOnWidescreen = columnCountOnWidescreen || 5,
	columnCountOnFullhd = columnCountOnFullhd || 2,
	columnCount,
	is_pack,
	listType,
	hasVariants
}) => {
	const _columnCount = columnCount || 5;

	const columnSizeOnMobile = _columnCount / columnCountOnMobile;
	const columnSizeOnTablet = _columnCount / columnCountOnTablet;
	const columnSizeOnDesktop = _columnCount / columnCountOnDesktop;
	const columnSizeOnWidescreen = _columnCount / columnCountOnWidescreen;
	const columnSizeOnFullhd = _columnCount / columnCountOnFullhd;

	const imageHeight =
		themeSettings.list_image_max_height &&
		themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 'auto';
	const placeholderHeight =
		themeSettings.list_image_max_height &&
		themeSettings.list_image_max_height > 0
			? themeSettings.list_image_max_height
			: 200;


	let product_pack = <div className="column boxes-pack">
												<div className="">
													<div className="">
														<ItemImage
															images={product.images}
															productName={product.name}
															height={placeholderHeight}
														/>
													</div>
													<div className="">
													 	<p>
													 	{product.name}
													 	</p>
													 	<NavLink to={product.path}>
													 		<button className="button-view-more">Ver más</button>
													 	</NavLink>
													</div>
												</div>
											</div>

	if( is_pack ){
		return ( product_pack )
	}else{

	console.log( 'prod', product )
	return (

		<div
			className={`product-item-column column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
				product.stock_status
			}`}
			style={{ width: ( listType == 'list' ? '100%' : '') }}
		>	
			<article style={{ backgroundColor:"#fff", borderRadius:'10px', padding:'10px', minHeight: '200px'}}>
				<NavLink to={product.path}>
					<figure className="image" style={{ minHeight: '200px' }}>
						<ItemTags tags={product.tags} />
						<ItemImage
							images={product.images}
							productName={product.name}
							height={placeholderHeight}
						/>
					</figure>
					<div className="content product-caption">
						<div className="product-name">{product.name}</div>
						<ItemPrice product={product} settings={settings} />
					</div>
				</NavLink>
				<ItemActions addCartItem={addCartItem} hasVariants={hasVariants} product={product} />
			</article>
		</div>
	);

	}


};

export default Item;
