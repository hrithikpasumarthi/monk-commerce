import React, { Suspense } from "react";
import { createPortal } from "react-dom";
import createSeparateHandlers from "../utils";

import "./overlay.scss";

// eslint-disable
const LazyOverlay = React.lazy(() => import("./overlay"));
// eslint-enable

const FallbackContent = () => {
	return <div className="overlay-fallback">Something went wrong!!</div>;
};

const OverlayLoader = ({ show = false, onClose, children, ...rest }) => {
	const portal = document.getElementById("portal");

	return show
		? createPortal(
				<div
					className="overlay-loader"
					{...createSeparateHandlers(() => {
						onClose();
					})}
				>
					<Suspense fallback={<FallbackContent />}>
						<LazyOverlay onClose={onClose} {...rest}>
							{/* <div>This is an overlay, believe it!</div> */}
							{children}
						</LazyOverlay>
					</Suspense>
				</div>,
				portal
		  )
		: null;
};

export default OverlayLoader;
