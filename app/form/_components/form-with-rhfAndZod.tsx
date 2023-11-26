"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password must match",
		path: ["confirmPassword"],
	});
/**
 * The refine method is used to add additional validation logic to a schema. It allows you to specify a refinement predicate function that checks the validity
 *  of the data against custom conditions. If the predicate returns false, it will trigger an error with the specified message and path.
 */

type TSignUpSchema = z.infer<typeof signUpSchema>;
const FormWithRHFAndZod = () => {
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
	} = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

	const onSubmit = async (data: TSignUpSchema) => {
		console.log(data);
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});

		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-y-2 w-96"
		>
			<h2>Form with react hook form and zod</h2>
			<input
				{...register("email")}
				type="email"
				placeholder="Email"
				className="px-4 py-4 rounded"
			/>
			{errors.email && (
				<p className="text-rose-300">{`${errors.email.message}`}</p>
			)}
			<input
				{...register("password")}
				type="password"
				placeholder="Password"
				className="px-4 py-4 rounded"
			/>
			{errors.password && (
				<p className="text-rose-300">{`${errors.password.message}`}</p>
			)}
			<input
				{...register("confirmPassword")}
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

export default FormWithRHFAndZod;

/**
 * Why using zod with form
 * because i don't only want to validate the data on the client side but on the server side as well, so we can
 * create the schema  with zod and use it on both the client and the server, zod works well with react-hook-form
 *
 */
