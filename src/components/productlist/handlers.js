import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { fetchIndexWithId } from "../utils";

const addEmptyProduct = (state) => {
	console.log("Add New Product");
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
		productList: [...productList, newProductItem],
	};
};

/**
 * Method to handle product list update from product picker
 * @param {*} state
 * @param {*} payload
 * @returns updated State
 */
const handleProductUpdate = (state, payload) => {
	// TODO: pending merging the selection data into state
	console.log(state, payload);

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
		productList: [
			...productList.slice(0, productIndex),
			...selection.map((item) => createNewProduct(item)),
			...productList.slice(productIndex + 1),
		],
	};
};

/**
 *
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
 *
 * @param {state} state
 * @param {Object} payload
 *      - itemId: productId
 *      - variantId: variantId
 * 		- discountType: type of discount
 * 	    - discountValue: discount value
 */
const updateDiscount = (state, payload) => {
	console.log("Add Product Discount");
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
 *
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
		productList: [
			...productList.slice(0, productIndex),
			...productList.slice(productIndex + 1),
		],
	};
};

export default {
	addEmptyProduct,
	handleProductUpdate,
	updateDiscount,
	removeProduct,
	onDiscountButtonClick,
};
