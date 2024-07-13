import React, { useState } from "react";
import _ from "lodash";
import cn from "classnames";
import { Button, EditInput } from "../form-elements";
import DiscountField from "../discount-field/discount-field";

import cross from "../../assets/cross.png";
import "./product-list.scss";
import createSeparateHandlers from "../utils";

const AddProductButton = ({ onClick = _.noop() }) => {
	return (
		<Button onClick={onClick} classnames={["add-product-button"]}>
			Add Product
		</Button>
	);
};

const ProductItemTemplate = ({
	classnames = [],
	id,
	children,
	showVariantsLink = false,
	handleClickForShowVariantsLink = _.noop(),
	round = false,
	showRemove,
	onRemove,
}) => {
	const [mainClass = ""] = classnames;
	return (
		<>
			<div className={cn(mainClass, "list-row", "row")}>
				<div className="column large-1 number">{id}.</div>
				<div className="column large-7 name">
					<EditInput
						// value={`${item}-${index + 1}`}
						placeholderTitle="Select Product"
						handleClick={() => {
							console.log("printing..item", id);
						}}
						round={round}
					/>
				</div>
				<div className="column large-4 actions">
					<DiscountField round={round} id={`discount_${id}`} />
					{showRemove && (
						<Button
							onClick={onRemove}
							classnames={["remove-product-button"]}
						>
							<img alt="cross" src={cross} />
						</Button>
					)}
				</div>
			</div>
			{showVariantsLink && (
				<div
					className="show-variants-link row"
					{...createSeparateHandlers(handleClickForShowVariantsLink)}
				>
					<span className="text">
						{children ? "Hide variants" : "Show variants"}
					</span>
					<span
						className={cn({
							open: children,
							close: !children,
						})}
					>
						&gt;
					</span>
				</div>
			)}
			{children}
		</>
	);
};

const ProductListItem = ({ item, index, showRemove, onRemove }) => {
	const [showVariants, toggleShowVariants] = useState(false);
	const { variantList = [1, 2] } = item;
	return (
		<ProductItemTemplate
			id={index + 1}
			classnames={["product-list-row"]}
			handleClickForShowVariantsLink={() => {
				toggleShowVariants(!showVariants);
			}}
			showVariantsLink
			showRemove={showRemove}
			onRemove={onRemove}
		>
			{showVariants && (
				<>
					{variantList.map((val) => {
						return (
							<ProductItemTemplate
								id={val}
								classnames={["variant-list-row"]}
								showRemove={showRemove}
								onRemove={onRemove}
								round
							/>
						);
					})}
				</>
			)}
		</ProductItemTemplate>
	);
};

const ProductList = () => {
	const [list, updateList] = useState([]);
	return (
		<div className="product-list-wrapper">
			<h1 className="product-list-header">Add Products</h1>
			<div className="product-list">
				{/* Render the list */}
				<div className="header row">
					<div className="column large-1"></div>
					<div className="column large-7">
						<span className="title">Product</span>
					</div>
					<div className="column large-4">
						<span className="title">Discount</span>
					</div>
				</div>
				<div className="body">
					{list.map((item, index) => {
						return (
							<ProductListItem
								{...{
									item,
									index,
									showRemove: list.length !== 1,
									onRemove: () => {
										const [, ...rest] = list;
										updateList([...rest]);
									},
								}}
							/>
						);
					})}
				</div>
			</div>
			<div className="actions row">
				<AddProductButton
					onClick={() => {
						updateList([...list, "product"]);
					}}
				/>
			</div>
		</div>
	);
};

export default ProductList;
