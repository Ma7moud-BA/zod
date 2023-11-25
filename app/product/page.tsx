"use client";
import axios from "axios";
import { type } from "os";
import { useEffect } from "react";
import { z } from "zod";

// write the expectation of what the product should be
const productSchema = z.object({
	id: z.number(),
	title: z.string(),
	price: z.number().positive(),
});
// for using the type made by zod as typescript type use z.infer
// in this example i want to use the product type to specify the type of the function parameter
const getPriceFromProduct = (product: z.infer<typeof productSchema>) => {
	return product.price.toString() + "$";
};
const ProductPage = () => {
	useEffect(() => {
		async function getProduct() {
			const res = await axios.get("/api/product");
			const product = await res.data;

			// using safeParse instead of parse, safeParse returns an object with success property unlike the normal parse method it will throw an error
			const validatedProduct = productSchema.safeParse(product);
			if (!validatedProduct.success) {
				console.error(validatedProduct.error);
				return;
			}
			console.log(validatedProduct.data);
			console.log(getPriceFromProduct(validatedProduct.data));
		}

		getProduct();
	}, []);
	return <div></div>;
};

export default ProductPage;
