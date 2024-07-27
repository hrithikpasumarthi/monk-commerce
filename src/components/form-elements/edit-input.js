import React from "react";
import _ from "lodash";
import cn from "classnames";
import createSeparateHandlers from "../utils";
import editPen from "../../assets/images/edit_pen.png";

import "./edit-input.scss";

const EditInput = ({
	classnames,
	value = "",
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
			<img alt="edit-pen" src={editPen} />
		</div>
	);
};

export default EditInput;
