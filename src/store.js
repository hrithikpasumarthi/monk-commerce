import React from "react";
import "./styles/app.scss";
import NavBar from "./components/navbar/navbar";
import ProductList from "./components/productlist/product-list";

const App = () => {
	return (
		<>
			<NavBar />
			<div id="container">
				<ProductList />
			</div>
		</>
	);
};

export default App;
