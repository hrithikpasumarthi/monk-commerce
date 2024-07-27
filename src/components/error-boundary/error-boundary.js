import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.log(error, info.componentStack);
	}

	render() {
		/* eslint-disable react/destructuring-assignment */
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
		/* eslint-enable react/destructuring-assignment */
	}
}

export default ErrorBoundary;
