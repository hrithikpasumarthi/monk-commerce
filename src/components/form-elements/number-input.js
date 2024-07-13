import React from "react";
import _ from "lodash";
import cn from "classnames";
import createSeparateHandlers from "../utils";

import "./number-input.scss";

export default ({
	classnames,
	value,
	defaultValue = 0,
	handleClick = _.noop(),
	...rest
}) => {
	return (
		<div className={cn(classnames, "form-number-input", "row")} {...rest}>
			<input
				type="number"
				placeholder={defaultValue}
				defaultValue={defaultValue}
				value={value}
				{...createSeparateHandlers(handleClick)}
			/>
		</div>
	);
};