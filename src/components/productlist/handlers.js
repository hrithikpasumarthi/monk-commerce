import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { fetchIndexWithId } from "../utils";

/**
 * Method to add a new empty product to product list.
 * @param {*} state
 * @returns state with additional empty product
 */
const addEmptyProduct = (state) => {
	const { productList } = state;

	const newProductItem = {
		productId: uuidv4(),
		title: undefined,
		variants: [],
		image: undefined,
		showDiscountOptions: false,
		discount: {
			value: undefined,
			type: "percentage",
		},
	};

	return {
		...state,
		productList: [...productList, newProductItem],
	};
};

/**
 * Method to handle product list update from product picker.
 * @param {*} state
 * @param {*} payload
 * @returns updated State
 */
const handleProductUpdate = (state, payload) => {
	const { productList } = state;
	const { productId, selection } = payload;
	const productIndex = fetchIndexWithId(productList, productId, "productId");

	const createNewProduct = (data) => {
		return {
			productId: uuidv4(),
			title: data.title,
			id: data.id,
			variants: [
				...data.variants.map((variant) => {
					return {
						id: variant.id,
						title: variant.title,
						price: variant.price,
						showDiscountOptions: false,
						discount: {
							value: undefined,
							type: "percentage",
						},
					};
				}),
			],
			image: data.image,
			showDiscountOptions: false,
			discount: {
				value: undefined,
				type: "percentage",
			},
		};
	};

	return {
		...state,
		productList: [
			...productList.slice(0, productIndex),
			...selection.map((item) => createNewProduct(item)),
			...productList.slice(productIndex + 1),
		],
	};
};

/**
 * Method to control UI states to display discount options.
 * @param {state} state
 * @param {Object} payload
 *      - itemId: productId
 *      - variantId: variantId
 */
const onDiscountButtonClick = (state, payload) => {
	const { productList } = state;
	const { itemId, variantId = null } = payload;
	const productIndex = fetchIndexWithId(productList, itemId, "productId");
	const variantList = _.get(productList[productIndex], "variants", []);

	if (variantId) {
		const variantIndex = fetchIndexWithId(variantList, variantId);

		return {
			...state,
			productList: [
				...productList.slice(0, productIndex),
				{
					...productList[productIndex],
					variants: [
						...variantList.slice(0, variantIndex),
						{
							...variantList[variantIndex],
							showDiscountOptions: true,
						},
						...variantList.slice(variantIndex + 1),
					],
				},
				...productList.slice(productIndex + 1),
			],
		};
	}

	return {
		...state,
		productList: [
			...productList.slice(0, productIndex),
			{
				...productList[productIndex],
				showDiscountOptions: true,
				variants: variantList.map((variant) => {
					return {
						...variant,
						showDiscountOptions: true,
					};
				}),
			},
			...productList.slice(productIndex + 1),
		],
	};
};

/**
 * Method to update discount input for each product item in the list.
 * @param {state} state
 * @param {Object} payload
 *      - itemId: productId
 *      - variantId: variantId
 * 		- discountType: type of discount
 * 	    - discountValue: discount value
 */
const updateDiscount = (state, payload) => {
	const { productList } = state;
	const {
		itemId,
		variantId = null,
		discountType = undefined,
		discountValue = 0,
	} = payload;
	const productIndex = fetchIndexWithId(productList, itemId, "productId");
	const variantList = _.get(productList[productIndex], "variants", []);

	if (variantId) {
		const variantIndex = fetchIndexWithId(variantList, variantId);

		return {
			...state,
			productList: [
				...productList.slice(0, productIndex),
				{
					...productList[productIndex],
					variants: [
						...variantList.slice(0, variantIndex),
						{
							...variantList[variantIndex],
							discount: {
								type: discountType,
								value: discountValue,
							},
						},
						...variantList.slice(variantIndex + 1),
					],
				},
				...productList.slice(productIndex + 1),
			],
		};
	}

	return {
		...state,
		productList: [
			...productList.slice(0, productIndex),
			{
				...productList[productIndex],
				variants: variantList.map((variant) => {
					return {
						...variant,
						discount: {
							type: discountType,
							value: discountValue,
						},
					};
				}),
				discount: {
					type: discountType,
					value: discountValue,
				},
			},
			...productList.slice(productIndex + 1),
		],
	};
};

