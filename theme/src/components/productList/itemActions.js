import React from 'react';
const ItemActions = ({addCartItem, product})=> {

	const handlerAddToCart = ()=>{
		console.log('product', product)
		let item = {
			product_id: product.id,
			quantity: 1
		};

		addCartItem(item);
	}

	return (
		<div className="item-actions level">
			<div className="level-left">
			<p onClick={handlerAddToCart}><span className="add-to-cart-icon"></span> Agregar al carrito</p>
			</div>
			<div className="level-right favourite-heart-icon"></div>
		</div>
	);
};

export default ItemActions;
