import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

class Stripe extends Component {
  state = { stripe: undefined };

  // CMD lifecycle only gets called in browser env
  componentDidMount = () => {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;

    // assign stripe to state when loading in finished
    stripeJs.onload = () =>
      this.setState({
        stripe: window.Stripe('pk_test_qMESFx9h1kCkNqJ3vLzDrVvX')
      });

    // append element in a broswer environment
    document.body && document.body.appendChild(stripeJs);
  };

  // if stripe.js has been loaded, rerender the tree with StripeProvider
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
