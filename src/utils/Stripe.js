import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

class Stripe extends Component {
  state = { stripe: undefined };

  componentDidMount = () => {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () =>
      this.setState({
        stripe: window.Stripe('pk_test_qMESFx9h1kCkNqJ3vLzDrVvX')
      });

    document.body && document.body.appendChild(stripeJs);
  };

  render = () => {
    const { stripe } = this.state;
    const { children } = this.props;

    if (!stripe) {
      return <div>{children}</div>;
    }

    return <StripeProvider stripe={stripe}>{children}</StripeProvider>;
  };
}

export default Stripe;
