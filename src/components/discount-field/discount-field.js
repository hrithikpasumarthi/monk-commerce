import React, { useState } from "react";
import { Button, NumberInput, SelectDropDown } from "../form-elements";

import "./discount-field.scss";

const DiscountField = ({ id, round = false }) => {
	const [showDiscountMenu, toggleShowDiscountMenu] = useState(false);
	const [discountValue, setDiscountValue] = useState(0);
	const [discountType, updateDiscountType] = useState("percentage");

	return showDiscountMenu ? (
		<div className="discount-menu row">
			<NumberInput
				value={discountValue}
				classnames={[
					"discount-number",
					{
						pill: round,
					},
				]}
				handleClick={(ev) => {
					setDiscountValue(ev.target.value);
					console.log("discount value", ev.target.value);
				}}
			/>
			<SelectDropDown
				id={`discount_main_${id}`}
				selectedValue={discountType}
				classnames={[
					"discount-dropdown",
					{
						pill: round,
					},
				]}
				options={[
					{ text: "% Off", value: "percentage" },
					{ text: "Flat", value: "flat" },
				]}
				handleClick={(value) => {
					updateDiscountType(value);
					console.log("discount type", value);
				}}
			/>
		</div>
	) : (
		<Button
			classnames={[`discount-button`]}
			handleClick={() => {
				toggleShowDiscountMenu(!showDiscountMenu);
			}}
		>
			Add Discount
		</Button>
	);
};

export default DiscountField;
