import React from "react";
import OverlayLoader from "../overlay/index";

import "./product-picker.scss";
import { Button } from "../form-elements";

export default ({ showOverlay = false, ...rest }) => {
	return (
		<OverlayLoader
			show={showOverlay}
			classnames={["product-picker"]}
			{...rest}
		>
			<div className="title row">Select Products</div>
			<div className="search-bar row"></div>
			<div className="product-menu row"></div>
			<div className="actions row">
				<div className="column large-7">1 product selected</div>
				<div className="column options large-5">
					<Button>Cancel</Button>
					<Button>Add</Button>
				</div>
			</div>
		</OverlayLoader>
	);
};
