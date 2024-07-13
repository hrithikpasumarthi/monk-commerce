import React, { useState } from "react";
import cn from "classnames";

import "./select-dropdown.scss";
import createSeparateHandlers from "../utils";

export default ({
	id,
	selectedValue,
	options,
	classnames,
	handleClick,
	...rest
}) => {
	const [isActive, toggleIsActive] = useState(false);
	return (
		<div
			className={cn([
				classnames,
				"select-dropdown",
				"row",
				{
					active: isActive,
				},
			])}
			{...createSeparateHandlers(() => {
				toggleIsActive(!isActive);
			})}
			{...rest}
		>
			<select name={id} title={id}>
				{options.map((opt) => {
					return (
						<option
							value={opt.value}
							selected={opt.value === selectedValue}
						>
							{opt.text}
						</option>
					);
				})}
			</select>
			<div className="custom-dropmenu">
				{options.map((opt) => {
					return (
						<div
							className="option"
							{...createSeparateHandlers(() => {
								handleClick(opt.value);
								toggleIsActive(!isActive);
							})}
						>
							{opt.text}
						</div>
					);
				})}
			</div>
		</div>
	);
};
