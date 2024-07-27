import React from "react";
import cn from "classnames";
import createSeparateHandlers from "../utils";

import overlayCross from "../../assets/images/overlay_cross.png";

const Overlay = ({ children, onClose, classnames, ...rest }) => {
	return (
		<div
			className={cn("overlay", classnames)}
			{...createSeparateHandlers((e) => {
				// to prevent closing overlay, if clicked on overlay content
				e.stopPropagation();
			})}
			{...rest}
		>
			{children}
			<button
				type="button"
				className="overlay-close-btn"
				onClick={() => {
					onClose();
				}}
			>
				<img alt="overlay cross" src={overlayCross} />
			</button>
		</div>
	);
};

export default Overlay;
