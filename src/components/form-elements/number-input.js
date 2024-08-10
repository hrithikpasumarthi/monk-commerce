import React from "react";
import _ from "lodash";
import cn from "classnames";
import createSeparateHandlers from "../utils";

import "./number-input.scss";

const NumberInput = ({
	classnames,
	value,
	defaultValue,
	handleClick = _.noop,
	...rest
}) => {
	return (
		<div className={cn(classnames, "form-number-input", "row")} {...rest}>
			<input
				type="number"
				placeholder={0}
				value={value}
				{...createSeparateHandlers(handleClick)}
			/>
		</div>
	);
};

export default NumberInput;
