import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';
import axios from 'axios';
import api from '../../lib/api';
import {Button} from 'antd';



const SummaryItem = ({ settings, item }) => {
    let thumbnail = helper.getThumbnailUrl(
        item.image_url,
        themeSettings.cartThumbnailWidth
    );

    if( !thumbnail ){
      thumbnail = 'http://via.placeholder.com/100x100';
    }

    return (
        <tr>
            <td className="td-product-name">
              <div className="image">
                  <NavLink to={item.path}>
                      <img
                        className="product-image"
                        src={thumbnail}
                        title={item.name}
                      />
                  </NavLink>
              </div>
              <NavLink to={item.path}>{item.name}</NavLink>
              {item.variant_name}
            </td>
            <td>
              {item.quantity}
            </td>

            <td>
              {helper.formatCurrency(item.price_total, settings)}
            </td>
        </tr>
    );
};


export default class ConfirmStep extends React.Component {




    constructor(props) {
        super(props);
        this.state = {
          acceptTerms: false
        }
        this.handleTerms = this.handleTerms.bind(this);
    }


    onChange = event => {
        const checked = event.target.checked;
        this.setState({ checked: checked });
    };
    
    handleSubmitOrder = () => {
      console.log('handle submit')
      this.props.checkout(this.props.cart);
    }
  
    handleTerms = () =>{
      this.setState( prevState => ({acceptTerms: !prevState.acceptTerms }));
    }


    render(){
        const {
            customerProperties,
            onSubmit,
            state: { cart, settings, processingCheckout },
            handleSuccessPayment,
            handleBack
        } = this.props;


        if (cart && cart.items && cart.items.length > 0) {
            const items = cart.items.map(item => (
                <SummaryItem
                    key={item.id}
                    item={item}
                    settings={settings}
                />
            ));

            const isDisabled = this.state.acceptTerms;
            const classChecked = this.state.acceptTerms ? 'attribute-checked' : '';
            const classDisabled = isDisabled ? 'attribute-disabled' : '';

            return (
                <div className="confirm-step">
                    <section>
                        <h3>
                            Resumen del pedido
                        </h3>
                        <div className="columns">
                            <div className="column is-8">
                                <table className="table is-fullwidth">
                                    <thead>
                                        <tr>
                                          <th>Artículo</th>
                                          <th>Cantidad</th>
                                          <th>Importe</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {items}
                                      </tbody>
                                </table>

                            </div>
                            <div className="column is-4">
                              <div className="columns">
                                <div className="column">
                                    Subtotal
                                </div>
                                <div className="column">
                                  <p className="is-pulled-right">
                                    {helper.formatCurrency(cart.subtotal, settings)}
                                  </p>
                                </div>
                              </div>
                              <div className="columns">
                                <div className="column">
                                    IVA (16%)
                                </div>
                                <div className="column">
                                <p className="is-pulled-right">
                                  {helper.formatCurrency(cart.tax_included_total, settings)}
                                </p>
                                </div>
                              </div>
                              <div className="columns">
                                <div className="column">
                                    Gasto de envío
                                </div>
                                <div className="column">
                                  <p className="is-pulled-right">
                                    {helper.formatCurrency(cart.shipping_total, settings)}
                                  </p>
                                </div>
                              </div>
                              <div className="columns">
                                <div className="column">
                                  <hr />
                                </div>
                              </div>
                              <div className="columns" style={{ fontFamily:'open_sansbold', fontSize: '15px'}}>
                                <div className="column">
                                    Total a pagar
                                </div>
                                <div className="column">
                                  <p className="is-pulled-right">
                                    {helper.formatCurrency(cart.grand_total, settings)}
                                  </p>
                                </div>
                              </div>
                              <div className="columns">
                                <div className="column">
                                    <label className={'checkbox-container ' +  classChecked + ' ' + classDisabled}>
                                      <input
                                        type="checkbox"
                                        onChange={this.handleTerms}
                                        checked={this.state.acceptTerms}
                                      />
                                      <p>Acepto <Link target="_blank" to="http://help.pakke.mx/terminos-y-condiciones/"> los Términos y condiciones </Link></p>
                                      <span className="checkmark"></span>
                                    </label>
                                    
                                </div>
                              </div>
                              <div className="columns">
                                <div className="column">
                                  <Button loading={processingCheckout} disabled={processingCheckout || !this.state.acceptTerms }   className="final-step" onClick={this.handleSubmitOrder}>
                                    <img src="/assets/images/icons/finalstep_btn.png" alt="" />
                                    Finalizar compra
                                  </Button>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="colums">
                          <div className="column">
                            <button onClick={handleBack} disabled={ this.state.terms} className="back-button">Cancelar</button>  
                          </div>
                        </div>
                    </section>
                </div>
            );
        }
        return null;
    }
}
