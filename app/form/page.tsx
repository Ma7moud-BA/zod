import React from "react";
import CheckoutForm from "./_components/checkout-form";
import FormWithoutRHF from "./_components/form-without-rhf";
import FormWithRHF from "./_components/form-with-rhf";
import FormWithRHFAndZod from "./_components/form-with-rhfAndZod";

const FormPage = () => {
	return (
		<div className="flex justify-center items-center h-full flex-col gap-y-10">
			<FormWithoutRHF />
			<br />
			<FormWithRHF />
			<br />
			<FormWithRHFAndZod />
		</div>
	);
};

export default FormPage;
