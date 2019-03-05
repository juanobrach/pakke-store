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
	columnCountOnMobile = 1,
	columnCountOnTablet = 1,
	columnCountOnDesktop = 1,
	columnCountOnWidescreen = 2,
	columnCountOnFullhd = 1
}) => {
	const columnCount = 5;

	const columnSizeOnMobile = columnCount / columnCountOnMobile;
	const columnSizeOnTablet = columnCount / columnCountOnTablet;
	const columnSizeOnDesktop = columnCount / columnCountOnDesktop;
	const columnSizeOnWidescreen = columnCount / columnCountOnWidescreen;
	const columnSizeOnFullhd = columnCount / columnCountOnFullhd;

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

	return (
		<div
			className={`product-item-column column is-${columnSizeOnMobile}-mobile is-${columnSizeOnTablet}-tablet is-${columnSizeOnDesktop}-desktop is-${columnSizeOnWidescreen}-widescreen is-${columnSizeOnFullhd}-fullhd ${
				product.stock_status
			}`}
		>
			<NavLink to={product.path}>
				<figure className="image" style={{ height: imageHeight }}>
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
			<ItemActions addCartItem={addCartItem} product={product} />
		</div>
	);
};

export default Item;
