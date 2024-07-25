import React, { Fragment, useState } from "react";
import cn from "classnames";

import "./select-dropdown.scss";
import createSeparateHandlers from "../utils";

const SelectDropDown = ({
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
			<select name={id} title={id} value={selectedValue} readOnly>
				{options.map((opt) => {
					return (
						<Fragment key={opt.value}>
							<option value={opt.value}>{opt.text}</option>
						</Fragment>
					);
				})}
			</select>
			<div className="custom-dropmenu">
				{options.map((opt) => {
					return (
						<div
							key={opt.value}
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

export default SelectDropDown;
