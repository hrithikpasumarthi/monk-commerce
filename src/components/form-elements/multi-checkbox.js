import React, { useEffect, useState } from "react";
import _ from "lodash";
import cn from "classnames";
import createSeparateHandlers from "../utils";

import "./multi-checkbox.scss";

const CheckBox = React.forwardRef(
	(
		{
			id,
			wrapperClass = "",
			labelContent = "",
			handleClick = _.noop(),
			showHyphen,
			checked,
		},
		ref
	) => {
		return (
			<div className={cn(wrapperClass)} ref={ref}>
				<input
					id={id}
					type="checkbox"
					className="item-checkbox"
					checked={checked}
					{...createSeparateHandlers(handleClick)}
				/>
				<label
					htmlFor={id}
					className={cn("item-label row", {
						"hyphen-before": showHyphen,
					})}
				>
					{labelContent}
				</label>
			</div>
		);
	}
);

export default ({
	data,
	// onCheckAll = _.noop(),
	// onSingleVariantCheck = _.noop(),
}) => {
	const { title, id, variants = [], image = {} } = data;
	const { src } = image;
	const [mainCheckedState, setMainCheckedState] = useState(false);
	const [onlyFewChecked, toggleOnlyFewChecked] = useState(false);
	const [csForVariants, setCSForVariants] = useState(
		new Array(variants.length).fill(false)
	);

	const handleMainClick = () => {
		setMainCheckedState(!mainCheckedState);

		setCSForVariants(new Array(variants.length).fill(!mainCheckedState));
	};

	const handleVariantClick = (position) => {
		const newStates = csForVariants.map((item, index) =>
			index === position ? !item : item
		);

		setCSForVariants(newStates);
	};

	useEffect(() => {
		// if (!onlyFewChecked) {
		// 	setCSForVariants(new Array(variants.length).fill(mainCheckedState));
		// toggleOnlyFewChecked(false);
		// }
		// toggleOnlyFewChecked(false);
		// if (onlyFewChecked) {
		// 	toggleOnlyFewChecked()
		// }
	}, [mainCheckedState]);

	useEffect(() => {
		const isAnyVariantChecked = csForVariants.reduce((prev, curr) => {
			return prev || curr;
		}, false);

		if (isAnyVariantChecked) {
			const isEveryVariantChecked = csForVariants.every(
				(value) => value === isAnyVariantChecked
			);

			if (isEveryVariantChecked && !mainCheckedState) {
				setMainCheckedState(true);
				toggleOnlyFewChecked(false);
			}

			if (!isEveryVariantChecked) {
				toggleOnlyFewChecked(true);
				setMainCheckedState(false);
			}
		} else {
			// eslint-disable-next-line no-lonely-if
			if (mainCheckedState) {
				setMainCheckedState(false);
			}

			toggleOnlyFewChecked(false);
		}
	}, [csForVariants]);

	return (
		<div className="multi-checkbox-wrapper row">
			<CheckBox
				id={`product_id_${id}`}
				wrapperClass="main-item"
				handleClick={handleMainClick}
				labelContent={
					<>
						<img alt={title} src={src} />
						<span>{title}</span>
					</>
				}
				showHyphen={onlyFewChecked}
				checked={mainCheckedState}
			/>
			{variants.map((variant, index) => {
				return (
					<CheckBox
						id={`variant_id_${id}_${variant.id}`}
						wrapperClass="variant-item"
						handleClick={() => handleVariantClick(index)}
						labelContent={
							<span className="variant-item-label-content row">
								<span className="label-title">
									{variant.title}
								</span>
								<span className="label-price">
									${variant.price}
								</span>
							</span>
						}
						checked={csForVariants[index]}
					/>
				);
			})}
		</div>
	);
};
