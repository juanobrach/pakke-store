import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';


import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import ShippingStep from './ShippingStep';



const styles = theme => ({
  root: {
    width: '90%',
    background:'transparent'
  },
  backButton: {
    marginRight: theme.spacing.unit,
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
    minHeight: '500px'    
  }
});


function getSteps() {
  return ['Envio', 'Pago', 'Confirmacion'];
}


class StepCheckout extends React.Component {

  constructor(props){
    super(props)
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
    this.props.loadShippingMethods();
    this.props.loadPaymentMethods();
    this.props.customerData({
      token: Lscache.get('auth_data')
    });

    this.props.cartLayerInitialized({
      cartlayerBtnInitialized: false
    })
  }

  changeStep = step => {
    this.setState({ step: step });
  };

  handleContactsSave = () => {
    this.changeStep(2);
  };

  handleContactsEdit = () => {
    this.changeStep(1);
  };

  handleShippingSave = () => {
    this.changeStep(3);
  };

  handleShippingEdit = () => {
    this.changeStep(2);
  };

  handleContactsSubmit = values => {
    let { shipping_address, billing_address } = values;
    shipping_address = Object.assign({full_name: `${values.first_name} ${values.last_name}`}, shipping_address);
    this.props.updateCart({
      email: values.email,
      mobile: values.mobile,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      shipping_address,
      billing_address
    });

    this.handleContactsSave();
  };

  handleLocationSave = shippingLocation => {
    this.props.updateCart(
      {
        shipping_address: shippingLocation,
        billing_address: shippingLocation,
        payment_method_id: null,
        shipping_method_id: null
      },
      cart => {
        this.props.loadShippingMethods();
        this.props.loadPaymentMethods();
      }
    );
  };

  handleShippingMethodSave = shippingMethodId => {
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

  handlePaymentMethodSave = paymentMethodId => {
    this.props.updateCart({
      payment_method_id: paymentMethodId
    });
  };

  isShowPaymentForm = () => {
    const { payment_method_gateway } = this.props.state.cart;
    const paymentGatewayExists =
      payment_method_gateway && payment_method_gateway !== '';
    return paymentGatewayExists;
  };

  handleShippingSubmit = values => {
    if (this.isShowPaymentForm()) {
      const { shipping_address, billing_address, comments } = values;

      this.props.updateCart({
        shipping_address,
        billing_address,
        comments
      });
      this.handleShippingSave();
    } else {
      this.props.checkout(values);
    }
  };

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
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const icon = "<div>asd</div>"


    const {
      settings,
      cart,
      customerProperties,
      paymentMethods,
      shippingMethods,
      shippingMethod,
      loadingShippingMethods,
      loadingPaymentMethods,
      checkoutFields,
      processingCheckout,
      cartlayerBtnInitialized
    } = this.props.state;
    const {
      checkoutInputClass = 'checkout-field',
      checkoutButtonClass = 'checkout-button',
      checkoutEditButtonClass = 'checkout-button-edit'
    } = themeSettings;


    return (
      <div className={classes.root}>
          <Stepper className={classes.MuiPaper} activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
         <div className={classes.wizardContainer}>
            <div>
              
              { activeStep === 0 ? 
                <ShippingStep
                  customerProperties={customerProperties}
                  initialValues={cart}
                  saveShippingLocation={this.handleLocationSave}
                  checkoutFields={checkoutFields}
                  onSubmit={this.handleContactsSubmit}
                  onNext={this.handleNext}

                /> : ''
              }


            </div>
            <div>
              {this.state.activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <div>
                    { activeStep != 0 ? 
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      : ''
                    }
                   
                  </div>
                </div>
              )}
            </div>
         </div>
      </div>
    );
  }
}

StepCheckout.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StepCheckout);