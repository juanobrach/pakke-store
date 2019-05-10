import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';




import { Redirect } from 'react-router-dom';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import ConfirmStep from './ConfirmStep';



const styles = theme => ({
  root: {
    width: '90%',
    background:'transparent'
  },
  backButton: {
    marginRight: theme.spacing.unit,
    borderRadius: '12px',
    padding: '5px 20px',
    border: '1px solid #cccccc',
    fontFamily: 'open_sansregular'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  MuiPaper:{
    backgroundColor:'whitesmoke'
  },
  wizardContainer:{
    backgroundColor:'white',
    borderRadius: '10px',
    minHeight: '500px',
    padding: '0 20px 40px 20px'    
  }
});


function getSteps() {
  return ['Envío', 'Pago', 'Confirmación'];
}


class StepCheckout extends React.Component {

  constructor(props){
    super(props);
    props.loadShippingMethods();
    props.loadPaymentMethods();

    let customerProperties = props.state.customerProperties; 
    if( customerProperties != undefined &&  customerProperties.customer_settings ){
      props.updateCart({
        customer_id: customerProperties.customer_settings.id
      })
    }
  }

  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


  componentDidMount() {
    this.props.customerData({
      token: Lscache.get('auth_data')
    });

    this.props.cartLayerInitialized({
      cartlayerBtnInitialized: false
    })
  }

  // Asigno metodo de envio y pago ya que por el momento solo existe una variante por cada uno
  componentDidUpdate( prevProps ){
    if( this.props.state.shippingMethods != prevProps.state.shippingMethods  ){
      let shippingMethods = this.props.state.shippingMethods;
      if( shippingMethods != undefined && shippingMethods.length > 0){
        this.handleShippingMethodSave( shippingMethods[0].id );
      }
    }
    if( this.props.state.paymentMethods != prevProps.state.paymentMethods  ){
      let paymentMethods  = this.props.state.paymentMethods;
      if( paymentMethods != undefined && paymentMethods.length > 0){
        this.handlePaymentMethodSave( paymentMethods[0].id );
      }
    }
  }


  handleContactsSubmit = values => {
    console.log('guardando direccion', values )
    let { shipping_address, billing_address } = values;
    shipping_address = Object.assign({full_name: `${values.first_name}`}, shipping_address);
    this.props.updateCart({
      email: values.email,
      mobile: values.mobile,
      first_name: values.first_name,
      last_name: values.last_name,
      shipping_address,
      billing_address
    });
    this.handleNext()
  };

  handleLocationSave = shippingLocation => {
    this.props.updateCart(
      {
        shipping_address: shippingLocation,
        billing_address: shippingLocation,
      }
    );
  };

  handleShippingMethodSave = shippingMethodId => {
    console.log('guardando shipping')
    this.props.updateCart(
      {
        payment_method_id: null,
        shipping_method_id: shippingMethodId
      },
      cart => {
        this.props.loadPaymentMethods();
      }
    );
  };


  handleSetFetchedShipping = shippingAddressId => {
    console.log('guardando shipping historico', shippingAddressId );
    let customerSettings = this.props.state.customerProperties.customer_settings;
    let selectedAddress = customerSettings.addresses[shippingAddressId];
    this.props.updateCart({
      email: customerSettings.email,
      mobile: selectedAddress.phone,
      first_name: customerSettings.first_name,
      last_name: customerSettings.last_name,
      shipping_address: customerSettings.addresses[shippingAddressId],
      billing_address : {}
    });
    this.handleNext()


  }

  handlePaymentMethodSave = paymentMethodId => {
    this.props.updateCart({
      payment_method_id: paymentMethodId
    });
  };

  handlePaymentStepSubmit = data =>{

  }

  handlePaymentStepSuccess = data => {
    this.props.updateCart({
      etomin_card_token: data
    })
    this.handleNext()
  }

  handleSuccessPayment = () => {
    this.props.checkout(null);
  };

  handleCheckoutWithToken = tokenId => {
    this.props.updateCart(
      {
        payment_token: tokenId
      },
      cart => {
        this.props.checkout(null);
      }
    );  
  };

  render() {
    const { classes, checkout } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    // const activeStep  = 2;

    const {
      settings,
      cart,
      customerProperties,
      paymentMethods,
      shippingMethods,
      shippingMethod,
      checkoutFields,
      cartlayerBtnInitialized,
      processingCheckout
    } = this.props.state;


    const {
      checkoutInputClass = 'checkout-field',
      checkoutButtonClass = 'checkout-button',
      checkoutEditButtonClass = 'checkout-button-edit'
    } = themeSettings;


    if (Lscache.get('auth_data') === null && customerProperties === undefined) {
      Lscache.flush();
      return (
        <Redirect to={{
            pathname: '/login'
        }}/>
      );
    }

    const StepIcon = ({ label, color = 'grey', textColor = '#ff5959', activeStep }) => (
      <div style={{ position: 'relative', padding: '0 38px'}}>
        {console.log('activeStep', activeStep )}

        {

          label == 'Envío' ? <img src="../../../assets/images/checkout-steps/envio.png" alt=""/> : ''
        }
        {
          label == 'Pago' ?
            activeStep  == 1 ? <img src="../../../assets/images/checkout-steps/pago.png" alt=""/> : 
                                    <img src="../../../assets/images/checkout-steps/pago-off.png" alt=""/>
            :""         
        }

        {
          label == 'Confirmación' ?
            activeStep  == 2 ? <img src="../../../assets/images/checkout-steps/confirmacion.png" alt=""/> :
                                            <img src="../../../assets/images/checkout-steps/confirmacion-off.png" alt=""/>
            : ""
        }
        <div style={{ color: textColor, 
          lineHeight: '24px', 
          fontFamily:'open_sanssemibold',
          fontSize:'15px' }}>{label}</div>
      </div>
    );

    return (
      <div className={classes.root}>
          <Stepper className={classes.MuiPaper} activeStep={activeStep} alternativeLabel>
              <Step key="Envío">
                <StepButton
                   icon={<StepIcon label="Envío" activeStep={this.state.activeStep} />}
                   onClick={() => console.log('Clicked') }
                />
              </Step>
              <Step key="Pago">
                <StepButton
                   icon={<StepIcon label="Pago" activeStep={this.state.activeStep} />}
                   onClick={() => console.log('Clicked') }
                />
              </Step>
              <Step key="Confirmación">
                <StepButton
                   icon={<StepIcon label="Confirmación" activeStep={this.state.activeStep} />}
                   onClick={() => console.log('Clicked') }
                />
              </Step>
          </Stepper>
         <div className={classes.wizardContainer}>
            <div>
              
              { activeStep === 0 ? 
                <ShippingStep
                  customerProperties={customerProperties}
                  saveShippingLocation={this.handleLocationSave}
                  checkoutFields={checkoutFields}
                  handleContactsSubmit={this.handleContactsSubmit}
                  onSubmit={this.handleNext}
                  shippingMethod={shippingMethod}
                  shippingMethods={shippingMethods}
                  handleSetFetchedShipping={this.handleSetFetchedShipping}
                /> : ''
              }


              { activeStep === 1 ? 
                <PaymentStep
                  customerProperties={customerProperties}
                  initialValues={cart}
                  checkoutFields={checkoutFields}
                  onSubmit={this.handleNext}
                  cart={cart}
                  settings={settings}
                  processingCheckout={processingCheckout}
                  handleSuccessPayment={this.handleSuccessPayment}
                  onCreateToken={this.handleCheckoutWithToken}
                  handlePaymentStepSuccess={this.handlePaymentStepSuccess}
                  handlePaymentStepSubmit={this.handlePaymentStepSubmit}
                  updateCart={this.props.updateCart}
                  handleBack={this.handleBack}
                  classes={classes}

                /> : ''
              }

              { activeStep === 2 ? 
                <ConfirmStep
                  customerProperties={customerProperties}
                  initialValues={cart}
                  checkoutFields={checkoutFields}
                  onSubmit={this.handleContactsSubmit}
                  handleSuccessPayment={this.handleSuccessPayment}
                  handleBack={this.handleBack}
                  classes={classes}
                  checkout={checkout}
                  cart={cart}

                  {...this.props}
                /> : ''
              }

            </div>
         </div>
      </div>
    );
  }
}

StepCheckout.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(StepCheckout);