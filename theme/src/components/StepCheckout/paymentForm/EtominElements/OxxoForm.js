import React from 'react';
import { Field, reduxForm } from 'redux-form';


class OxxoForm extends React.Component {

  constructor(props) {
    super(props);
  }


  render(){
    const { inProgress, handleSubmit,handleBack, classes } = this.props;
    const submit = this.submit;
    return (
      <form onSubmit={handleSubmit} >
        <p style={{backgroundColor:'#623a8a', padding:'2em', color:'white'}}>Una vez creada la orden se generara un voucher con un código de pago para que puedas pagar tu compra en tiendas OXXO.</p>
        <div className="columns is-marginless is-vcentered" style={{position:'absolute', left:'0', right:'0', width:'100%'}}>
          <div className="column">
            <button onClick={handleBack} className="back-button">Cancelar</button>  
          </div>
          <div className="column">
            <button type="submit" 
              className="is-pulled-right"
              disabled={inProgress}
              >Continuar</button>
          </div>
        </div>
      </form>
    )


  }

}

export default reduxForm({
  form: 'OxxoForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(OxxoForm);


