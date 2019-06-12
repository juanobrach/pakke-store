import React from 'react';
import { Cvc } from "react-credit-card-primitives";


const CvcComponent = field => {

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
		<Cvc
			{...field.input}
			onChange={field.handleChange}
			cardType={field.cardType}
			masked={true} 
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
          <input  {...getInputProps() } masked={true} placeholder="" />
        </React.Fragment>
      )
		 }}/>
	</div>
)};

export default CvcComponent;
