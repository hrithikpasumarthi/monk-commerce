const createSeparateHandlers = (handler) => {
	return {
		onClick: handler,
		onChange: handler,
		onKeyDown: handler,
	};
};

export const fetchIndexWithId = (list, id) => {
	// eslint-disable-next-line
	let pos = -1;

	list.find((x, index) => {
		if (x.id === id) {
			pos = index;
		}

		return x.id === id;
	});

	return pos;
};

export default createSeparateHandlers;
