import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../inputField';

import { Number, Cvc, Expiration } from "react-credit-card-primitives";
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';

const handleCardNumerChange = (event) =>{
  console.log(event)
}

class CardPaymentForm extends React.Component {

  constructor(props) {
    super(props);
  }


  render(){
    const { inProgress, handleSubmit } = this.props;
    const submit = this.submit;
    return (
      <form onSubmit={handleSubmit}>
        <div className='columns'>
          <div className="column is-3">
            <h4>
              Nombre como aparece en la tarjeta
            </h4>
            <Field
            name="name_card"
            id="customer.first_name"
            component={InputField}
            type="text"
            />
          </div>
          <div className="column is-4">
            <Number
             onChange={handleCardNumerChange}
             render={({ value, valid, type, getInputProps }) => (

               <div className="card-holder-container">
                 <h4>Número de la tarjeta</h4>
                  <label htmlFor="" className="card-number-label">
                    <input  name="number" className="card-input" {...getInputProps() } placeholder="" />
                   {
                     type == 'Visa' ? <img src="/assets/images/payment/visa.svg" alt="" /> : ''
                   }
                   {
                     type == 'American Express' ? <img src="/assets/images/payment/american_express.png" alt="" /> : ''
                   }
                   {
                     type == 'Mastercard' ? <img src="/assets/images/payment/mastercard.svg" alt="" /> : ''
                   }


                  </label>
                 <div>{JSON.stringify({ value, valid, type })}</div>
               </div>
             )} />
          </div>
          <div className="column is-3">
            <h4></h4>
            <Field
            name="card_month_exp"
            id="card_month_exp"
            className="card_month_exp"
            placeholder="Mes"
            component={InputField}
            type="input"
            />
             <p className="mont-year-exp-separator">/</p>
             <Field
            name="card_year_exp"
            id="card_year_exp"
            className="card_year_exp"
            placeholder="Año"
            component={InputField}
            type="input"
            />
          </div>
          <div className="column is-2">
              <h4></h4>
              <Field
              name="Cvc"
              id="card_Cvc"
              className="card_Cvc"
              placeholder="CVV"
              component={InputField}
              type="input"
              />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <button type="submit" 
              className="is-pulled-right"
              disabled={inProgress}
              >Agregar este nuevo método</button>
          </div>
        </div>
      </form>
    )


  }

}

export default reduxForm({
  form: 'CardPaymentForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(CardPaymentForm);


