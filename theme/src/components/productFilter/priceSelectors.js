import React from 'react';
import { NavLink } from 'react-router-dom';
import { Range } from 'rc-slider';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

export default class PriceSelectors extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minValue: props.minValue > 0 ? props.minValue : props.minPrice,
			maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
		};
		this.rangePriceSelector = this.rangePriceSelector.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.minPrice !== this.props.minPrice ||
			nextProps.maxPrice !== this.props.maxPrice
		) {
			this.setState({
				minValue: nextProps.minPrice,
				maxValue: nextProps.maxPrice
			});
		}
	}

	setValues = values => {
		if (Array.isArray(values) && values.length === 2) {
			this.setState({
				minValue: values[0],
				maxValue: values[1]
			});
		}
	};

	setMin = el =>{
		this.setState({
			minValue: el.target.value
		})
	}

	setMax = el =>{
		this.setState({
			maxValue: el.target.value
		})
	}

	rangePriceSelector( products, minPrice, maxPrice  ){

		let ranges = [
			{
				min: 0,
				max: minPrice,
				counted:0
			},
			{
				min: Math.round( maxPrice / 3 ),
				max: maxPrice,
				counted:0
			},
			{
				min: maxPrice,
				max:0,
				counted:0
			}
		]


		ranges.map( (range, i) =>{

			let count = 0;
			products.forEach( product =>{
				if( product.regular_price >= range.min &&  product.regular_price <= range.max ){
					ranges[i].counted += 1;	
				}else if( product.regular_price >= range.maxPrice ){
					ranges[i].counted += 1;						
				}
			})
		})
		return (
			<div className="price-list-filter">
				<p onClick={ ()=> {
							this.props.setPriceFromAndTo( ranges[0].min, ranges[0].max)
						}}>Hasta $ {ranges[0].max} ({ranges[0].counted})</p>
				
				<p onClick={ ()=> {
							this.props.setPriceFromAndTo( ranges[1].min, ranges[1].max);
						}}>$ {ranges[1].min} a $ {ranges[1].max} ({ranges[1].counted})</p>
				
				<p onClick={ ()=> {
							this.props.setPriceFromAndTo( ranges[2].min);
						}}>Más de $ {maxPrice} ({ranges[2].counted})</p>
			</div>
		)
	}

	render() {
		const { minPrice, maxPrice, setPriceFromAndTo, settings, products } = this.props;

		return (
			<div className="price-filter">
				<div className="attribute-title" style={{ marginBottom:'0'}}>{text.price}</div>
				{ this.rangePriceSelector(products, minPrice, maxPrice) }
				<div className="is-flex min-max-value">
					<div className="min-field">
						<input type="number" placeholder="Minimo" onChange={this.setMin} />
					</div>
					<div className="max-field">
						<input type="number" placeholder="Máximo" onChange={this.setMax}/>
					</div>
					<div>
						<button 	disabled={maxPrice === 0} onClick={ ()=> {
							setPriceFromAndTo( this.state.minValue, this.state.maxValue);
						}}></button>	
					</div>
				</div>
			</div>
		);
	}
}
