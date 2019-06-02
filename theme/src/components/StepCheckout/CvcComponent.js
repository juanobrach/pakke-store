import React from 'react';
import { Cvc } from "react-credit-card-primitives";


const CvcComponent = field => {
	console.log('field', field)

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
		 render={ ({ value, valid, type, getInputProps }) => {
		  let props = getInputProps();
		  console.log( 'props on change', props );
		  let error = false
		  
		  if( !valid ){
		    error = true;
		  }

		  if( !field.meta.dirty ){
		    error = true;
		  }
		  return(
		    <React.Fragment> 
          <input  {...getInputProps() } placeholder="" />
        </React.Fragment>
      )
		 }}/>
	</div>
)};

export default CvcComponent;
