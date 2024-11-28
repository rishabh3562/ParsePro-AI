import React, { Component, ReactNode } from "react";

const errorMessages = [
  "Oops! Something went wrong.",
  "Well, that didn't go as planned.",
  "Error! Try refreshing the page.",
  "Unexpected error occurred. Please retry.",
];

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
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
