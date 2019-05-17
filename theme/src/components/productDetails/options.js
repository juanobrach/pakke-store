import React from 'react';
import { NavLink } from 'react-router-dom';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const Option = ({ option, onChange, selectedOptions }) => {
	const values = option.values
		.map((value, index) => {
			console.log(value)
			if( option.control == 'radio'){
				console.log("change")
				let checked = false;
				if( selectedOptions[option.id] === value.id ){
					checked = true;
					console.log(checked)
				}

				return (
					<div key={index} className={ (checked ? "checked" : "") }>
						<label>
						{value.name}
						<input style={{ display:'none'}} onChange={e => {
							onChange(option.id, e.target.value);
						}} checked={ checked }  name={option.name} type="radio" value={value.id} />
						</label>
					</div>
				)
			}else{
				return(
					<option key={index} value={value.id}>
						{value.name}
					</option>
				)
			}
		});

	const notSelectedTitle = `${text.selectOption} ${option.name}`;
	
	let controlElement = "";
	if( option.control == 'radio'){
		controlElement = <div className="radio-box is-fullwidth" >{values}</div>
	}else{
		controlElement = <span className="select is-fullwidth">
					<select
						onChange={e => {
							onChange(option.id, e.target.value);
						}}
					>
						<option value="">{notSelectedTitle}</option>
						{values}
					</select>
					</span>;
	}
	return (
		<div className="product-option">
			<div className="product-option-name">{option.name}</div>
			{controlElement}
		</div>
	);
};

const Options = ({ options, onChange, selectedOptions }) => {
	if (options && options.length > 0) {
		console.log(options)
		const items = options.map((option, index) => (
			<Option key={index} option={option} onChange={onChange} selectedOptions={selectedOptions} />
		));

		return <div className="product-options">{items}</div>;
	} else {
		return null;
	}
};
export default Options;
