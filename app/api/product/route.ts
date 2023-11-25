import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const product = {
		id: 1,
		title: "product 1",
		price: 100,
	};
	return NextResponse.json(product);
}
