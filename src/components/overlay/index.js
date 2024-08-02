import React, { Suspense } from "react";
import { createPortal } from "react-dom";
import _ from "lodash";
import createSeparateHandlers from "../utils";

import properties from "../../assets/properties.json";
import "./overlay.scss";

// eslint-disable
const LazyOverlay = React.lazy(() => import("./overlay"));
// eslint-enable

const FallbackContent = () => {
	return (
		<div className="overlay-fallback">
			{_.get(properties, "somethingWentWrong")}
		</div>
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
