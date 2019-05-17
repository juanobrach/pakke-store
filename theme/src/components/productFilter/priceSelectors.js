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

	render() {
		const { minPrice, maxPrice, setPriceFromAndTo, settings } = this.props;

		return (
			<div className="price-filter">
				<div className="attribute-title">{text.price}</div>
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
