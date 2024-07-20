import React from "react";
import { Button, NumberInput, SelectDropDown } from "../form-elements";

import "./discount-field.scss";

const DiscountField = ({
	id,
	item,
	productId,
	showOptions = false,
	round = false,
	onButtonClick,
	onValueChange,
}) => {
	return showOptions ? (
		<div className="discount-menu row">
			<NumberInput
				value={item.discount?.value}
				classnames={[
					"discount-number",
					{
						pill: round,
					},
				]}
				handleClick={(ev) => {
					if (item.id === productId) {
						onValueChange({
							itemId: productId,
							discountType: item.discount?.type,
							discountValue: parseInt(ev.target.value, 10),
						});
					} else {
						onValueChange({
							itemId: productId,
							variantId: item.id,
							discountType: item.discount?.type,
							discountValue: parseInt(ev.target.value, 10),
						});
					}
				}}
			/>
			<SelectDropDown
				id={`discount_main_${id}`}
				selectedValue={item.discount?.type}
				classnames={[
					"discount-dropdown",
					{
						pill: round,
					},
				]}
				options={[
					{ text: "% Off", value: "percentage" },
					{ text: "Flat Off", value: "flat" },
				]}
				handleClick={(value) => {
					if (item.id === productId) {
						onValueChange({
							itemId: productId,
							discountType: value,
							discountValue: item.discount?.value,
						});
					} else {
						onValueChange({
							itemId: productId,
							variantId: item.id,
							discountType: value,
							discountValue: item.discount?.value,
						});
					}
				}}
			/>
		</div>
	) : (
		<Button
			classnames={["discount-button", "button-green"]}
			handleClick={() => {
				if (item.id === productId) {
					onButtonClick({ itemId: productId });
				} else {
					onButtonClick({ itemId: productId, variantId: item.id });
				}
			}}
		>
			Add Discount
		</Button>
	);
};

export default DiscountField;
