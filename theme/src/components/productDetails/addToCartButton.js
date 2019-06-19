import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const AddToCartButton = ({
	product,
	variant,
	addCartItem,
	isAllOptionsSelected,
	isBestOnOptions
}) => {
	let buttonStyle = {};
	if (
		themeSettings.button_addtocart_bg &&
		themeSettings.button_addtocart_bg.length > 0
	) {
		buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
	}
	if (
		themeSettings.button_addtocart_color &&
		themeSettings.button_addtocart_color.length > 0
	) {
		buttonStyle.color = themeSettings.button_addtocart_color;
	}

	let addToCartText =
		themeSettings.button_addtocart_text &&
		themeSettings.button_addtocart_text.length > 0
			? themeSettings.button_addtocart_text
			: 'Comprar';

	
	let buttonClass = "is-success";
	let	isDisabled = false;
	let messageText = "";
	if (product.stock_status === 'discontinued') {
		isDisabled  = true;
		buttonClass = "is-dark";
		messageText = text.discontinued;
	} else if (product.variable && variant && variant.stock_quantity > 0) {
		isDisabled  = false;
		buttonClass = "is-success";
		messageText = "";
	} else if (product.variable && !isAllOptionsSelected && isBestOnOptions ) {
		isDisabled  = true;
		buttonClass = "is-success";
		messageText = text.optionsRequired;
	} else if (product.stock_status === 'available') {
		isDisabled  = false;
		buttonClass = "is-success";
		messageText = "";
	} else if ( product.stock_status === 'out_of_stock') {
		isDisabled  = true;
		buttonClass = "is-success";
		messageText = text.outOfStock;
	}else if( isBestOnOptions ){
		isDisabled  = false;
		buttonClass = "is-success";
	}else if (product.variable && !product.stock_backorder && product.stock_status === 'out_of_stock') {
		isDisabled  = true;
		buttonClass = "is-success";
		messageText = "no ofrece backorders";
	} 

	return (
		<React.Fragment>
		<button
			className="button is-success is-fullwidth"
			style={buttonStyle}
			onClick={addCartItem}
			disabled={ ( isDisabled  ? 'disabled' : '')  }
		>
			<span className="shoping-cart-icon"></span>				
			{addToCartText}
		</button>
		{messageText}
		</React.Fragment>
	);
};

export default AddToCartButton;
