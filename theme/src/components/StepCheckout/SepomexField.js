import React from 'react';
import {Select} from 'antd';



import axios from "axios";


const { Option } = Select;


export default class SepomexField extends React.Component{
	constructor(props){
		super(props)
	}

 

	render(){
		const { showArrow,meta, field, label, input,input:{ onChange }, className, id, handleSearch, handleChange ,selected,  onBlur, getAllZipCodes } = this.props;
		const { data  } = this.props;		
	

		console.log( this.props );

    let error = false
    if( meta.error ){
      error = true;
    }

    if( !meta.dirty ){
      error = true;
    }


		return(
			<div className={`${className} ${ error  ? "error" : ""}`}>
				<label htmlFor={id}>
					{label}
				</label>
				<Select
          {...input}
	        placeholder={""}
	        defaultActiveFirstOption={true}
	        showArrow={ showArrow ||  false}
	        filterOption={false}
	        notFoundContent={null}
	      >
	      { data && data.length > 0 ? data.map(d => (
	      		    	 <Option key={d.value}>{d.text}</Option>
	      		   		)) : ''
	      		   	}
	      </Select>
			</div>
		)
	}
}
