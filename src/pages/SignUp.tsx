import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Store";
import { User } from "../model/UserModel";
import { registerUser } from "../store/slices/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        
        if(formData.email === '' || formData.password === '' || formData.name === ''){
            setError("Name, email or password is empty");
            return;
        }

        const user: User = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            setIsSubmitting(true);
            console.log("Registering user", user);
            const resultAction = await dispatch(registerUser(user));
            
            // Handle potential rejection from the thunk
            if (registerUser.rejected.match(resultAction)) {
                const errorMessage = resultAction.payload?.message || resultAction.error.message || "Registration failed";
                setError(errorMessage);
                console.log("Failed to register user", errorMessage);
                return;
            }
            
            const response = unwrapResult(resultAction);
            console.log("Registration response:", response);
            
            if(response && response.success){
                setError(''); // Clear any error messages
                setSuccess(true);
                console.log("Registration successful!");
                // Navigate to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (response && response.message) {
                // Only set error if there's an actual error message
                setError(response.message);
                console.log("Registration issue:", response.message);
            } else if (!response) {
                setError("No response received from server");
                console.log("No response received from server");
            }
        } catch (err: any) {
            const errorMessage = err.message || "Registration failed";
            setError(errorMessage);
            console.log("Failed to register user:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-r from-blue-500 to-white flex items-center justify-center p-6">
            <div className="w-2/4 max-w-3xl bg-white rounded-lg shadow-lg grid md:grid-cols-2">
                {/* Left Column */}
                <div className="p-8 flex flex-col justify-between bg-white">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-600">Welcome To</h1>
                        <h2 className="text-2xl font-bold text-blue-700">HealthSphere</h2>
                        <p className="text-gray-600 mt-4">
                            Sign up today to explore the benefits of our modern services and tools for your health
                            journey.
                        </p>
                        <Link
                            to="/login"
                            className="mt-4 inline-block text-blue-600 font-bold hover:text-green-700"
                        >
                            Already have an account? Sign In!
                        </Link>
                    </div>

                    <div className="mt-6">
                        <img
                            src="https://img.freepik.com/free-photo/woman-gym-with-trainer_1303-5543.jpg?t=st=1736680241~exp=1736683841~hmac=c1d93f2e6362326649c7e51b8e7ca270af23d59bfe5f675bd1cfbc16ac815a1f&w=1380"
                            alt="Fitness training"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-gray-50 p-8 flex flex-col justify-center min-h-[60vh] rounded-lg shadow-lg">
                    <div className="max-w-sm mx-auto">
                        <h3 className="text-3xl font-bold mb-1 text-gray-800">Sign Up</h3>
                        <h4 className="text-lg font-semibold text-gray-600">
                            Create your account and start your journey!
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                            {/* Name Input */}
                            <div>
                                <Label htmlFor="name" value="Full Name"/>
                                <TextInput
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({...formData, name: e.target.value})
                                    }
                                    required
                                />
                            </div>
                            {/* Email Input */}
                            <div>
                                <Label htmlFor="email" value="Email"/>
                                <TextInput
                                    id="email"
                                    type="email"
                                    icon={HiMail}
                                    placeholder="name@gmail.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({...formData, email: e.target.value})
                                    }
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
                                        onChange={(e) =>
                                            setFormData({...formData, password: e.target.value})
                                        }
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
                                    I agree to the Terms, Privacy Policy, and Fees
                                </Label>
                            </div>
                            {/* Display error message if any */}
                            {error && (
                                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                                    {error}
                                </div>
                            )}
                            
                            {/* Display success message if registration was successful */}
                            {success && (
                                <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
                                    Registration successful! Redirecting to login page...
                                </div>
                            )}
                            
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                color="success"
                                className="w-full h-12 text-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none disabled:bg-blue-300 flex items-center justify-center"
                                disabled={!formData.agreeToTerms || isSubmitting}
                            >
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </Button>

                            {/* Centered Sign In Link */}
                            <div className="mt-6 text-center">
                                <Label htmlFor="signin" className="block text-gray-600">
                                    Already have an account?
                                </Label>
                                <Link
                                    to="/"
                                    className="text-blue-500 hover:underline text-sm font-semibold mt-2 inline-block"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;