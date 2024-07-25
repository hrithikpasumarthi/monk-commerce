import React from "react";

import monk from "../../assets/monk.png";
import "./navbar.scss";

const NavBar = () => {
	return (
		<nav className="row navbar">
			<img alt="monk" src={monk} />
			<h1 className="title">Monk Upsell & Cross-sell</h1>
		</nav>
	);
};

export default NavBar;
