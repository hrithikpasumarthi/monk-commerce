const createSeparateHandlers = (handler) => {
	return {
		onClick: handler,
		onChange: handler,
		onKeyDown: handler,
	};
};

export const fetchIndexWithId = (list, id, key = "id") => {
	// eslint-disable-next-line
	let pos = -1;

	list.find((x, index) => {
		if (x[key] === id) {
			pos = index;
		}

		return x[key] === id;
	});

	return pos;
};

export default createSeparateHandlers;
