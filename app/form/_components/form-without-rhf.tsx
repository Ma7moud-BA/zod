"use client";
import { useState } from "react";
//RHF stands for react-hook-form
const FormWithoutRHF = () => {
	const [formInputs, setFormInputs] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [errors, setErrors] = useState<string[]>([]);
	const handleUpdateFormInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors([]);

		try {
			if (formInputs.password !== formInputs.confirmPassword) {
				setErrors(["Password and confirmPassword must match"]);
				setIsSubmitting(false);
				return;
			}
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
		} finally {
			setFormInputs({ email: "", password: "", confirmPassword: "" });
			setErrors([]);
			setIsSubmitting(false);
			console.log(formInputs);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-2 w-96">
			<h2>Form without react hook form</h2>
			<input
				type="email"
				name="email"
				placeholder="Email"
				className="px-4 py-4 rounded"
				value={formInputs.email}
				onChange={handleUpdateFormInputs}
			/>
			<input
				type="password"
				placeholder="Password"
				className="px-4 py-4 rounded"
				name="password"
				minLength={3}
				required
				value={formInputs.password}
				onChange={handleUpdateFormInputs}
			/>
			<input
				type="password"
				placeholder="Confirm Password"
				className="px-4 py-4 rounded"
				name="confirmPassword"
				required
				value={formInputs.confirmPassword}
				onChange={handleUpdateFormInputs}
			/>
			{errors &&
				errors.map((error) => {
					return (
						<p key={error} className="text-sm text-red-700">
							{error}
						</p>
					);
				})}
			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
			>
				Submit
			</button>
		</form>
	);
};

export default FormWithoutRHF;
