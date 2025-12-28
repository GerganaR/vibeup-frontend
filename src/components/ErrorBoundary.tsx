import React, { Component, type ReactNode } from "react";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardBody className="text-center space-y-4">
              <div className="flex justify-center">
                <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
              </div>
              <Typography variant="h4" color="red">
                Something went wrong
              </Typography>
              <Typography className="text-gray-600">
                We're sorry, but something unexpected happened. Please try
                refreshing the page.
              </Typography>
              {this.state.error && (
                <details className="text-left text-xs text-gray-500 bg-gray-100 p-3 rounded">
                  <summary className="cursor-pointer font-semibold">
                    Error details
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <Button
                color="green"
                onClick={this.handleReset}
                className="w-full"
              >
                Go to Home
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
