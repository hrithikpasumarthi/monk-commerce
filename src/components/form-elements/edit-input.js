import React from "react";
import cn from "classnames";
import _ from "lodash";
import createSeparateHandlers from "../utils";
import editPen from "../../assets/edit_pen.png";

import "./edit-input.scss";

export default ({
	classnames,
	value,
	placeholderTitle = "",
	handleClick = _.noop(),
	round = false,
	...rest
}) => {
	return (
		<div
			className={cn(classnames, "form-edit-input", "row", {
				pill: round,
			})}
			{...createSeparateHandlers(handleClick)}
			{...rest}
		>
			<input
				type="text"
				placeholder={placeholderTitle}
				className="column large-8"
				value={value}
				readOnly
			/>
			{/* TODO: svg icon */}
			<img alt="edit-pen" src={editPen} />
		</div>
	);
};
