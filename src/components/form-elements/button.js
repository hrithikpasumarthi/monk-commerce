import React from "react";
import cn from "classnames";
import createSeparateHandlers from "../utils";

import "./button.scss";

const Button = ({ children, classnames, handleClick, ...rest }) => {
	return (
		<button
			type="button"
			className={cn(classnames, "form-button")}
			{...createSeparateHandlers(handleClick)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
