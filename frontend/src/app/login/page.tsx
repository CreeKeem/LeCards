"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signup, signin } from "@/api/auth";
import { SignInDto, SignUpDto } from "@/types/auth";
import { TokenService } from "@/lib/auth/token-service";
import { useFormValidation, FormField } from "@/hooks/useFormValidation";

export default function Login() {
  const [signUp, setSignUp] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const router = useRouter();
  const { errors, validateField, clearError, clearAllErrors } =
    useFormValidation();

  // Check if user is already authenticated
  useEffect(() => {
    if (TokenService.hasValidAccessToken()) {
      router.push("/dashboard");
    }
  }, [router]);

  // Handle form field changes
  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      clearError(field);
    }

    // Clear auth error when user makes changes
    if (authError) {
      setAuthError("");
    }
  };

  // Validate individual fields on blur
  const handleFieldBlur = (field: string) => {
    const value = formData[field as keyof typeof formData] as string;

    switch (field) {
      case "email":
        validateField("email", value, { required: true, email: true });
        break;
      case "password":
        validateField("password", value, { required: true, minLength: 6 });
        break;
      case "fName":
        if (signUp)
          validateField("fName", value, { required: true, minLength: 2 });
        break;
      case "lName":
        if (signUp)
          validateField("lName", value, { required: true, minLength: 2 });
        break;
      case "confirmPassword":
        if (signUp)
          validateField(
            "confirmPassword",
            value,
            { required: true, match: formData.password },
            formData.password
          );
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");

    // Validate all fields before submission
    let isFormValid = true;

    // Always validate email and password
    isFormValid && validateField("email", formData.email, {
      required: true,
      email: true,
    });
    isFormValid && validateField("password", formData.password, {
      required: true,
      minLength: 6,
    });

    // Validate additional fields for signup
    if (signUp) {
      isFormValid && validateField("fName", formData.fName, {
        required: true,
        minLength: 2,
      });
      isFormValid && validateField("lName", formData.lName, {
        required: true,
        minLength: 2,
      });
      isFormValid && validateField(
        "confirmPassword",
        formData.confirmPassword,
        { required: true, match: formData.password },
        formData.password
      );
    }

    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      if (signUp) {
        const data: SignUpDto = {
          email: formData.email,
          password: formData.password,
          fName: formData.fName,
          lName: formData.lName,
          rememberMe: formData.rememberMe,
        };

        const success = await signup(data);
        if (!success) {
          setAuthError("Sign up failed. Please try again.");
          setLoading(false);
          return;
        }
        router.push("/dashboard");
      } else {
        const data: SignInDto = {
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        };

        const success = await signin(data);
        if (!success) {
          setAuthError("Invalid credentials. Please try again.");
          setLoading(false);
          return;
        }
        router.push("/dashboard");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      fName: "",
      lName: "",
      confirmPassword: "",
      rememberMe: false,
    });
    setAuthError("");
    clearAllErrors();
  };

  const handleTabSwitch = (isSignUp: boolean) => {
    if (isSignUp === signUp) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setSignUp(isSignUp);
      resetForm();
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-laker-purple via-[#6B21A8] to-laker-purple p-4">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/LeFu3.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-md">
        {/* Container with smooth height transition */}
        <div
          className={`bg-white rounded-2xl shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
            signUp ? "min-h-[820px]" : "min-h-[650px]"
          }`}
        >
          {/* Title Section */}
          <div className="bg-gradient-to-r from-laker-purple to-[#7E22CE] p-6 text-center text-white">
            <div className="mb-3">
              <Image
                src="/Logo.svg"
                alt="LeCards Logo"
                width={64}
                height={64}
                className="mx-auto rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold mb-1">LeCards</h1>
            <p className="text-sm opacity-90">
              Master your knowledge like the King
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-gray-100 flex">
            <button
              onClick={() => handleTabSwitch(false)}
              disabled={isTransitioning}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
                !signUp
                  ? "bg-white text-laker-purple border-b-2 border-laker-purple"
                  : "text-gray-600 hover:text-laker-purple hover:bg-gray-50"
              } ${
                isTransitioning ? "opacity-50" : ""
              } disabled:cursor-not-allowed`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabSwitch(true)}
              disabled={isTransitioning}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-300 ${
                signUp
                  ? "bg-white text-laker-purple border-b-2 border-laker-purple"
                  : "text-gray-600 hover:text-laker-purple hover:bg-gray-50"
              } ${
                isTransitioning ? "opacity-50" : ""
              } disabled:cursor-not-allowed`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <div
              className={`transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 transform translate-x-4"
                  : "opacity-100 transform translate-x-0"
              }`}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {signUp ? "Join the Kingdom" : "Welcome Back"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {signUp
                    ? "Create your account to start studying"
                    : "Sign in to continue your learning journey"}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Name Fields - Animated Entry */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    signUp ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <FormField
                      label="First Name"
                      name="fName"
                      placeholder="LeBron"
                      value={formData.fName}
                      onChange={(e) =>
                        handleFieldChange("fName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("fName")}
                      error={errors.fName?.message}
                      required={signUp}
                      disabled={!signUp}
                    />
                    <FormField
                      label="Last Name"
                      name="lName"
                      placeholder="James"
                      value={formData.lName}
                      onChange={(e) =>
                        handleFieldChange("lName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("lName")}
                      error={errors.lName?.message}
                      required={signUp}
                      disabled={!signUp}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  error={errors.email?.message}
                  required
                />

                {/* Password Field */}
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("password")}
                  error={errors.password?.message}
                  required
                />

                {/* Confirm Password - Animated Entry */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    signUp ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mb-4">
                    <FormField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleFieldChange("confirmPassword", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      error={errors.confirmPassword?.message}
                      required={signUp}
                      disabled={!signUp}
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2 -mb-5">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleFieldChange("rememberMe", e.target.checked)
                    }
                    className="w-4 h-4 text-laker-purple bg-gray-100 border-gray-300 rounded focus:ring-laker-purple focus:ring-2 transition-all"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-700 cursor-pointer select-none"
                  >
                    Keep me signed in for 30 days
                  </label>
                </div>

                {/* Remember Me Info */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    formData.rememberMe
                      ? "max-h-16 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                </div>

                {/* Auth Error - Fixed Position */}
                <div className="h-12 flex items-center justify-center">
                  <div
                    className={`transition-all duration-300 ${
                      authError
                        ? "opacity-100 transform translate-y-0 scale-100"
                        : "opacity-0 transform -translate-y-2 scale-95"
                    }`}
                  >
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 max-w-full">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" />
                        </svg>
                        <span className="truncate">{authError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || isTransitioning}
                  className="w-full bg-laker-gold hover:bg-yellow-500 active:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Please wait...</span>
                    </>
                  ) : (
                    <>
                      {signUp ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          Join the Kingdom
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Enter the Court
                        </>
                      )}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Image
                src="/Logo.svg"
                alt="LeCards Logo"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium">Greatness awaits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for custom validation */}
      <style jsx global>{`
        /* Remove default browser validation styling */
        input:invalid {
          box-shadow: none !important;
        }

        input:focus:invalid {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2) !important;
        }

        /* Hide browser validation bubbles */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        /* Custom focus states */
        input:focus {
          transform: translateY(-1px);
        }

        /* Smooth transitions for all interactive elements */
        button,
        input,
        label {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects */
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Loading animation improvements */
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
          }
        }

        button:disabled {
          animation: none;
        }

        /* Error shake animation */
        @keyframes shake {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-5px);
          }
          30% {
            transform: translateX(5px);
          }
          60% {
            transform: translateX(-3px);
          }
          90% {
            transform: translateX(3px);
          }
        }

        .error-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
