"use client";
import { useState } from "react";

import { useForm, FieldValues } from "react-hook-form";
const FormWithRHF = () => {
	const [formInputs, setFormInputs] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		console.log(data);
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});

		reset();
	};

	// using react-hook-from
	/**
	 * # first register every input with its name, this function returns props, spread these props on the input
	 * #  validate the inputs using the register function as well
	 * # assign the handleSubmit function to the form and provide a function, the handleSubmit will return the data from the form after validating it
	 */
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-y-2 w-96"
		>
			<h2>Form with react hook form</h2>
			<input
				{...register("email", {
					required: "Email is required",
				})}
				type="email"
				placeholder="Email"
				className="px-4 py-4 rounded"
			/>
			{errors.email && (
				<p className="text-rose-300">{`${errors.email.message}`}</p>
			)}
			<input
				{...register("password", {
					required: "Password is required",
					minLength: {
						value: 5,
						message: "Password must be at least 10 characters",
					},
				})}
				type="password"
				placeholder="Password"
				className="px-4 py-4 rounded"
			/>
			{errors.password && (
				<p className="text-rose-300">{`${errors.password.message}`}</p>
			)}
			<input
				{...register("confirmPassword", {
					required: "Confirm Password is required",
					validate: (value) => {
						return value === getValues("password") || "Passwords must match";
					},
				})}
				type="password"
				placeholder="Confirm Password"
				className="px-4 py-4 rounded"
			/>
			{errors.confirmPassword && (
				<p className="text-rose-300">{`${errors.confirmPassword.message}`}</p>
			)}

			<button
				disabled={isSubmitting}
				type="submit"
				className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
			>
				Submit
			</button>
		</form>
	);
};

export default FormWithRHF;
