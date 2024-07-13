const createSeparateHandlers = (handler) => {
	return {
		onClick: handler,
		onChange: handler,
		onKeyDown: handler,
	};
};

export default createSeparateHandlers;
