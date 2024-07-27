import React from "react";
import _ from "lodash";
import createSeparateHandlers from "../utils";

import searchGlass from "../../assets/images/search_glass.png";
import "./search-input.scss";

const SearchTextInput = ({ handleClick = _.noop() }) => {
	return (
		<div className="search-box-wrapper row">
			<img className="search-icon" alt="search glass" src={searchGlass} />
			<input
				type="text"
				className="search-input"
				title="search products"
				placeholder="Search products"
				{...createSeparateHandlers(handleClick)}
			/>
		</div>
	);
};

export default SearchTextInput;
