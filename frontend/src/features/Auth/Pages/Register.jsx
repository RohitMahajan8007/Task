import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/UseAuth.jsx";

const Register = () => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            api: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await handleRegister(formData);

            navigate("/login");
        } catch (error) {
            setErrors({
                api:
                    error?.response?.data?.message ||
                    "Registration failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex items-center justify-center px-5">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Task Manager
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Create your account to manage your tasks.
                </p>

                {errors.api && (
                    <div className="mb-5 rounded-lg border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-600">
                        {errors.api}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                >



                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-black ${errors.username
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.username && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.username}
                            </p>
                        )}
                    </div>



                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-black ${errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>



                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-black ${errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black py-3 text-white font-medium transition duration-300 hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link
                            to="/login"
                            className="ml-1 font-semibold text-black hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Register;