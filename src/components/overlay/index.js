import React, { Suspense } from "react";
import { createPortal } from "react-dom";
// import _ from "lodash";
import createSeparateHandlers from "../utils";

// import properties from "../../assets/properties.json";
import "./overlay.scss";

// eslint-disable
const LazyOverlay = React.lazy(() => import("./overlay"));
// eslint-enable

export const Spinner = () => {
	return (
		<div className="spin-wrapper row">
			<div className="spinner"></div>
		</div>
	);
};

const FallbackContent = () => {
	return (
		// <div className="overlay-fallback">
		// 	{_.get(properties, "somethingWentWrong")}
		// </div>
		<Spinner />
	);
};

const OverlayLoader = ({
	show = false,
	onClose,
	children,
	addFallback = false,
	...rest
}) => {
	const portal = document.getElementById("portal");

	return show
		? createPortal(
				<div
					className="overlay-loader"
					{...createSeparateHandlers(() => {
						onClose();
					})}
				>
					<Suspense
						fallback={addFallback ? <FallbackContent /> : null}
					>
						<LazyOverlay onClose={onClose} {...rest}>
							{children}
						</LazyOverlay>
					</Suspense>
				</div>,
				portal
		  )
		: null;
};

export default OverlayLoader;
