import React, { Fragment, useEffect } from "react";
import _ from "lodash";
import useProductPicker from "./useProductPicker";
import OverlayLoader from "../overlay/index";
import { Button, MultiCheckBox, SearchTextInput } from "../form-elements";

import "./product-picker.scss";

const Spinner = () => {
	return (
		<div className="spin-wrapper row">
			<div className="spinner"></div>
		</div>
	);
};

const ProductPicker = ({
	item,
	showOverlay = false,
	onClose = _.noop(),
	onProductAddition = _.noop(),
	...rest
}) => {
	const {
		searchText,
		setSearchText,
		isDataFetching,
		setIsDataFetching,
		data,
		setData,
		displayCount,
		setDisplayCount,
		selection,
		fetchSearchData,
		onSelectMain,
		onSelectVariant,
	} = useProductPicker();

	const handleScroll = (ev) => {
		const container = ev.target;

		if (
			container.scrollHeight - Math.round(container.scrollTop) ===
			container.clientHeight
		) {
			console.log("Reached the bottom!");
			setDisplayCount(Math.min(displayCount + 10, data.length));
		}
	};

	useEffect(() => {
		setData([]);
		setIsDataFetching(true);

		// Create an instance.
		const controller = new AbortController();
		// eslint-disable-next-line
		const signal = controller.signal;

		const fetchTimeout = setTimeout(() => {
			fetchSearchData(searchText, signal).then((res) => {
				console.log(res);
				setIsDataFetching(false);
				// setData((prev) => [...prev, ...res]);
				if (!_.isNull(res)) setData(res);
				else setData([]);

				setDisplayCount(10);
			});
		}, 500);

		return () => {
			clearTimeout(fetchTimeout);
			controller.abort();
		};
	}, [searchText]);

	useEffect(() => {
		console.log("selection", selection);
	}, [selection]);

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
			{isDataFetching && <Spinner />}
			{!isDataFetching && (
				<div className="product-menu row" onScroll={handleScroll}>
					{data?.length > 0 ? (
						<>
							{/* {item && (
								<Fragment key={item.id}>
									<MultiCheckBox data={item} prefillData />
								</Fragment>
							)} */}
							{data.slice(0, displayCount).map((product) => {
								return (
									<Fragment key={product.id}>
										<MultiCheckBox
											data={product}
											prefillData={item}
											shouldPrefillData={
												item.id === product.id
											}
											onSelectMain={onSelectMain}
											onSelectVariant={onSelectVariant}
										/>
									</Fragment>
								);
							})}
						</>
					) : (
						<div className="search-result-text">
							No results found against your search! Please try
							again!
						</div>
					)}
				</div>
			)}
			<div className="actions row">
				<div className="column large-7">1 product selected</div>
				<div className="column options large-5">
					<Button classnames={["cancel-btn"]} handleClick={onClose}>
						Cancel
					</Button>
					<Button
						classnames={["add-products-btn", "button-green"]}
						handleClick={() => {
							onProductAddition(selection);
							onClose();
						}}
					>
						Add
					</Button>
				</div>
			</div>
		</OverlayLoader>
	);
};

export default ProductPicker;
