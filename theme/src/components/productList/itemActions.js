import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemActions = ({addCartItem, product, isPack})=> {

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
				<div className="level">
					<div className="level-left">
						<span className="add-to-cart-icon"></span> 
					</div>
					<div className="level-right">

						{ !isPack &&
						<p onClick={handlerAddToCart} style={{ opacity:'.6'}}>
							Agregar al carrito
						</p>}

						{ isPack &&
						<NavLink to={product.path}>
							<p style={{ opacity:'.6'}}>
							Elige tu opción
							</p>
						</NavLink>
						}


					</div>
				</div>
			</div>
			<div className="level-right favourite-heart-icon"></div>
		</div>
	);
};

export default ItemActions;
