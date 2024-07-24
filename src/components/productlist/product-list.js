import React, { Fragment, useState } from "react";
import _ from "lodash";
import cn from "classnames";
import createSeparateHandlers from "../utils";
import { Button, EditInput } from "../form-elements";
import DiscountField from "../discount-field/discount-field";
import ProductPicker from "../productpicker/product-picker";
import useProductList from "./useProductList";

import cross from "../../assets/cross.png";
import "./product-list.scss";

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
	item,
	productId,
	children,
	showVariantsLink = false,
	handleClickForShowVariantsLink = _.noop(),
	round = false,
	showRemove,
	onRemove = _.noop(),
	onDiscountOptionClick = _.noop(),
	updateDiscount = _.noop(),
	updateProductItem = _.noop(),
}) => {
	const [showProductPicker, toggleShowProductPicker] = useState(false);
	const [mainClass = ""] = classnames;
	return (
		<>
			<div className={cn(mainClass, "list-row", "row")}>
				<div
					className={cn("column large-1", "number", {
						// before: id,
						after: !id,
					})}
				>
					{id && `${id}.`}
				</div>
				<div
					className={cn(
						"column",
						{
							"large-7": id,
							"large-6": !id,
						},
						"name"
					)}
				>
					<EditInput
						// value={`${item}-${index + 1}`}
						placeholderTitle="Select Product"
						handleClick={() => {
							console.log("printing..item", id);
							toggleShowProductPicker(!showProductPicker);
						}}
						round={round}
					/>
					{showProductPicker && (
						<ProductPicker
							item={item}
							showOverlay={showProductPicker}
							onClose={() => {
								console.log("printing..item", id);
								toggleShowProductPicker(!showProductPicker);
							}}
							onProductAddition={updateProductItem}
						/>
					)}
				</div>
				<div className="column large-4 actions">
					<DiscountField
						id={`discount_${item.productId || item.id}`}
						showOptions={item.showDiscountOptions}
						round={round}
						item={item}
						productId={productId}
						onButtonClick={onDiscountOptionClick}
						onValueChange={updateDiscount}
					/>
					{showRemove && (
						<Button
							onClick={() => {
								if (item.productId === productId) {
									onRemove({ itemId: productId });
								} else {
									onRemove({
										itemId: productId,
										variantId: item.id,
									});
								}
							}}
							classnames={["remove-product-button"]}
						>
							<img alt="cross" src={cross} />
						</Button>
					)}
				</div>
			</div>
			{showVariantsLink && (
				<div className="show-variants-link row">
					<div
						className="column"
						{...createSeparateHandlers(
							handleClickForShowVariantsLink
						)}
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
				</div>
			)}
			{children}
		</>
	);
};

const ProductListItem = ({ item, index, showRemove, ...rest }) => {
	const [showVariants, toggleShowVariants] = useState(false);
	const { variants: variantList } = item;

	return (
		<div className="product-list-item">
			<ProductItemTemplate
				id={index + 1}
				classnames={["product-list-row"]}
				item={item}
				productId={item.productId}
				handleClickForShowVariantsLink={() => {
					toggleShowVariants(!showVariants);
				}}
				showVariantsLink={variantList.length > 0}
				showRemove={showRemove}
				{...rest}
			>
				{showVariants &&
					variantList.map((variant) => {
						return (
							<Fragment key={variant.id}>
								<ProductItemTemplate
									productId={item.productId}
									classnames={["variant-list-row"]}
									item={variant}
									showRemove={variantList.length !== 1}
									round
									{...rest}
								/>
							</Fragment>
						);
					})}
			</ProductItemTemplate>
		</div>
	);
};

const ProductList = () => {
	const {
		state = {},
		createEmptyProduct,
		updateProductItem,
		removeProduct,
		onDiscountOptionClick,
		updateDiscount,
	} = useProductList();

	const list = _.get(state, "productList", []);

	return (
		<div className="product-list-wrapper">
			<h1 className="product-list-header">Add Products</h1>
			<div className="product-list">
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
							<Fragment key={index}>
								<ProductListItem
									{...{
										item,
										index,
										showRemove: list.length !== 1,
										onRemove: removeProduct,
										onDiscountOptionClick,
										updateDiscount,
										updateProductItem,
									}}
								/>
							</Fragment>
						);
					})}
				</div>
			</div>
			<div className="actions row">
				<AddProductButton onClick={createEmptyProduct} />
			</div>
		</div>
	);
};

export default ProductList;
