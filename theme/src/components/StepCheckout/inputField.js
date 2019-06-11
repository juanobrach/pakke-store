import React from 'react';

const InputField = field => {

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
		<input
			{...field.input}
			disabled={field.disabled}
			type={field.type}
			id={field.id}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
		{field.meta.touched &&
			field.meta.error && <span className="error">{field.meta.error}</span>}
	</div>
)};

export default InputField;