/**
 * Method to handle removing of a product from the list.
 * @param {state} state
 * @param {Object} payload
 *      - itemId: productId
 *      - variantId: variantId
 */
const removeProduct = (state, payload) => {
	const { productList } = state;
	const { itemId, variantId = null } = payload;
	const productIndex = fetchIndexWithId(productList, itemId, "productId");

	if (variantId) {
		const variantList = _.get(productList[productIndex], "variants", []);
		const variantIndex = fetchIndexWithId(variantList, variantId);

		return {
			productList: [
				...productList.slice(0, productIndex),
				{
					...productList[productIndex],
					variants: [
						...variantList.slice(0, variantIndex),
						...variantList.slice(variantIndex + 1),
					],
				},
				...productList.slice(productIndex + 1),
			],
		};
	}

	return {
		...state,
		productList: [
			...productList.slice(0, productIndex),
			...productList.slice(productIndex + 1),
		],
	};
};

/**
 * Method to handle draggable list onDragStart event
 * @param {*} state
 * @param {*} payload
 * @returns updated state
 */
const handleDragStart = (state, payload) => {
	const { productId, variantId, event } = payload;
	event.dataTransfer.setData("text/plain", "");

	if (variantId) {
		return {
			...state,
			activeProductId: productId,
			currVariantDraggingItem: variantId,
		};
	}

	return {
		...state,
		currDraggingItem: productId,
	};
};

/**
 *	Method to handle draggable list onDragEnd event.
 * @param {*} state
 * @param {*} payload
 * @returns updated state
 */
const handleDragEnd = (state, payload) => {
	const { variantId } = payload;

	if (variantId) {
		return {
			...state,
			currDraggingItem: null,
			activeProductId: null,
			currVariantDraggingItem: null,
		};
	}

	return {
		...state,
		currDraggingItem: null,
	};
};

/**
 * Method to handle draggable list drop event.
 * @param {*} state
 * @param {*} payload
 * @returns updated state after list drop
 */
const handleDrop = (state, payload) => {
	const {
		currDraggingItem,
		productList,
		activeProductId,
		currVariantDraggingItem,
	} = state;
	const { productId: targetProductId, variantId } = payload;

	if (variantId) {
		if (!currVariantDraggingItem) return state;

		const productIndex = fetchIndexWithId(
			productList,
			activeProductId,
			"productId"
		);
		const productItem = productList[productIndex];
		const { variants: variantList } = productItem;
		const currVariantIndex = fetchIndexWithId(
			variantList,
			currVariantDraggingItem
		);
		const targetVariantIndex = fetchIndexWithId(variantList, variantId);

		if (currVariantIndex === -1 || targetVariantIndex === -1) return state;

		const variantDraggingItem = variantList[currVariantIndex];
		variantList.splice(currVariantIndex, 1);
		variantList.splice(targetVariantIndex, 0, variantDraggingItem);

		return {
			...state,
			productList: [
				...productList.slice(0, productIndex),
				{
					...productItem,
					variants: variantList,
				},
				...productList.slice(productIndex + 1),
			],
		};
	}

	if (!currDraggingItem) return state;

	const currIndex = fetchIndexWithId(
		productList,
		currDraggingItem,
		"productId"
	);
	const targetIndex = fetchIndexWithId(
		productList,
		targetProductId,
		"productId"
	);

	if (currIndex === -1 || targetIndex === -1) return state;

	const draggingItem = productList[currIndex];
	productList.splice(currIndex, 1);
	productList.splice(targetIndex, 0, draggingItem);

	// eslint-disable-next-line consistent-return
	return {
		...state,
		productList,
	};
};

export default {
	addEmptyProduct,
	handleProductUpdate,
	updateDiscount,
	removeProduct,
	onDiscountButtonClick,
	handleDragStart,
	handleDragEnd,
	handleDrop,
};
