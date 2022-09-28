import React from 'react';
import { Props, State } from './error-boundary-interface';

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() : State {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong. Please try again later</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
