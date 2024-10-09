import React from "react";
import _ from "lodash";
import "./styles/app.scss";
import NavBar from "./components/navbar/navbar";
import ProductList from "./components/productlist/product-list";
import { ThemeProvider } from './theme-context';
import ErrorBoundary from "./components/error-boundary/error-boundary";

import properties from "./assets/properties.json";

const App = () => {
	return (
		<ThemeProvider>
			<NavBar />
			<div id="container">
				<ErrorBoundary
					fallback={<p>{_.get(properties, "somethingWentWrong")}</p>}
				>
					<ProductList />
				</ErrorBoundary>
			</div>
		</ThemeProvider>
	);
};

export default App;
