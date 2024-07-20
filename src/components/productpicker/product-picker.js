import React, { useEffect, useState } from "react";
import _ from "lodash";
import OverlayLoader from "../overlay/index";
import { Button, MultiCheckBox, SearchTextInput } from "../form-elements";

import "./product-picker.scss";

const data = [
	{
		id: 77,
		title: "Fog Linen Chambray Towel - Beige Stripe",
		variants: [
			{
				id: 1,
				product_id: 77,
				title: "XS / Silver",
				price: "49",
			},
			{
				id: 2,
				product_id: 77,
				title: "S / Silver",
				price: "49",
			},
			{
				id: 3,
				product_id: 77,
				title: "M / Silver",
				price: "49",
			},
		],
		image: {
			id: 266,
			product_id: 77,
			src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
		},
	},
	{
		id: 80,
		title: "Orbit Terrarium - Large",
		variants: [
			{
				id: 64,
				product_id: 80,
				title: "Default Title",
				price: "109",
			},
		],
		image: {
			id: 272,
			product_id: 80,
			src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
		},
	},
	{
		id: 79,
		title: "Fog Linen Chambray Towel - Beige Stripe",
		variants: [
			{
				id: 1,
				product_id: 77,
				title: "XS / Silver",
				price: "49",
			},
			{
				id: 2,
				product_id: 77,
				title: "S / Silver",
				price: "49",
			},
			{
				id: 3,
				product_id: 77,
				title: "M / Silver",
				price: "49",
			},
		],
		image: {
			id: 266,
			product_id: 79,
			src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
		},
	},
	{
		id: 81,
		title: "Orbit Terrarium - Large",
		variants: [
			{
				id: 64,
				product_id: 80,
				title: "Default Title",
				price: "109",
			},
		],
		image: {
			id: 272,
			product_id: 81,
			src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
		},
	},
];

export default ({
	showOverlay = false,
	onClose = _.noop(),
	onProductAddition = _.noop(),
	...rest
}) => {
	const [searchText, setSearchText] = useState();

	useEffect(() => {}, [searchText]);

	return (
		<OverlayLoader
			show={showOverlay}
			classnames={["product-picker"]}
			onClose={onClose}
			{...rest}
		>
			<div className="title row">Select Products</div>
			<div className="search-bar row">
				<SearchTextInput
					handleClick={(ev) => {
						setSearchText(ev.target.value);
					}}
				/>
			</div>
			<div className="product-menu row">
				{data.map((product) => {
					return <MultiCheckBox data={product} />;
				})}
			</div>
			<div className="actions row">
				<div className="column large-7">1 product selected</div>
				<div className="column options large-5">
					<Button classnames={["cancel-btn"]} handleClick={onClose}>
						Cancel
					</Button>
					<Button
						classnames={["add-products-btn", "button-green"]}
						handleClick={() => {
							onProductAddition();
						}}
					>
						Add
					</Button>
				</div>
			</div>
		</OverlayLoader>
	);
};
