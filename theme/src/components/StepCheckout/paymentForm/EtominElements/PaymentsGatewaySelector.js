import React from 'react';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../inputField';

import { Number, Cvc, Expiration } from "react-credit-card-primitives";
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';


export default class PaymentsGatewaySelector extends React.Component  {
  render(){
    return( 
        <React.Fragment>
            <div className="payment-gateways">
              <h3>
                  Agregar nuevo método de pago
              </h3>
              <div className="columns gateways-selector">
                <div className="column is-3">
                    <label className='checkbox-container'>
                        <input
                            type="radio"
                            onChange={this.props.handleChangePaymentMethod}
                            name="payment_method"
                            defaultChecked="checked"
                            value="card"

        
                        />
                        <h4>
                          Tarjeta de crédito
                        </h4>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="column is-3">
                    <label className='checkbox-container'>
                        <input
                            type="radio"
                            onChange={this.props.handleChangePaymentMethod}
                            name="payment_method"
                            value="spei"
                        />
                        <h4>
                          SPEI
                        </h4>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="column is-3">
                    <label className='checkbox-container'>
                        <input
                            type="radio"
                            onChange={this.props.handleChangePaymentMethod}
                            name="payment_method"
                            value="oxxo"
                        />
                        <h4>
                          OXXO
                        </h4>
                        <span className="checkmark"></span>
                    </label>
                </div>
              </div>
              <div className="columns">
                <div className="column divisor">
                  <hr />
                </div>
              </div>
            </div>
        </React.Fragment>
      )

  }
};
