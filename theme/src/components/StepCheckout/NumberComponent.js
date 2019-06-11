import React from 'react';
import { Number } from "react-credit-card-primitives";


const NumberComponent = field => {

	let error = false
	if( field.meta.error ){
		error = true;
	}

	if( !field.meta.dirty ){
		error = true;
	}

	return(
	<div className={`${field.className} ${ error  ? "error" : ""}`}>
		<label htmlFor={field.id} >
			{field.label}
		</label>
		<Number
			{...field.input}
		 onChange={field.handleChange}
		 render={ ({ value, valid, type, getInputProps }) => {
		  let props = getInputProps();
		  let error = false
		  
		  if( !valid ){
		    error = true;
		  }

		  if( !field.meta.dirty ){
		    error = true;
		  }
		  return(
		  	<React.Fragment> 
        <input  className="card-input" {...getInputProps() } placeholder="" />
       {
         type == 'Visa' ? <img src="/assets/images/payment/visa.svg" alt="" /> : ''
       }
       {
         type == 'American Express' ? <img src="/assets/images/payment/american_express.png" alt="" /> : ''
       }
       {
         type == 'Mastercard' ? <img src="/assets/images/payment/mastercard.svg" alt="" /> : ''
       }

       {
         !type  ? <img src="/assets/images/icons/credit-card.png" alt="" /> : ''
       }
       </React.Fragment>
      )
		 }}/>
	</div>
)};

export default NumberComponent;
