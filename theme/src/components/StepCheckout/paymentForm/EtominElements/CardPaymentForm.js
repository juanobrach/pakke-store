import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import InputField from '../../inputField';
import SepomexField from '../../SepomexField.js';
import NumberComponent from '../../NumberComponent.js';
import CvcComponent from '../../CvcComponent.js';
import {Button} from 'antd';
import moment from 'moment';

class CardPaymentForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleCardNumerChange = this.handleCardNumerChange.bind(this);
    this.state = {
      creditCardType: ''
    }
  }

  validateRequired = (value) =>{
    value && value.length > 0 ? undefined : 'Este campo es requerido';
  }


  handleCardNumerChange = (event) =>{
    if( event.value.length <= 16 ){
      this.props.dispatch( change('CardPaymentForm', 'card_number', event.value ));
      this.setState({ creditCardType: event.type })
    }
  }

  handleCVCNumerChange = (event) =>{
    if( event.value.length <= 5 ){
      this.props.dispatch( change('CardPaymentForm', 'card_cvc', event.value ));
    }
  }

  getYears = ()=>{
    const actualYear = moment().format('YY'); 
    const years = [];
    
    let acumulator = actualYear;
    for (var i = 0; i <= 20 ; i++) {
      years.push(
        {
          value: acumulator,
          text: `20${acumulator}`,
        }
      );
      acumulator++
    }
    return years;
  }

  getMonts = ()=>{
    const start = 1; 
    const months = [];
    
    let acumulator = start;
    for (var i = 0; i <= 11 ; i++) {
      
      
      let val = ( acumulator < 10 ? `0${acumulator}` : acumulator );
      months.push(
        {
          value: val,
          text: val,
        }
      );
      acumulator++
    }
    return months;
  }



  render(){
    const { inProgress, handleSubmit, handleBack, classes } = this.props;
    const submit = this.submit;
    const years = this.getYears();
    const months = this.getMonts();
      




    


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
            data={months}
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
            data={years}
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
              cardType={this.state.creditCardType}
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


