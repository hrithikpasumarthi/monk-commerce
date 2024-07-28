import { useEffect, useState } from "react";
import { fetchIndexWithId } from "../utils";

export default (prevSelection) => {
	const [searchText, setSearchText] = useState("");
	const [isDataFetching, setIsDataFetching] = useState(false);
	const [data, setData] = useState([]);
	const [displayCount, setDisplayCount] = useState(0);
	const [selection, setSelection] = useState([]);

	useEffect(() => {
		if (prevSelection.variants.length > 0) {
			setSelection([prevSelection]);
		}
	}, []);

	const handleScroll = (ev) => {
		const container = ev.target;

		if (
			container.scrollHeight - Math.round(container.scrollTop) ===
			container.clientHeight
		) {
			setDisplayCount(Math.min(displayCount + 10, data.length));
		}
	};

	const fetchSearchData = (search, abortSignal) => {
		const baseURL = "http://stageapi.monkcommerce.app/task/products/search";
		const url = new URL(`https://cors-anywhere.herokuapp.com/${baseURL}`); // Mitigating CORS error using proxy server
		const params = {
			search,
			page: 1,
		};

		Object.keys(params).forEach((key) =>
			url.searchParams.append(key, params[key])
		);

		return fetch(url, {
			headers: {
				"x-api-key": process.env.REACT_APP_API_KEY,
				"Content-Type": "text/plain",
			},
			signal: abortSignal,
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Network response was not ok!");
				}
				return res.json();
			})
			.catch((e) => console.error(e));
	};

	const onSelectMain = (product, selected = false) => {
		if (selected) {
			const selectionWithProductIdExist =
				fetchIndexWithId(selection, product.id) > -1;

			if (selectionWithProductIdExist) {
				setSelection([
					...selection.map((item) => {
						if (item.id === product.id) {
							return product;
						}

						return item;
					}),
				]);
			}

			if (!selectionWithProductIdExist) {
				setSelection([...selection, product]);
			}
		} else {
			setSelection([
				...selection.filter((item) => item.id !== product.id),
			]);
		}
	};

	const onSelectVariant = (product, variantId, selected) => {
		if (selected) {
			const selectionWithProductIdExist =
				fetchIndexWithId(selection, product.id) > -1;

			if (selectionWithProductIdExist) {
				setSelection([
					...selection.map((item) => {
						if (item.id === product.id) {
							return {
								...item,
								variants: [
									...item.variants,
									product.variants.find(
										(variant) => variant.id === variantId
									),
								],
							};
						}

						return item;
					}),
				]);
			}

			if (!selectionWithProductIdExist) {
				setSelection([
					...selection,
					{
						...product,
						variants: [
							product.variants.find(
								(variant) => variant.id === variantId
							),
						],
					},
				]);
			}
		} else {
			const index = fetchIndexWithId(selection, product.id);
			const selectionVariantList = selection[index].variants.filter(
				(variant) => variant.id !== variantId
			);

			if (selectionVariantList.length > 0) {
				setSelection([
					...selection.map((item) => {
						if (item.id === product.id) {
							return {
								...item,
								variants: selectionVariantList,
							};
						}

						return item;
					}),
				]);
			} else {
				setSelection([
					...selection.filter((item) => item.id !== product.id),
				]);
			}
		}
	};

	return {
		searchText,
		isDataFetching,
		data,
		displayCount,
		selection,
		setSearchText,
		setIsDataFetching,
		setData,
		setDisplayCount,
		setSelection,
		fetchSearchData,
		onSelectMain,
		onSelectVariant,
		handleScroll,
	};
};
