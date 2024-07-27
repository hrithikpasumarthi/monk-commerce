import React from "react";
import _ from "lodash";

import properties from "../../assets/properties.json";
import monk from "../../assets/images/monk.png";
import "./navbar.scss";

const NavBar = () => {
	return (
		<nav className="row navbar">
			<img alt="monk" src={monk} />
			<h1 className="title">{_.get(properties, "navTitle")}</h1>
		</nav>
	);
};

export default NavBar;
