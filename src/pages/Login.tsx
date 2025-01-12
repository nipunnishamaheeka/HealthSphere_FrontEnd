import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { BsEyeSlash, BsEye } from "react-icons/bs";

interface LoginFormData {
    email: string;
    password: string;
    agreeToTerms: boolean;
}

export const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login attempt:", formData);
    };

    return (
        <div className="min-h-screen bg-green-600 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg grid md:grid-cols-2 m-4">
                {/* Left Column */}
                <div className="p-8 flex flex-col justify-between bg-white">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Welcome to</h1>
                        <h2 className="text-2xl font-bold text-green-600">
                            Green Shadow (Pvt) Ltd
                        </h2>
                        <p className="text-gray-600 mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. We are
                            delighted to offer a modern and user-friendly service to ensure
                            you have the best experience.
                        </p>
                        <Link
                            to="/register"
                            className="mt-4 inline-block text-green-600 font-bold hover:text-green-700"
                        >
                            Join Now!
                        </Link>
                    </div>
                    <div className="mt-6">
                        <img
                            src="https://img.freepik.com/premium-vector/farmer-supplying-beans-coffee-plantation_1334819-12798.jpg?w=1380"
                            alt="Farmers working"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-gray-50 p-8 flex flex-col justify-center min-h-[60vh] rounded-lg shadow-lg">
                    <div className="max-w-sm mx-auto">
                        <div className="flex justify-end mb-4">
                            {/* Optional: Add Sign In/Back buttons here if needed */}
                        </div>
                        <h3 className="text-3xl font-bold mb-1 text-gray-800">Sign In</h3>
                        <h4 className="text-lg font-semibold text-gray-600">Stay updated on your professional world</h4>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                            {/* Email Input */}
                            <div>
                                <Label htmlFor="email" value="Email"/>
                                <TextInput
                                    id="email"
                                    type="email"
                                    icon={HiMail}
                                    placeholder="name@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            {/* Password Input */}
                            <div>
                                <Label htmlFor="password" value="Password"/>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-5 top-1/2 -translate-y-1/2 bg-transparent p-0 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <BsEye size={20}/> : <BsEyeSlash size={20}/>}
                                    </button>
                                </div>
                            </div>
                            {/* Terms Checkbox */}
                            <div className="flex items-center gap-2 mt-4">
                                <Checkbox
                                    id="termsCheck"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            agreeToTerms: e.target.checked,
                                        })
                                    }
                                />
                                <Label htmlFor="termsCheck">
                                    I agree to all Terms, Privacy Policy, and Fees
                                </Label>
                            </div>
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                color="success"
                                className="w-full h-12 text-lg font-semibold"
                                disabled={!formData.agreeToTerms}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
