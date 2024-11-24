import React, { Component } from "react";

const errorMessages = [
  "Oops! Something went wrong.",
  "Well, that didn't go as planned.",
  "Error! Try refreshing the page.",
  "Unexpected error occurred. Please retry.",
];

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      const randomMessage =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];
      return (
        <div>
          <h1>{randomMessage}</h1>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
