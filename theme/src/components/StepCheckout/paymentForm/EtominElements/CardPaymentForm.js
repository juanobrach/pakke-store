import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import InputField from '../../inputField';
import SepomexField from '../../SepomexField.js';
import NumberComponent from '../../NumberComponent.js';
import CvcComponent from '../../CvcComponent.js';
import {Button} from 'antd';



import { Number, Cvc, Expiration } from "react-credit-card-primitives";
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';


class CardPaymentForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleCardNumerChange = this.handleCardNumerChange.bind(this);
  }

  validateRequired = (value) =>{
    value && value.length > 0 ? undefined : 'Este campo es requerido';
  }


  handleCardNumerChange = (event) =>{
    if( event.value.length <= 16 ){
      this.props.dispatch( change('CardPaymentForm', 'card_number', event.value ));
    }
  }

  handleCVCNumerChange = (event) =>{
    if( event.value.length <= 5 ){
      this.props.dispatch( change('CardPaymentForm', 'card_cvc', event.value ));
    }
  }



  render(){
    const { inProgress, handleSubmit, handleBack, classes } = this.props;
    const submit = this.submit;
    return (
      <form onSubmit={handleSubmit} className={"card-payment-form"}>
        <div className='columns'>
          <div className="column is-3">
            <Field
            name="card_name"
            id="customer.first_name"
            component={InputField}
            label={"Nombre como aparece en la tarjeta"}
            type="text"
            validate={this.validateRequired()}
            className={'payment-checkout-field'}
            />
          </div>
          <div className="column is-4">
            <Field  type="hidden"
                    name="card_number"
                    id="customer.cardNumber"
                    component={ NumberComponent }
                    validate={this.validateRequired()}
                    label={"Número de la tarjeta"}
                    handleChange={this.handleCardNumerChange}
                    className={'payment-checkout-field card-number'}
            />
          </div>
          <div className="column is-3">
            <Field
            name="card_month_exp"
            id="card_month_exp"
            className="card_month_exp payment-checkout-field"
            placeholder="Mes"
            label={"Mes"}
            component={SepomexField}
            data={[{value:'01', text:'01'},{value:'02', text:'02'}]}
            showArrow={true}
            validate={this.validateRequired()}
            />
            <p className="mont-year-exp-separator">/</p>
            <Field
            name="card_year_exp"
            id="card_year_exp"
            className="card_year_exp payment-checkout-field"
            placeholder="Año"
            label={"Año"}
            component={SepomexField}
            data={[{value:'20', text:'20'},{value:'21', text:'2021'}]}
            validate={this.validateRequired()}
            showArrow={true}
            />
          </div>
          <div className="column is-2">
              <Field
              name="card_cvc"
              id="card_Cvc"
              className="payment-checkout-field card_Cvc"
              label={"Cvv"}
              component={CvcComponent}
              type="number"
              validate={this.validateRequired()}
              handleChange={this.handleCVCNumerChange}
              />
          </div>
        </div>
        <div className="columns is-marginless is-vcentered" style={{position:'absolute', left:'0', right:'0', width:'100%'}}>
          <div className="column">
            <button onClick={handleBack} className="back-button">Cancelar</button>  
          </div>
          <div className="column">
            <Button
              onClick={handleSubmit}
              className="is-pulled-right"
              disabled={inProgress}
              loading={inProgress}
              >Agregar este nuevo método</Button>
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


