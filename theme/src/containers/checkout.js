import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MetaTags from '../components/metaTags';
import OrderSummary from '../components/orderSummary';
import CheckoutForm from '../components/__checkoutForm';
import StepCheckout from '../components/StepCheckout';


const CheckoutContainer = props => {
	const {
		state: { pageDetails }
	} = props;

	return (
		<Fragment>
			<MetaTags
				title={pageDetails.meta_title}
				description={pageDetails.meta_description}
				canonicalUrl={pageDetails.url}
				ogTitle={pageDetails.meta_title}
				ogDescription={pageDetails.meta_description}
			/>

			<section className="section section-checkout">
				<div className="container is-fluid">
					<StepCheckout {...props} />
				</div>
			</section>
		</Fragment>
	);
};

CheckoutContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default CheckoutContainer;
